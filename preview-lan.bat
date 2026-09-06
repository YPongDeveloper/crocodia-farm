@echo off
cd /d "%~dp0"
echo Building production export...
npm run build
echo Serving on http://192.168.2.114:3001  (Ctrl+C to stop)
cd out
python -m http.server 3001
