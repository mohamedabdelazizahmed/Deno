//import { server } from "./my_server.ts";
import defaultServer from "./my_server.ts";
console.log("http://localhost:3000/");
for await (const request of defaultServer) {
  console.log(request.method);
  console.log(request.url);

  if (
    request.method == "POST" &&
    request.url == "/store-message" &&
    request.contentLength
  ) {
    // read body and extract body
    const buffer = new Uint8Array(request.contentLength);// long byte 
    let totalBytesRead = 0 ;
    while (true) {
      // shouldn't read data once  instead well get multiple chunks of data
      const bytesRead = await request.body.read(buffer);
      if (bytesRead == null) {
        break;
      }
      totalBytesRead += bytesRead;
      // all Done
      if (totalBytesRead >= request.contentLength) {
          break;
      }
    }

    // write buffer in text message
    await Deno.writeFile('user-message.txt' ,buffer);
    const decoder  = new TextDecoder();
    const data  = decoder.decode(buffer);
    console.log(data);

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
//> deno run --allow-net --allow-write=user-message.txt dummy_response_server.ts
