// >  deno cache app.ts  [force deno to look all your imports look and download and cache ]
import {  Router ,State,HttpError, Status} from "https://deno.land/x/oak@v6.2.0/mod.ts";
import { renderFileToString } from 'https://deno.land/x/dejs@0.8.0/mod.ts';
const router = new Router();

let courseGoals:{name:string; id:string}[] = [];
// READ
router.get("/", async (ctx) => {
  const body = await renderFileToString(Deno.cwd() + "/views/course_goals.ejs", {
    title: "MyGoals",
    goals:courseGoals
  });
  ctx.response.body = body;
});
// READ SINGLE ELEMENT
router.get("/:goalId", async (ctx) => {
  const id = ctx.params.goalId;
  const goal = courseGoals.find(goal=>goal.id == id);
  if (!goal) {
    const error = new HttpError();
    error.status = Status.NotFound;
    throw error;
    // throw new Error('Did not find goal');
  }
  const body = await renderFileToString(Deno.cwd() + "/views/course_goal.ejs", {
    goal:goal     //courseGoals.find(goal=>goal.id == id)?.name //? => if you don't expression return null
  });
  ctx.response.body = body;
});

router.post("/add-goal", async (ctx) => {
  if (ctx.request.hasBody) {
    const body = ctx.request.body();
    console.log(body);
      const value = await body.value; // an object of parsed JSON
      const newGoalTitle = value.get('newGoal');
      // console.log(value.get('newGoal'));
      console.log(newGoalTitle);
      if (newGoalTitle.trim().length === 0) {
        return ctx.response.redirect('/'); //return ensure other code not executed 
      }
      const newGoal = {id: new Date().toISOString() , name: newGoalTitle};
      console.log(newGoal);
      courseGoals.push(newGoal);
      ctx.response.redirect('/');  
  }

});


router.post("/:goalId", async (ctx) => {
  const id = ctx.params.goalId;
  courseGoals = courseGoals.filter(goal=>goal.id !== id);
  ctx.response.redirect('/');
});
export default router;