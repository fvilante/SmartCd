import { 
    isAbsolute,
    join,
    normalize,
    relative,
 } from "https://deno.land/std@0.154.0/path/win32.ts";



// First argument contains the current directory as an absolute path.
// Second argument is the path directory to change to. This target path may be relative or absolute
// Output is a string containing the directory path to change to
const main = (args: string[]):string => {
    if (args.length===0) return ""
    const [currentPath, nextPath, ..._otherArgs] = args
    const assertion1 = isAbsolute(currentPath);
    if(!assertion1) {
        throw new Error(`Current directory ${currentPath} must be absolute`)
    }
    let pathToChangeTo = ""
    if (!isAbsolute(nextPath)) {
        pathToChangeTo = join(normalize(currentPath),normalize(nextPath));
    } else {
        pathToChangeTo = normalize(nextPath);
    }

    // NOTE: changing using relative path to be more safe by being more opaque about our system path structure to outside consumers.
    const result = relative(normalize(currentPath), pathToChangeTo) 
    return result + _otherArgs.join(" ");
}

// The stdin is passed via pipe to the Set-Location commandlet, as well as its other arguments
console.log(main(Deno.args));