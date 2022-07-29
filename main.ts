import { dirname } from "https://deno.land/std@0.150.0/path/mod.ts";

const getProfileFilePath = async ():Promise<string> => {

    //note: I can port or use as reference node-typescript package
    //      reason is I must first of all assure to find correct powershell.exe
    //      maybe I can scan in the path enviroment etc.

    //fix: client should be asked to decide which level he want "currentUserAllHosts, AllUsersAllHosts, etc..."

    // define command used to create the subprocess
    //fix: check the version of powershell.exe before procceed
    //fix: assure that the powersheell.exe client is using, is the same that we will run (diferent versions may return different profile path)
    //note: I found i my computer pwsh.exe for PS 7 (maybe microsoft has changed name convention, check this later)
    // ok here the explation of what happened:
    /*
        there is a break convention after PS 6.0 in where PS executable is placed, and how it is named.
        see more here: https://powershellexplained.com/2017-12-29-Powershell-what-is-pwsh/
        in my had instaled ps 7 and ps 5 in my computer, and although my session is 7, I was calling PS 5,
        and they have absolutely different $profile file name and path


    */
   /*
        update: I found that even using PS 7 this strange behaviour happens

        in current PS 7 session: 

        there is difference to run -Command within quotes and within brakets

        update2:
            it seems that "pwsh.exe -Command" parameter when used with quotes does not execute more than one step of preocessing

            for example, bellow does not differs as expected:
            pwsh.exe  -noprofile -Command "{$PROFILE.CurrentUserCurrentHost}"
            pwsh.exe  -noprofile -Command "{$PROFILE}"

   */

            /*
            
            FINAL RESUME: see https://twitter.com/FlavioVilante/status/1553025229848469505

            Why this:
            
            $PROFILE | Select-Object *Host*  | Format-list
            
            yields diferent results from this:


            */
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

