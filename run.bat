@echo off
setlocal

REM ====== Config ======
set APP_PATH=app.main:app
set HOST=0.0.0.0
set PORT=5000

echo Starting FastAPI server at http://%HOST%:%PORT% ...
uvicorn %APP_PATH% --host %HOST% --port %PORT% --reload

endlocal
pause