// >  deno cache app.ts  [force deno to look all your imports look and download and cache ]
import {  Router } from "https://deno.land/x/oak@v6.2.0/mod.ts";
import { renderFileToString } from 'https://deno.land/x/dejs@0.8.0/mod.ts';
const router = new Router();

const courseGoals:{name:string; id:string}[] = [];
// add new Route for www.test.com
router.get("/", async (ctx) => {
  const body = await renderFileToString(Deno.cwd() + "/views/course_goals.ejs", {
    title: "MyGoals",
    goals:courseGoals
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

export default router;