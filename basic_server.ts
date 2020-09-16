import { serve } from "http/server.ts";
const server = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of server) {
  req.respond({ body: "Hello World :)" });
}
// # deno run --allow-net basic_server.ts
// # denon run --allow-net basic_server.ts

// > deno run --allow-net  --importmap=import_map.json --unstable basic_server.ts
// > denon basic_server.ts