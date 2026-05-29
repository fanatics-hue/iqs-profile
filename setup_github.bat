@echo off
chcp 65001 >nul
title IQS - Setup GitHub (Prima configurazione)
color 0A

echo.
echo  ╔══════════════════════════════════════════╗
echo  ║      IQS - Setup GitHub (1a volta)       ║
echo  ╚══════════════════════════════════════════╝
echo.
echo  Repo: https://github.com/fanatics-hue/iqs-profile.git
echo.

:: Verifica che git sia installato
git --version >nul 2>&1
if errorlevel 1 (
    echo  [ERRORE] Git non e' installato!
    echo  Scaricalo da: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo  [1/3] Aggiunta di tutti i file...
git add .

echo  [2/3] Primo commit...
git commit -m "primo upload - setup iniziale IQS"

echo.
echo  [3/3] Push su GitHub...
echo  (Inserisci le tue credenziali GitHub se richiesto)
echo  NOTA: come password usa un Personal Access Token, non la password GitHub
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo  [ERRORE] Push fallito. Verifica:
    echo    1. Il repo esiste su GitHub
    echo    2. Hai i permessi sul repo fanatics-hue/iqs-profile
    echo    3. Stai usando un Personal Access Token come password
    echo.
    echo  GitHub ^> Settings ^> Developer settings ^> Personal access tokens
) else (
    echo.
    echo  ╔══════════════════════════════════════════╗
    echo  ║   Setup completato! Usa push.bat         ║
    echo  ║   per i prossimi upload.                 ║
    echo  ╚══════════════════════════════════════════╝
)

echo.
pause
