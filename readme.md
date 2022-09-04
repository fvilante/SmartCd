# Read Me First

version 0.0.1-pre-alpha (Not ready to use in production!)

My purpose with this project is to have fun implementing something simple from scratch using [Deno](https://deno.land/).

The experience of implementing this project since the initial idea to its current state is being shared publicly through [this tweet thread](https://twitter.com/FlavioVilante/status/1552799001644351488?s=20&t=r4eV_Bdrnc_9ILNpy1bhIg) 

Currently the program functionality just does nothing. More precisely it does something, but the net effect is equivalent to nothing (What in Category Theory is called Identity Morphism). In next versions some functionalities will be introduced.

You can follow/talk to me on twitter at [@FlavioVilante](https://twitter.com/FlavioVilante).

If you want to experiment alfa version follow below instructions.

---


# Objective

This program aim facilitate the proccess of navigating between directories in the Powershell command line.

Inspired in: [zoxide](https://github.com/ajeetdsouza/zoxide), [autojump](https://github.com/wting/autojump), [z-location](https://github.com/vors/ZLocation), [among others](https://twitter.com/FlavioVilante/status/1555757349599592453?s=20&t=r4eV_Bdrnc_9ILNpy1bhIg).

# Install Dependencies

To run this program successfully you'll need to have below dependencies in your machine:

* Windows 10 or greater
* [Powershell 7](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2) or grater
* [Deno 1.24](https://deno.land/manual@v1.25.1/getting_started/installation) or greater

To check your Powershell version open a terminal window and type `$PSVersionTable.PSVersion`, the output should be like below: 

```powershell
> $PSVersionTable.PSVersion

Major  Minor  Patch  PreReleaseLabel BuildLabel
-----  -----  -----  --------------- ----------
7      2      6
```

To check your Deno version type `deno --version` in your terminal. The output should be like below: 

```powershell
> deno --version

deno 1.24.2 (release, x86_64-pc-windows-msvc)
v8 10.4.132.20
typescript 4.7.4
```

# Instalation

Once you have all dependencies in your machine, type below on your terminal:

```powershell
> deno install -f https://raw.githubusercontent.com/fvilante/SmartCd/master/smart-cd.ts
``` 

The result on screen should be:

```powershell
✅ Successfully installed smart-cd
C:\Users\Flavio\.deno\bin\smart-cd.cmd
C:\Users\Flavio\.deno\bin\smart-cd (shell)
```

After copy and paste the following code in your profile file.

```
echo "starting smartcd..."
function Set-FVLocation{
      param(
        $Arguments
      )
      $currentDir = (pwd).Path.ToString()
      smart-cd $currentDir $Arguments # Set-Location
    }
Set-Alias -name cd -value Set-FVLocation -Option AllScope
echo "Smartcd installed!"
```

To open your profile file to edition using notepad type on your terminal: 

```powershell
> notepad $profile
```

# Uninstalation

To uninstall you must follow two steps:

First uninstall the command line tool typing:

```
> deno uninstall smart-cd.ts

deleted C:\Users\Flavio\.deno\bin\smart-cd.cmd
✅ Successfully uninstalled smart-cd.ts
```

Next remove the code on your profile file that you pasted and copied during the instalation proccess (see above in the Instalation part)


That is it!