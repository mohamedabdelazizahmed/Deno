// >  deno cache app.ts  [force deno to look all your imports look and download and cache ]
import { Application, Router } from "https://deno.land/x/oak@v6.2.0/mod.ts";

const app = new Application();
const router = new Router();

// add new Route for www.test.com
router.get('/' , (ctx)=>{
    ctx.response.body =`
    <h2> + Add New Goal </h2>
    <form action="/add-goal" method="post">
        <input type="text" name="new-goal" />
        <button type="submit"> Add Goal</button>
    </form>`;
    ctx.response.type='text/html';
});
 
router.post('/add-goal' , async(ctx)=>{
    //get data from body
    const body = await ctx.request.body();
        ctx.response.redirect('/');
    
    

});

app.use((ctx ,next)=>{console.log("My Own middleware before router.routes");next();});
// to Register router and run it 
app.use(router.routes());
app.use(router.allowedMethods());




// [middleware]function executed for every request
// app.use(async(ctx, next) => {
//   console.log("Middleware 1");
//   console.log(ctx.request.method);
//   console.log(ctx.request.url);
//   ctx.response.body = "Message From Middleware ";
//     await next(); // to go next middleware 2 after middleware 2 do console After Next
//     console.log('After next');
// });
// app.use((ctx, next) => {
//   console.log("Middleware 2");
//   ctx.response.body = "Message From Middleware 2";
// });
app.listen({ port: 3000 });
