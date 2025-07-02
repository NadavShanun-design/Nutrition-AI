import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PersonalMetricsForm } from "@/components/form-steps/personal-metrics";
import { NutritionGoalsForm } from "@/components/form-steps/nutrition-goals";
import { FileUploadForm } from "@/components/form-steps/file-upload";
import { DietPlanDisplay } from "@/components/diet-plan-display";
import { PersonalMetrics, NutritionGoals } from "@shared/types";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { DietPlan } from "@shared/schema";
import { Loader2 } from "lucide-react";

const steps = ["Personal Metrics", "Nutrition Goals", "Additional Data"];

interface FormState {
  personalMetrics?: PersonalMetrics;
  nutritionGoals?: NutritionGoals;
  pdfFile?: File;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState<FormState>({});
  const { toast } = useToast();

  const dietPlanMutation = useMutation<DietPlan, Error, FormState>({
    mutationFn: async (data) => {
      const formData = new FormData();

      if (data.personalMetrics) {
        formData.append('personalMetrics', JSON.stringify(data.personalMetrics));
      }

      if (data.nutritionGoals) {
        formData.append('nutritionGoals', JSON.stringify(data.nutritionGoals));
      }

      if (data.pdfFile) {
        formData.append('pdf', data.pdfFile);
      }

      const response = await apiRequest("POST", "/api/diet-plan", formData);
      return response.json();
    }
  });

  const handleSubmit = async () => {
    if (!formState.personalMetrics || !formState.nutritionGoals) {
      toast({
        title: "Error",
        description: "Please complete all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      await dietPlanMutation.mutateAsync(formState);
      toast({
        title: "Success",
        description: "Diet plan generated successfully!",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            NutriGen
          </h1>
          <p className="text-muted-foreground">
            Your personalized diet plan generator powered by AI
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create Your Diet Plan</CardTitle>
            <CardDescription>
              Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {dietPlanMutation.isPending && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">Generating your personalized diet plan...</p>
                </div>
              </div>
            )}

            {currentStep === 0 && (
              <PersonalMetricsForm
                onNext={(data) => {
                  setFormState(prev => ({ ...prev, personalMetrics: data }));
                  setCurrentStep(1);
                }}
              />
            )}
            {currentStep === 1 && (
              <NutritionGoalsForm
                onBack={() => setCurrentStep(0)}
                onNext={(data) => {
                  setFormState(prev => ({ ...prev, nutritionGoals: data }));
                  setCurrentStep(2);
                }}
              />
            )}
            {currentStep === 2 && (
              <FileUploadForm
                onBack={() => setCurrentStep(1)}
                onSubmit={(file) => {
                  setFormState(prev => ({ ...prev, pdfFile: file }));
                  handleSubmit();
                }}
                isLoading={dietPlanMutation.isPending}
              />
            )}
          </CardContent>
        </Card>

        {dietPlanMutation.data && (
          <DietPlanDisplay plan={dietPlanMutation.data.generatedPlan} />
        )}
      </div>
    </div>
  );
}