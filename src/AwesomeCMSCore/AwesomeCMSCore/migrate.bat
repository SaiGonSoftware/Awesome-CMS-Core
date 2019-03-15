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
ECHO Add new migrate
rem Capture Hour
set hour=%time:~0,2%
rem Remove leading space if single digit
if "%hour:~0,1%" == " " set hour=0%hour:~1,1%

rem Minutes
set min=%time:~3,2%
rem Remove leading space
if "%min:~0,1%" == " " set min=0%min:~1,1%

rem Seconds
set secs=%time:~6,2%
rem Remove leading space
if "%secs:~0,1%" == " " set secs=0%secs:~1,1%

rem Year
set year=%date:~-4%

rem Month
set month=%date:~3,2%
rem Remove leading space if single digit
if "%month:~0,1%" == " " set month=0%month:~1,1%

rem Day
set day=%date:~0,2%
rem Remove leading space
if "%day:~0,1%" == " " set day=0%day:~1,1%

rem Reformatted date
set datetimef=%year%-%month%-%day%_%hour%-%min%-%secs%

dotnet ef migrations add InitDB_%datetimef% --verbose
dotnet ef database update --verbose
GOTO End

:Update database
dotnet ef database update --verbose
GOTO End

:End
@pause