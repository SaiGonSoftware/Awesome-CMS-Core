@ECHO OFF
CLS
ECHO ====== AWESOME CMS CORE =======
ECHO Upgrade npm
ECHO ====== AWESOME CMS CORE =======
ECHO.

npm install -g npm-check-updates
ncu -u
npm install

:End
@pause