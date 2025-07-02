import { dietPlans, users, type User, type InsertUser, type DietPlan, type InsertDietPlan } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createDietPlan(plan: InsertDietPlan): Promise<DietPlan>;
  getDietPlan(id: number): Promise<DietPlan | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createDietPlan(plan: InsertDietPlan): Promise<DietPlan> {
    const [dietPlan] = await db
      .insert(dietPlans)
      .values(plan)
      .returning();
    return dietPlan;
  }

  async getDietPlan(id: number): Promise<DietPlan | undefined> {
    const [plan] = await db.select().from(dietPlans).where(eq(dietPlans.id, id));
    return plan;
  }
}

export const storage = new DatabaseStorage();