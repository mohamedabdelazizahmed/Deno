import { serve } from "https://deno.land/std@0.67.0/http/server.ts";

const server = serve({ port: 3000 });
// export const server = serve({ port: 3000 });  you must import by name in  curly brackets
export default server; // you ca import in different name Like MyServer