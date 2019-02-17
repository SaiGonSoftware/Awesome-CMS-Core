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
dotnet ef migrations add InitDB --verbose
dotnet ef database update --verbose
GOTO End

:Update database
dotnet ef database update --verbose
GOTO End

:End
@pause