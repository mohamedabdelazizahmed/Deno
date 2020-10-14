// >  deno cache app.ts  [force deno to look all your imports look and download and cache ]
import { Application, Router ,send } from "https://deno.land/x/oak@v6.2.0/mod.ts";
import { renderFileToString ,renderFile } from 'https://deno.land/x/dejs@0.8.0/mod.ts';

const app = new Application();
const router = new Router();

const courseGoals:{name:string; id:string}[] = [];
// add new Route for www.test.com
router.get("/", async (ctx) => {
  const body = await renderFileToString(Deno.cwd() + "/course_goals.ejs", {
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



// to Register router and run it
app.use(router.routes());
app.use(router.allowedMethods());
// this is middleware able to fetch static file
// to send file app.css
app.use(async(ctx)=>{
  // function send does not send back response 
  // but manipulate in response in ctx object we need await to manipulate to finish 
  await send(ctx , ctx.request.url.pathname); //pathname =>/app.css
})

app.listen({ port: 3000 });
