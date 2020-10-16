// >  deno cache app.ts  [force deno to look all your imports look and download and cache ]
import { Application, send, isErrorStatus, isHttpError, Status } from "https://deno.land/x/oak@v6.2.0/mod.ts";
import { renderFileToString ,renderFile } from 'https://deno.land/x/dejs@0.8.0/mod.ts';
import goalsRouter from "./routes/goals.ts";
const app = new Application();

app.use(async(ctx ,next)=>{
  try {
    await next();
  } catch (error) {
    if (isHttpError(error) && error.status == Status.NotFound) {
      // ctx.response.body = 'This resource was not found , sorry ';
      const body = await renderFileToString(Deno.cwd() + "/views/not_found.ejs", {});
      ctx.response.body = body;
    }else{
      ctx.response.body = 'Something went wrong , Sorry! please try again later';
    }
  }
})

// to Register router and run it
app.use(goalsRouter.routes());
app.use(goalsRouter.allowedMethods());
// this is middleware able to fetch static file
// to send file app.css
app.use(async(ctx)=>{
  // function send does not send back response 
  // but manipulate in response in ctx object we need await to manipulate to finish 
  await send(ctx , ctx.request.url.pathname,{root:'static'}); //pathname =>/app.css
})

app.listen({ port: 3000 });
