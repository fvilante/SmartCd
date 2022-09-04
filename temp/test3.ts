// define command used to create the subprocess
const cmd = ["powershell.exe","-NoProfile","-Command", '"{$profile}"'];
    
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
