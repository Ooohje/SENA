@echo off
title SENA Backend Server
cd /d "%~dp0"

echo.
echo ============================================
echo   SENA Backend Server
echo ============================================
echo.

REM -- python check --
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python not found in PATH.
    echo   Install Python 3.10+ : https://www.python.org/downloads/
    echo   Check "Add Python to PATH" during install.
    pause
    exit /b 1
)
echo [OK] Python found

REM -- Ollama check / start --
curl -s --max-time 2 http://localhost:11434 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    where ollama >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Ollama not installed. Get it at https://ollama.com/download
        pause
        exit /b 1
    )
    echo [INFO] Starting Ollama...
    start "" ollama serve
    timeout /t 4 /nobreak >nul
) else (
    echo [OK] Ollama running
)

REM -- qwen3:8b --
ollama list 2>nul | findstr "qwen3" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Pulling qwen3:8b - first run only, may take a while...
    ollama pull qwen3:8b
)
echo [OK] qwen3:8b ready

REM -- ngrok --
REM ★ 고정 도메인이 있으면 아래에 입력하세요 (dashboard.ngrok.com에서 발급)
REM   예: set NGROK_DOMAIN=sena-xyz.ngrok-free.app
set NGROK_DOMAIN=

where ngrok >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    if defined NGROK_DOMAIN (
        echo [INFO] Starting ngrok with fixed domain: %NGROK_DOMAIN%
        start /B "" ngrok http 8000 --domain=%NGROK_DOMAIN%
        set NGROK_URL=https://%NGROK_DOMAIN%
    ) else (
        echo [INFO] Starting ngrok on port 8000...
        start /B "" ngrok http 8000
        timeout /t 3 /nobreak >nul
        curl -s http://localhost:4040/api/tunnels > "%~dp0ngrok_resp.json" 2>nul
        for /f "delims=" %%U in ('python -c "import json; d=json.load(open(r'%~dp0ngrok_resp.json')); print(d['tunnels'][0]['public_url'])" 2^>nul') do set NGROK_URL=%%U
        if not defined NGROK_URL set NGROK_URL=open http://localhost:4040 to see URL
    )
) else (
    echo [WARN] ngrok not installed - running local only
    echo   Get ngrok at https://ngrok.com/download
    set NGROK_URL=ngrok not installed
)

echo.
echo ============================================
echo   Local  : http://localhost:8000
echo   ngrok  : %NGROK_URL%
echo ============================================
echo.
echo Keep this window open while using the playground.
echo Ctrl+C to stop the server.
echo.

python main.py

echo.
echo [INFO] Server stopped.
echo If you saw an error, run install.bat first to install packages.
pause
