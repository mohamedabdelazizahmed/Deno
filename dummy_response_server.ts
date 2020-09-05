//import { server } from "./my_server.ts";
import defaultServer from "./my_server.ts";
console.log("http://localhost:3000/");
for await (const request of defaultServer) {
  console.log(request.method);
  console.log(request.url);

  if (request.method == "POST" && request.url == "/store-message") {
    const headers = new Headers();
    headers.set("Location", "/confirm");
    request.respond({ headers: headers, status: 303 }); //redirect status code
  } else {
    const headers = new Headers();
    // to make clear in browser sending back some html code
    headers.set("Content-Type", "text/html");
    const body = `<h2>First App by Deno :) </h2>
    <form action="/store-message" method="POST">
    <input type="text" name="message"/>
    <button type="submit">submit </button>
    </form>`;
    request.respond({ body: body, headers: headers });
  }
}

//> deno run --allow-net dummy_response_server.ts
