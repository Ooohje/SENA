@echo off
title SENA Backend Server
cd /d "%~dp0"

echo.
echo ============================================
echo   SENA Backend Server  ^|  RTX 5070 Ti
echo ============================================
echo.

REM 式式 1. Python venv (optional) 式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式
REM If you use a venv, activate it here. Example:
REM call "%~dp0.venv\Scripts\activate.bat"

REM 式式 2. ffmpeg check 式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式
where ffmpeg >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] ffmpeg not found in PATH.
    echo.
    echo  Install: winget install ffmpeg
    echo  Or download from: https://ffmpeg.org/download.html
    echo.
    pause
    exit /b 1
)
echo [OK] ffmpeg found

REM 式式 3. Ollama check / start 式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式
curl -s --max-time 2 http://localhost:11434 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Ollama not running - starting ollama serve...
    start "" ollama serve
    timeout /t 4 /nobreak >nul
) else (
    echo [OK] Ollama already running
)

REM 式式 4. Check qwen3:8b model 式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式
ollama list 2>nul | findstr "qwen3" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [INFO] qwen3:8b not found - pulling now (may take a while)...
    ollama pull qwen3:8b
)
echo [OK] qwen3:8b available

REM 式式 5. ngrok (background) 式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式
where ngrok >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [INFO] Starting ngrok tunnel on port 8000...
    start "" /B ngrok http 8000 --log=stdout > "%~dp0ngrok.log" 2>&1
    timeout /t 3 /nobreak >nul
    for /f "tokens=*" %%U in (
        'curl -s http://localhost:4040/api/tunnels 2^>nul ^| python -c "import sys,json; d=json.load(sys.stdin); print(d[chr(34)+'tunnels'+chr(34)][0][chr(34)+'public_url'+chr(34)])" 2^>nul'
    ) do set NGROK_URL=%%U
    if not defined NGROK_URL set NGROK_URL=(could not read ngrok URL - check ngrok.log)
) else (
    echo [WARN] ngrok not found. Install from https://ngrok.com/download
    set NGROK_URL=(ngrok not running)
)

echo.
echo ============================================
echo   Local  : http://localhost:8000
echo   Public : %NGROK_URL%
echo ============================================
echo.
echo Paste the Public URL into the Playground backend config field.
echo Page: https://ooohje.github.io/SENA-page/playground.html
echo.

REM 式式 6. Start FastAPI 式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式
python main.py

pause