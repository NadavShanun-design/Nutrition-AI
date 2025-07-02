export interface PersonalMetrics {
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
  dietaryRestrictions: string[];
}

export interface NutritionGoals {
  primary: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'health_improvement';
  secondary: string[];
  targetWeight?: number;
  weeklyGoal?: number;
}

export interface DietPlanResponse {
  breakfast: MealPlan[];
  lunch: MealPlan[];
  dinner: MealPlan[];
  snacks: MealPlan[];
  notes: string[];
}

export interface MealPlan {
  name: string;
  portions: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  instructions?: string;
}
