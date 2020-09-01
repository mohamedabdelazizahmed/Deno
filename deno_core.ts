// Deno Official API Doc 
setTimeout(() => {
    // convert text to Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode("This is first message we save in a file \n");
     Deno.writeFile("test.txt", data).then(()=>{
         console.log("Done");
     });
    
}, 1000);
// > deno run --allow-write=test.txt deno_core.ts 