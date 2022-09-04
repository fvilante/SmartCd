import { parse} from 'https://deno.land/std@0.150.0/encoding/jsonc.ts'

//Note: This program receives arguments from Deno.Args,
//and must return a console.log(path) where path will be given as argument to the native cd command  

const main = async () => {
    const dbname = 'database.jsonc'
    //fix: check if file exists
    // open file
    const file = await Deno.open(dbname)
    const dataraw: Uint8Array = new Uint8Array();
    await file.read(dataraw)
    // parse file data
    const json__ = new TextDecoder().decode(dataraw)    
    const data = parse(json__)
    console.log(`file parsed=`,data)
    console.log(Deno.args[0])
}   // read path from arguments
    // write into the dbfile
    // verify if exact match of arg[0] exists
    // else search similar thing in db
    // note: introduce the feature of gloob from deno std


await main();