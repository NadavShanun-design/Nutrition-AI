import OpenAI from "openai";
import { PersonalMetrics, NutritionGoals, DietPlanResponse } from "@shared/types";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateDietPlan(
  metrics: PersonalMetrics,
  goals: NutritionGoals,
  pdfData?: string
): Promise<DietPlanResponse> {
  try {
    const prompt = `Generate a personalized diet plan based on the following information:
      Personal Metrics:
      - Age: ${metrics.age}
      - Gender: ${metrics.gender}
      - Weight: ${metrics.weight}kg
      - Height: ${metrics.height}cm
      - Activity Level: ${metrics.activityLevel}
      - Dietary Restrictions: ${metrics.dietaryRestrictions.join(", ")}

      Goals:
      - Primary Goal: ${goals.primary}
      - Secondary Goals: ${goals.secondary.join(", ")}
      ${goals.targetWeight ? `- Target Weight: ${goals.targetWeight}kg` : ""}
      ${goals.weeklyGoal ? `- Weekly Goal: ${goals.weeklyGoal}kg` : ""}

      ${pdfData ? `Additional Health Data:\n${pdfData}` : ""}

      Generate a detailed diet plan in JSON format with the following structure:
      {
        "breakfast": [
          {
            "name": "Meal name",
            "portions": "Portion description",
            "calories": number,
            "protein": number,
            "carbs": number,
            "fats": number,
            "instructions": "Optional preparation instructions"
          }
        ],
        "lunch": [same structure as breakfast],
        "dinner": [same structure as breakfast],
        "snacks": [same structure as breakfast],
        "notes": ["Important dietary notes", "Recommendations", "etc"]
      }

      Include 2-3 options for each meal type and ensure all nutritional values are numbers.
      Add relevant notes based on the person's goals and metrics.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No response content from OpenAI");
    }

    const parsedResponse = JSON.parse(content);

    // Validate the response structure
    if (!parsedResponse.breakfast || !parsedResponse.lunch || 
        !parsedResponse.dinner || !parsedResponse.snacks || 
        !Array.isArray(parsedResponse.notes)) {
      throw new Error("Invalid response format from OpenAI");
    }

    return parsedResponse as DietPlanResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to generate diet plan: ${errorMessage}`);
  }
}