set mainDisk=d:
set appRoot=d:\Blank\labs\temp\ZML\demo\
set rar="C:\Program Files\WinRAR\WinRAR.exe"
set nw=D:\Blank\labs\temp\ZML\nwjs-v0.12.3-win-x64
set exportDir=export
%mainDisk%
cd %appRoot%
call build.bat
cd %appRoot%
rmdir %exportDir% /s/q
md %exportDir%
cd bin-release
%rar% a ..\%exportDir%\package.zip ^
assets ^
release.html ^
..\package.json
cd ..
ren %exportDir%\package.zip package.nw
xcopy %nw% %exportDir% /y/s
copy /b %exportDir%\nw.exe+%exportDir%\package.nw %exportDir%\app.exe
del %exportDir%\nw.exe
del %exportDir%\package.nw
del %exportDir%\credits.html