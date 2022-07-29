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
        const response = dirname(path)+'\\profile.ps1'
        //const profilePath = home + '\\Documents\\PowerShell\\profile.ps1'
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
# testando
echo foo_bar_11H33m
    `
    const fileFullPath = profileFileFullPath;
    //open file: create if doesn't exist, append if exists
    const file  = await Deno.open(fileFullPath, { create: true, append: true});
    file.write(new TextEncoder().encode(newData))

}
    


// await its completion
const file = await getProfileFilePath()
console.log(file);

const x = changeProfileFile(file);

