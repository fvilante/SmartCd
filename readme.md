version 0.0.1-pre-alpha (Not ready to use in production)

Please do not use yet, main functionalities must be introduced.

Currently it just grabs your cd native command and transparently do basically nothing.

If you are interested in Deno development, navigate through the code to see earlier stages code.

---


# Objective

Facilitate the proccess of navigating between directories in the Powershell command line.

Inspired in: zoxide, autojump, z-location, among others.

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
> deno install -f .\smart-cd.ts
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