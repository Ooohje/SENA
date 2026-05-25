@echo off
title SENA Backend Server
cd /d "%~dp0"

echo.
echo ============================================
echo   SENA Backend Server
echo ============================================
echo.

python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python not found in PATH.
    pause
    exit /b 1
)
echo [OK] Python found

curl -s --max-time 2 http://localhost:11434 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    where ollama >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Ollama not installed. https://ollama.com/download
        pause
        exit /b 1
    )
    echo [INFO] Starting Ollama...
    start "" ollama serve
    timeout /t 4 /nobreak >nul
) else (
    echo [OK] Ollama running
)

ollama list 2>nul | findstr "qwen3" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Pulling qwen3:8b...
    ollama pull qwen3:8b
)
echo [OK] qwen3:8b ready

echo.
echo ============================================
echo   Server : http://0.0.0.0:8000
echo   API docs : http://localhost:8000/docs
echo ============================================
echo.
echo Keep this window open while the server is running.
echo Ctrl+C to stop.
echo.

python main.py

echo.
echo [INFO] Server stopped.
echo If you saw an error, run install.bat first.
pause
