import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { DietPlanResponse, MealPlan } from "@shared/types";

interface DietPlanDisplayProps {
  plan: DietPlanResponse;
}

function MealCard({ meal, title }: { meal: MealPlan[]; title: string }) {
  if (!meal || meal.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No meals suggested for this time.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {meal.map((item, index) => (
          <div key={index} className="space-y-2">
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-sm text-muted-foreground">Portion: {item.portions}</p>
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div>
                <span className="font-medium">{item.calories}</span> cal
              </div>
              <div>
                <span className="font-medium">{item.protein}g</span> protein
              </div>
              <div>
                <span className="font-medium">{item.carbs}g</span> carbs
              </div>
              <div>
                <span className="font-medium">{item.fats}g</span> fats
              </div>
            </div>
            {item.instructions && (
              <p className="text-sm italic">{item.instructions}</p>
            )}
            {index < meal.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function DietPlanDisplay({ plan }: DietPlanDisplayProps) {
  // Add safety checks for required arrays
  const breakfast = Array.isArray(plan?.breakfast) ? plan.breakfast : [];
  const lunch = Array.isArray(plan?.lunch) ? plan.lunch : [];
  const dinner = Array.isArray(plan?.dinner) ? plan.dinner : [];
  const snacks = Array.isArray(plan?.snacks) ? plan.snacks : [];
  const notes = Array.isArray(plan?.notes) ? plan.notes : [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Your Personalized Diet Plan</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <MealCard title="Breakfast" meal={breakfast} />
        <MealCard title="Lunch" meal={lunch} />
        <MealCard title="Dinner" meal={dinner} />
        <MealCard title="Snacks" meal={snacks} />
      </div>

      {notes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              {notes.map((note, index) => (
                <li key={index} className="text-muted-foreground">{note}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}