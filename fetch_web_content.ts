// Fetch Web Content  using Deno API
let buffer = new Uint8Array(1024);
console.log("Please Enter Your URL: ");
await Deno.stdin.read(buffer);

const decoder = new TextDecoder();
const url = decoder.decode(buffer);

const response = await fetch(url);
// parse the response to text
const content = await response.text();

// convert text to encode uti8array
const encoder = new TextEncoder();
const data = encoder.encode(content);

await Deno.writeFile("website-content.html" ,data);

console.log("... Done ...");

// > Deno run --allow-write --allow-net fetch_web_content.ts