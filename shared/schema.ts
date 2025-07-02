import { pgTable, text, serial, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const dietPlans = pgTable("diet_plans", {
  id: serial("id").primaryKey(),
  personalMetrics: json("personal_metrics").notNull(),
  nutritionGoals: json("nutrition_goals").notNull(),
  hasPdfData: boolean("has_pdf_data").notNull().default(false),
  pdfData: json("pdf_data"),
  generatedPlan: json("generated_plan").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDietPlanSchema = createInsertSchema(dietPlans).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type DietPlan = typeof dietPlans.$inferSelect;
export type InsertDietPlan = z.infer<typeof insertDietPlanSchema>;
