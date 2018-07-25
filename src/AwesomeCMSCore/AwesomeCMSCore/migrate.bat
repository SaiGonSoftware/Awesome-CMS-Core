@ECHO OFF
CLS
ECHO ====== AWESOME CMS CORE =======
ECHO 1.Add new migrate
ECHO 2.Update database
ECHO ====== AWESOME CMS CORE =======
ECHO.

CHOICE /C 12 /M "Enter your choice:"
IF ERRORLEVEL 2 GOTO Update database
IF ERRORLEVEL 1 GOTO Add new migrate

:Add new migrate
set t=%date%_%time%
set d=%t:~10,4%%t:~7,2%%t:~4,2%_%t:~15,2%%t:~18,2%%t:~21,2%
dotnet ef migrations add InitDB_%d% --verbose
dotnet ef database update --verbose
GOTO End

:Update database
dotnet ef database update --verbose
GOTO End

:End
@pause