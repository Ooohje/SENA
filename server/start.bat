@echo off
title SENA Backend Server
cd /d "%~dp0"

echo.
echo ============================================
echo   SENA Backend Server  ^|  RTX 5070 Ti
echo ============================================
echo.

REM 1. ffmpeg check
where ffmpeg >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] ffmpeg not found. Install: winget install ffmpeg
    pause
    exit /b 1
)
echo [OK] ffmpeg found

REM 2. Ollama check / start
curl -s --max-time 2 http://localhost:11434 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Starting Ollama...
    start "" ollama serve
    timeout /t 4 /nobreak >nul
) else (
    echo [OK] Ollama running
)

REM 3. Check qwen3:8b
ollama list 2>nul | findstr "qwen3" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Pulling qwen3:8b (first time only)...
    ollama pull qwen3:8b
)
echo [OK] qwen3:8b ready

REM 4. ngrok tunnel
where ngrok >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [INFO] Starting ngrok on port 8000...
    start /B "" ngrok http 8000
    timeout /t 3 /nobreak >nul
    curl -s http://localhost:4040/api/tunnels > "%~dp0ngrok_resp.json" 2>nul
    for /f "delims=" %%U in ('python -c "import json,sys; d=json.load(open(r'%~dp0ngrok_resp.json')); print(d['tunnels'][0]['public_url'])" 2^>nul') do set NGROK_URL=%%U
    if not defined NGROK_URL set NGROK_URL=check http://localhost:4040
) else (
    echo [WARN] ngrok not found. Get it at https://ngrok.com/download
    set NGROK_URL=ngrok not installed
)

echo.
echo ============================================
echo   Local  : http://localhost:8000
echo   Public : %NGROK_URL%
echo ============================================
echo.
echo Copy the Public URL and open:
echo https://ooohje.github.io/SENA-page/playground.html
echo Then paste it in the backend config field.
echo.

REM 5. Start FastAPI
python main.py

pause