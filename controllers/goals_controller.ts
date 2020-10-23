import {
  State,
  HttpError,
  Status,
  RouterContext,
} from "https://deno.land/x/oak@v6.2.0/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs@0.8.0/mod.ts";

import { CourseGoal } from "../models/course_goal.ts";

type RContext = RouterContext<
  Record<string | number, string | undefined>,
  Record<string, any>
>;
export async function getAllGoals(ctx: RContext) {
  const body = await renderFileToString(
    Deno.cwd() + "/views/course_goals.ejs",
    {
      title: "MyGoals",
      goals: CourseGoal.findAll(),
    },
  );
  ctx.response.body = body;
}

export async function getSignalGoal(ctx: RContext) {
  const id = ctx.params.goalId!;
  const goal = CourseGoal.findById(id);
  if (!goal) {
    const error = new HttpError();
    error.status = Status.NotFound;
    throw error;
  }
  const body = await renderFileToString(Deno.cwd() + "/views/course_goal.ejs", {
    goal: goal, //courseGoals.find(goal=>goal.id == id)?.name //? => if you don't expression return null
  });
  ctx.response.body = body;
}

export async function createGoal(ctx: RContext) {
  if (ctx.request.hasBody) {
    const body = ctx.request.body();
    console.log(body);
    const value = await body.value; // an object of parsed JSON
    const newGoalTitle = value.get("newGoal");
    // console.log(value.get('newGoal'));
    console.log(newGoalTitle);
    if (newGoalTitle.trim().length === 0) {
      return ctx.response.redirect("/"); //return ensure other code not executed
    }
    CourseGoal.create(newGoalTitle);
    ctx.response.redirect("/");
  }
}

export async function updateGoal(ctx: RContext) {
  console.log("... update The GOAL ...");
  if (ctx.request.hasBody) {
    const body = ctx.request.body();
    const value = await body.value; // an object of parsed JSON
    const updateGoalTitle = value.get("update-goal");
    const updateGoalId = value.get("goal-id") as string;
    // console.log(value.get('newGoal'));
    // courseGoals.find(goal => goal.id === updateGoalId)?.name = updateGoalTitle;
    try {
      CourseGoal.update(updateGoalId, updateGoalTitle);
      ctx.response.redirect("/");
    } catch (err) {
      const error = new HttpError();
      error.status = Status.NotFound;
      throw error;
    }
  }
}

export async function deleteGoal(ctx: RContext) {
  const id = ctx.params.goalId!;
  CourseGoal.delete(id);
  ctx.response.redirect("/");
}
