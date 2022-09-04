import { parse as parseArgs } from "https://deno.land/std@0.150.0/flags/mod.ts";
import { parse as parsePath } from "https://deno.land/std@0.150.0/path/mod.ts";



console.log(Deno.args[0])
console.log(parsePath(Deno.args[0]));
console.log(parsePath("oasijdfoisjadofa"));


