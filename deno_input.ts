// Deno Official API Doc 
// Deno using inputs as terminal ... 
const buffer = new Uint8Array(1024);
console.log('Please enter your message ');
 await Deno.stdin.read(buffer);

 // convert Uint8Array to text
 const  decode = new TextDecoder();
 const input  = decode.decode(buffer);
 console.log('User entered ' + input);

 // > deno run deno_input.ts