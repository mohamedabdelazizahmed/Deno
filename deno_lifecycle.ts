window.onload = (event) => {
  console.log("onload event ");
  console.log(event);
};
// when write window.onload  override  this previous function 

// you can multiple event listener
window.addEventListener("load", (event) => {
  console.log("onload event  - via Listener");
  console.log(event);
});

console.log("...MAIN SCRIPTS ...");
const buffer = new Uint8Array(1024);
console.log('Please enter your message ');
 await Deno.stdin.read(buffer);

 // convert Uint8Array to text
 const  decode = new TextDecoder();
 const input  = decode.decode(buffer);
 console.log('User entered ' + input);
 

window.onunload = (event) => {
  console.log("onunload event ");
  console.log(event);
};
window.addEventListener("unload", (event) => {
    console.log("unload event  - via Listener");
    console.log(event);
});
//  > deno run deno_lifecycle