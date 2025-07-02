import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { NutritionGoals } from "@shared/types";

const formSchema = z.object({
  primary: z.enum(["weight_loss", "muscle_gain", "maintenance", "health_improvement"]),
  secondary: z.array(z.string()),
  targetWeight: z.number().optional(),
  weeklyGoal: z.number().optional(),
});

interface NutritionGoalsFormProps {
  onBack: () => void;
  onNext: (data: NutritionGoals) => void;
}

const secondaryGoals = [
  { id: "energy", label: "Increase Energy" },
  { id: "sleep", label: "Improve Sleep" },
  { id: "digestion", label: "Better Digestion" },
  { id: "immunity", label: "Boost Immunity" },
];

export function NutritionGoalsForm({ onBack, onNext }: NutritionGoalsFormProps) {
  const form = useForm<NutritionGoals>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primary: "maintenance",
      secondary: [],
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
        <FormField
          control={form.control}
          name="primary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Goal</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary goal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="weight_loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="health_improvement">Health Improvement</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondary"
          render={() => (
            <FormItem>
              <FormLabel>Secondary Goals (Optional)</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                {secondaryGoals.map((goal) => (
                  <FormField
                    key={goal.id}
                    control={form.control}
                    name="secondary"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(goal.id)}
                            onCheckedChange={(checked) => {
                              const current = field.value || [];
                              const updated = checked
                                ? [...current, goal.id]
                                : current.filter((value) => value !== goal.id);
                              field.onChange(updated);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {goal.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />

        {form.watch("primary") === "weight_loss" && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="targetWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Weight (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weeklyGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekly Goal (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
