@echo off
cd /d "%~dp0"
npm run dev -- -H 0.0.0.0 -p 3001
pause
