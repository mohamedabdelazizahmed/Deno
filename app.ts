// >  deno cache app.ts  [force deno to look all your imports look and download and cache ]
import { Application } from "https://deno.land/x/oak@v6.2.0/mod.ts";

const app = new Application();
// [middleware]function executed for every request
app.use(async(ctx, next) => {
  console.log("Middleware 1");
  console.log(ctx.request.method);
  console.log(ctx.request.url);
  ctx.response.body = "Message From Middleware ";
    await next(); // to go next middleware 2 after middleware 2 do console After Next
    console.log('After next');
});
app.use((ctx, next) => {
  console.log("Middleware 2");
  ctx.response.body = "Message From Middleware 2";
});
app.listen({ port: 3000 });
