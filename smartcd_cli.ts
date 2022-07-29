
//Note: This program receives arguments from Deno.Args,
//and must return a console.log(path) where path will be given as argument to the native cd command  

const main = () => {
    console.log(Deno.args[0])
}


main();