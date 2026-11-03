@echo off
setlocal
set "PROFABX_LIVE_DESCRIPTOR="
if not exist "%~dp0runtime\bambu-studio.exe" (
  echo ProFabX Live runtime has not been built yet.
  pause
  exit /b 1
)
start "" /D "%~dp0runtime" "%~dp0runtime\bambu-studio.exe"
endlocal
