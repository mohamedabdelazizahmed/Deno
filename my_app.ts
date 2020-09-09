/**
 *  use TypeScript you use restrict type 
 *  buffer not use any [unspecific]
 * use Uint8Array instead of any type
 */
function parseBuffer(buffer: Uint8Array) {
  const decoder = new TextDecoder();
  const decodedContent = decoder.decode(buffer);
  return decodedContent;
}
const inputBuffer = new Uint8Array(1024);

// Because Enter omits when write in file 
let bytesRead = await Deno.stdin.read(inputBuffer);
if (bytesRead == null) {
    bytesRead = 0;
}
// remove toString because you use buffer of type Uint8Array
const content = parseBuffer(inputBuffer.subarray(0,bytesRead));
console.log(content);
try {
    // different type pass in writeFile
 await Deno.writeFile("user-input.txt", inputBuffer,{create: false});
    console.log("Done");    
} catch (error) {
    console.log('File user-input.txt does not exist - please create it first');
}


// in official deno manuel go to style guide  section
// > deno run --allow-write --allow-read my_app.ts
// ##  to insert breakpoint ##
// > deno run --allow-write --allow-read  --inspect-brk my_app.ts
// GO to chrome://inspect  and click reload 
