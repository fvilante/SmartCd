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

    //powershell -NoProfile -Command {$profile.CurrentUserAllHosts}
    // define command used to create the subprocess
    const cmd = ["powershell.exe","-Command", '"{$profile}"'];
    
    // create subprocess
    const p = Deno.run({ cmd, stdin: 'piped', stdout: 'piped', stderr: 'piped' });

    // await its completion
    const { code } = await p.status();

    if (code === 0) {
        const rawOutput = await p.output();
        await Deno.stdout.write(rawOutput);
      } else {
        const rawError = await p.stderrOutput();
        const errorString = new TextDecoder().decode(rawError);
        console.log(errorString);
      }

      Deno.exit(code);

}

main();
