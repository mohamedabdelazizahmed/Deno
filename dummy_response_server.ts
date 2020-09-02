//import { server } from "./my_server.ts"; 
import defaultServer from './my_server.ts';
console.log("http://localhost:3000/");
for await (const req of defaultServer) {
  req.respond({ body: "Hello World\n" });
}


//> deno run --allow-net dummy_response_server.ts