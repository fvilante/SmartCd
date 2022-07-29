/*
  TODO: (unordered)
    - do not append if function already exists (double append)
    - implement uninstaller
    - test on others PS versions and enviroments
    - confirm pwsh.exe version and location is the correct one (scan for multiple versions in the path)
    - Make the path to main.ts file flexible based on client folder structure
*/

import { dirname } from "https://deno.land/std@0.150.0/path/mod.ts";

const getProfileFilePath = async ():Promise<string> => {

    //fix: see this for more -> https://stackoverflow.com/questions/73169274/cannot-access-profile-currentuserallhosts-using-pwsh-exe
    const cmd = ["pwsh.exe","-NoProfile","-Command", '"{$profile}"'];

    // create subprocess
    const p = Deno.run({ cmd, stdin: 'piped', stdout: 'piped', stderr: 'piped' });

    const { code } = await p.status();

    if (code === 0) {
        const rawOutput = await p.output();
        const result = (new TextDecoder().decode(rawOutput)).trim()
        const path = result.replaceAll('{','').replaceAll('}',''); // fix: why this step is even necessary?]
        const response = dirname(path)+'\\profile.ps1' //fix: is this a stable solution?
        //todo: I should add a step to check if the fetched data is a valid file path.
        return response
        
      } else {
        const rawError = await p.stderrOutput();
        const errorString = new TextDecoder().decode(rawError);
        throw new Error(errorString);
      }

}

const changeProfileFile = async (profileFileFullPath:string):Promise<void> => {
    const newData =  `
    function Set-FVLocation{
      param(
        $Arguments
      )
      deno run "C:\\Mesa_de_Trabalho\\Software\\smartCD\\smartcd_cli.ts" $Arguments | Set-Location
    }
    Set-Alias -name cd -value Set-FVLocation -Option AllScope
    `
    const fileFullPath = profileFileFullPath;
    //open file: create if doesn't exist, append if exists
    const file  = await Deno.open(fileFullPath, { create: true, append: true});
    file.write(new TextEncoder().encode(newData))

}
    


// await its completion
console.log('Waiting installing...')
const file = await getProfileFilePath()
console.log(file);
changeProfileFile(file)
  .then( () => {
    console.log(`instaled!`);
  });


