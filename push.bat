@echo off
chcp 65001 >nul
title IQS - Push su GitHub
color 0B

echo.
echo  ╔══════════════════════════════════════════╗
echo  ║         IQS - Upload su GitHub           ║
echo  ╚══════════════════════════════════════════╝
echo.

:: Verifica repo inizializzato
if not exist ".git" (
    echo  [ERRORE] Repo non inizializzato!
    echo  Esegui prima setup_github.bat
    pause
    exit /b 1
)

:: Mostra stato attuale
echo  [INFO] File modificati:
git status --short
echo.

:: Messaggio commit
set TIMESTAMP=%date:~6,4%-%date:~3,2%-%date:~0,2% %time:~0,2%:%time:~3,2%
set DEFAULT_MSG=update %TIMESTAMP%

set /p COMMIT_MSG="  Messaggio commit [invio = '%DEFAULT_MSG%']: "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=%DEFAULT_MSG%

echo.
echo  [1/3] Aggiunta file...
git add .

echo  [2/3] Commit: "%COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"

if errorlevel 1 (
    echo.
    echo  [INFO] Nessuna modifica da committare.
    pause
    exit /b 0
)

echo  [3/3] Push su GitHub...
git push origin main

if errorlevel 1 (
    echo.
    echo  [ERRORE] Push fallito. Verifica la connessione e le credenziali.
) else (
    echo.
    echo  ╔══════════════════════════════════════════╗
    echo  ║   Upload completato con successo!        ║
    echo  ╚══════════════════════════════════════════╝
)

echo.
pause
