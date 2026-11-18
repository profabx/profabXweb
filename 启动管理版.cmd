@echo off
setlocal
cd /d "%~dp0"
"%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" "scripts\start-admin.cjs"
if errorlevel 1 pause
