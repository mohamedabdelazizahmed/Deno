function parseBuffer(buffer:any) {
    const decoder = new TextDecoder();
    const decodedContent = decoder.decode(buffer);
    return decodedContent;
}
const inputBuffer = new Uint8Array();
await Deno.stdin.read(inputBuffer);
const content = parseBuffer(inputBuffer.toString());

// different type pass in writeFile
await Deno.writeFile('user-input.txt' , inputBuffer , {create: false});
console.log("Done");