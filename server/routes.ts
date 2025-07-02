import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { generateDietPlan } from "./openai";
import { extractTextFromPDF } from "./pdf";
import { insertDietPlanSchema } from "@shared/schema";
import { PersonalMetrics, NutritionGoals } from "@shared/types";

// Extend Express.Request to include file from multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

export function registerRoutes(app: Express): Server {
  app.post("/api/diet-plan", upload.single('pdf'), async (req: MulterRequest, res) => {
    try {
      const personalMetricsRaw = req.body.personalMetrics;
      const nutritionGoalsRaw = req.body.nutritionGoals;

      if (!personalMetricsRaw || !nutritionGoalsRaw) {
        throw new Error("Missing required form data");
      }

      let personalMetrics: PersonalMetrics;
      let nutritionGoals: NutritionGoals;

      try {
        personalMetrics = JSON.parse(personalMetricsRaw);
        nutritionGoals = JSON.parse(nutritionGoalsRaw);
      } catch (e) {
        throw new Error("Invalid JSON in form data");
      }

      let pdfData: string | undefined;
      if (req.file) {
        pdfData = await extractTextFromPDF(req.file.buffer);
      }

      const dietPlan = await generateDietPlan(
        personalMetrics,
        nutritionGoals,
        pdfData
      );

      const validatedData = insertDietPlanSchema.parse({
        personalMetrics,
        nutritionGoals,
        hasPdfData: !!pdfData,
        pdfData: pdfData ? { text: pdfData } : null,
        generatedPlan: dietPlan
      });

      const savedPlan = await storage.createDietPlan(validatedData);
      res.json(savedPlan);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}