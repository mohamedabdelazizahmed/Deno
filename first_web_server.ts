import { serve } from "https://deno.land/std@0.67.0/http/server.ts";
const server = serve({ port: 3000 });
console.log("http://localhost:3000/");
for await (const req of server) {
  req.respond({ body: "Hello World\n" });
}
//> deno run first_web_server.ts 
//> deno run reload first_web_server.ts
//> deno run --allow-net first_web_server.ts
