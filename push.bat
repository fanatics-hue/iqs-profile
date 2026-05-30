@echo off
cd /d "%~dp0"
title IQS - Push su GitHub
color 0B

echo.
echo  ================================
echo    IQS - Upload su GitHub
echo  ================================
echo.

if not exist ".git" (
    echo  ERRORE: Repo non inizializzato!
    pause
    exit /b 1
)

echo  File modificati:
git status --short
echo.

set TIMESTAMP=%date:~6,4%-%date:~3,2%-%date:~0,2% %time:~0,2%:%time:~3,2%
set DEFAULT_MSG=update %TIMESTAMP%

set /p COMMIT_MSG="  Messaggio commit [invio per data/ora]: "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=%DEFAULT_MSG%

echo.
git add .
git commit -m "%COMMIT_MSG%"

if errorlevel 1 (
    echo.
    echo  Nessuna modifica da caricare.
    pause
    exit /b 0
)

git push origin main

if errorlevel 1 (
    echo.
    echo  ERRORE: Push fallito.
) else (
    echo.
    echo  ================================
    echo    Upload completato!
    echo  ================================
)

echo.
pause
