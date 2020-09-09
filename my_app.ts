function parseBuffer(buffer:any) {
    const decoder = new TextDecoder();
    const decodedContent = decoder.decode(buffer);
    return decodedContent;
}
const inputBuffer = new Uint8Array();
await Deno.stdin.read(inputBuffer);
const content = parseBuffer(inputBuffer.toString());

await Deno.writeFile('user-input.txt' , content , {create: false});
console.log("Done");