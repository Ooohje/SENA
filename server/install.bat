@echo off
title SENA - Install Dependencies
cd /d "%~dp0"

echo.
echo ============================================
echo   SENA Backend - Install Dependencies
echo ============================================
echo.

REM PyTorch with CUDA 12.6 (RTX 5070 Ti / Blackwell)
echo [1/2] Installing PyTorch (CUDA 12.6)...
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] PyTorch install failed. Check your pip / Python setup.
    pause
    exit /b 1
)
echo [OK] PyTorch installed

REM Other requirements
echo.
echo [2/2] Installing other requirements...
pip install fastapi "uvicorn[standard]" python-multipart httpx transformers accelerate faster-whisper librosa soundfile numpy noisereduce python-docx kokoro
if %ERRORLEVEL% NEQ 0 (
    echo [WARN] Some packages may have failed. Check output above.
) else (
    echo [OK] All packages installed
)

echo.
echo ============================================
echo   Done! Now run start.bat to launch server.
echo ============================================
pause
