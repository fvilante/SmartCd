import { parse as parseArgs } from "https://deno.land/std@0.150.0/flags/mod.ts";
import { parse as parsePath } from "https://deno.land/std@0.150.0/path/mod.ts";

const isPath = async (potentialPath: string): Promise<boolean> => {
    try {
        await Deno.lstat(potentialPath);
        return true;
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
        return false;
        }
    
        throw err;
    }
}

const main = async () => {

    const path = Deno.args[0]

    console.log(Deno.args)
    console.log(path)
    console.log(`path corrent ${Deno.cwd()}`)
    Deno.chdir(path)
    console.log(`path corrent depois ${Deno.cwd()}`)

    
    // define command used to create the subprocess
    const cmd = ["notepad"];



    // create subprocess
    const p = Deno.run({ cmd });

    // await its completion
    await p.status();

}

main();
