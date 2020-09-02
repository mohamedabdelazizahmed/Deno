//import { server } from "./my_server.ts"; 
import defaultServer from './my_server.ts';
console.log("http://localhost:3000/");
for await (const req of defaultServer) {
  const headers = new Headers();
  // to make clear in browser sending back some html code
  headers.set('Content-Type' ,'text/html'); 
  const body  =  `<h2>First App by Deno :) </h2>
  <form>
  <input type="text"/>
  <button>submit </button>
  </form>`
  req.respond({ body: body, headers:headers });
}


//> deno run --allow-net dummy_response_server.ts