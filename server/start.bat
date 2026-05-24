@echo off
chcp 65001 >nul
title SENA Backend Server

echo.
echo  ██████████████████████████████████████████████
echo    SENA Backend Server  ^|  RTX 5070 Ti
echo  ██████████████████████████████████████████████
echo.

cd /d "%~dp0"

REM ── 1. ffmpeg check ───────────────────────────────────────────────────
where ffmpeg >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] ffmpeg not found in PATH.
    echo.
    echo  Install ffmpeg and add it to your system PATH:
    echo    https://ffmpeg.org/download.html  (Windows build)
    echo    or:  winget install ffmpeg
    echo.
    pause
    exit /b 1
)
echo  [OK] ffmpeg found

REM ── 2. Ollama check / start ───────────────────────────────────────────
curl -s --max-time 2 http://localhost:11434 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo  [INFO] Ollama not running — starting ollama serve...
    start "" ollama serve
    timeout /t 4 /nobreak >nul
) else (
    echo  [OK] Ollama already running
)

REM ── 3. Check qwen3:8b model ───────────────────────────────────────────
ollama list 2>nul | findstr "qwen3" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  [INFO] qwen3:8b not found locally. Pulling now (this may take a while)...
    ollama pull qwen3:8b
)
echo  [OK] qwen3:8b available

REM ── 4. ngrok (background) ─────────────────────────────────────────────
where ngrok >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo  [INFO] Starting ngrok tunnel on port 8000...
    start "" /B ngrok http 8000 --log=stdout > "%~dp0ngrok.log" 2>&1
    timeout /t 3 /nobreak >nul
    for /f "tokens=*" %%U in (
        'curl -s http://localhost:4040/api/tunnels 2^>nul ^| python -c "import sys,json; d=json.load(sys.stdin); print(d[\"tunnels\"][0][\"public_url\"])" 2^>nul'
    ) do set NGROK_URL=%%U
) else (
    echo  [WARN] ngrok not found. Install from https://ngrok.com/download
    set NGROK_URL=(ngrok not running)
)

echo.
echo  ┌─────────────────────────────────────────────┐
echo  │  Local  : http://localhost:8000             │
echo  │  Public : %NGROK_URL%
echo  └─────────────────────────────────────────────┘
echo.
echo  → Paste the Public URL into the Playground page backend config.
echo  → Visit: https://yourusername.github.io/your-repo/playground.html?backend=^<url^>
echo.

REM ── 5. Start FastAPI ──────────────────────────────────────────────────
python main.py

pause
