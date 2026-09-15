<div align="center">

# WifiX

**Easy LAN File Sharing Made Simple**

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![Flask](https://img.shields.io/badge/Flask-2.3.2-000000.svg)](https://flask.palletsprojects.com/)
[![Rust](https://img.shields.io/badge/Rust-Mobile%20Backend-orange.svg)](https://www.rust-lang.org/)
[![Tauri](https://img.shields.io/badge/Tauri-Desktop%20%26%20Android-24C8DB.svg)](https://tauri.app/)
[![Docker](https://img.shields.io/badge/Docker-GHCR-2496ED.svg)](https://github.com/CodesAngel/WifiX/pkgs/container/wifix)
[![Release](https://img.shields.io/badge/Release-WifiX--1.0.1-blueviolet.svg)](https://github.com/CodesAngel/WifiX/releases/tag/WifiX-1.0.1)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

WifiX is a local network file sharing app for moving files between nearby
devices without cloud storage, accounts, or manual USB transfers. A device can
become the host, share a LAN link or QR code, and approve clients before they
download or upload files.

The project currently supports a Windows desktop app, an Android mobile app,
and a Docker/server-style deployment.

[Download Release](https://github.com/CodesAngel/WifiX/releases/tag/WifiX-1.0.1) | [Documentation](https://codesangel.github.io/WifiX/) | [Changelog](CHANGELOG.md) | [Security](SECURITY.md) | [Contributing](CONTRIBUTING.md)

</div>

## Download

For most people, the easiest way to use WifiX is to download the ready-made
apps from the GitHub release:

[Download WifiX 1.0.1 for Windows and Android](https://github.com/CodesAngel/WifiX/releases/tag/WifiX-1.0.1)

Release assets include:

| File | Use it for |
| --- | --- |
| `WifiX-Desktop-Windows-Setup.exe` | Install WifiX on a Windows laptop or PC |
| `WifiX-Mobile-Android-Debug.apk` | Install WifiX on an Android phone for testing |

After installing, open WifiX, choose **Become Host**, then share the displayed
LAN link or QR code with another device on the same Wi-Fi network.

## Highlights

- Host/client workflow with explicit host approval.
- Drag-and-drop upload and direct download from connected devices.
- Shareable LAN URL and QR code access.
- Optional global PIN and per-file PIN protection.
- PIN-protected uploads wait for the explicit Upload action.
- Responsive React interface for desktop, mobile, tablet, and browser clients.
- Windows desktop app with an auto-starting packaged Python backend sidecar.
- Android mobile app with an embedded Rust backend for mobile hosting.
- Docker image publishing through GitHub Actions and GitHub Container Registry.

## Supported Platforms

| Platform | Status | Backend |
| --- | --- | --- |
| Windows desktop | Supported through Tauri installer | Python Flask sidecar |
| Android mobile | Supported through Tauri Android APK | Embedded Rust HTTP backend |
| Browser on LAN | Supported as a client or host page | Connects to the active host backend |
| Docker | Supported for server-style deployment | Python Flask/Gunicorn |

WifiX is designed for trusted local networks. Host and client devices should be
on the same Wi-Fi or LAN unless you add a separate relay/cloud layer.

## How WifiX Works

1. Open WifiX on the device that will share files.
2. Click **Become Host**.
3. Share the LAN URL or QR code shown in the app.
4. Open that link on another device and click **Connect as Client**.
5. Approve the request on the host device.
6. Upload or download files from the approved client.

No account or cloud storage is required. Devices only need to be on the same
local network.

## Developer Setup

### Requirements

- Python 3.8 or newer
- Node.js 18 or newer
- npm
- Rust stable toolchain for Tauri builds
- Visual Studio Build Tools with Desktop development with C++ for Windows builds
- Android Studio, Android SDK, and NDK for Android builds

### Install Dependencies

```powershell
git clone https://github.com/CodesAngel/WifiX.git
cd WifiX

python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r backend\requirements.txt

cd frontend\react
npm.cmd install
```

### Run the Web App During Development

Terminal 1, from the repository root:

```powershell
python -m waitress --listen=0.0.0.0:5000 --threads=100 backend.production:app
```

Terminal 2:

```powershell
cd D:\Projects\WifiX\frontend\react
npm.cmd run dev -- --host 0.0.0.0
```

Open:

```text
http://localhost:5173
```

Use the displayed LAN link or QR code from another device on the same network.
This source mode uses the Python backend and the shared React frontend.

## Build Windows Desktop App

The desktop app is built from `frontend/react/src-tauri`. It uses the shared
React frontend and starts the packaged Python backend automatically.

Build the backend sidecar first:

```powershell
cd D:\Projects\WifiX

npm.cmd --prefix frontend\react run build

$frontendDist = (Resolve-Path "frontend\react\dist").Path
python -m PyInstaller `
  --noconfirm `
  --clean `
  --onedir `
  --noconsole `
  --name wifix-backend `
  --distpath dist `
  --workpath build\pyinstaller `
  --specpath build\pyinstaller `
  --paths backend `
  --hidden-import engineio.async_drivers.threading `
  --exclude-module PyQt5 `
  --exclude-module PyQt6 `
  --exclude-module tkinter `
  --add-data "$frontendDist;frontend\react\dist" `
  backend\run_backend.py
```

Then build the desktop installer:

```powershell
cd D:\Projects\WifiX\frontend\react
npm.cmd run tauri:build
```

Expected installer output:

```text
frontend\react\src-tauri\target\release\bundle\nsis\WifiX_1.0.1_x64-setup.exe
```

## Build Android App

The Android app is built from `frontend/react/mobile`. It uses the shared React
UI and starts the Rust backend from the mobile Tauri app.

```powershell
cd D:\Projects\WifiX\frontend\react\mobile
npm.cmd run tauri android build -- --debug --apk --target aarch64
```

Expected debug APK:

```text
frontend\react\mobile\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk
```

Install on a USB-connected Android device:

```powershell
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" devices
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" install -r "D:\Projects\WifiX\frontend\react\mobile\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk"
```

If `adb devices` shows `unauthorized`, unlock the phone and accept the USB
debugging prompt.

## Docker

Run WifiX with Docker Compose:

```powershell
docker-compose up -d
```

Or run the published image from GitHub Container Registry:

```powershell
docker run --rm -p 5000:5000 ghcr.io/codesangel/wifix:latest
```

The Docker image is published by `.github/workflows/docker-publish.yml` when a
tag matching `WifiX-*` is pushed.

```powershell
git tag WifiX-1.0.6
git push origin WifiX-1.0.6
```

## Project Structure

```text
WifiX/
├── backend/                         Python backend for desktop and Docker
│   ├── app.py                       Flask app and development entry point
│   ├── production.py                Production import path
│   ├── run_backend.py               Desktop sidecar launcher
│   └── requirements.txt
├── crates/
│   ├── wifix-core/                  Shared Rust backend domain logic
│   └── wifix-server/                Rust HTTP server used by mobile
├── frontend/
│   └── react/
│       ├── src/                     Shared React UI
│       ├── src-tauri/               Windows desktop Tauri wrapper
│       └── mobile/
│           ├── src/                 Mobile frontend entry
│           └── src-tauri/           Android/mobile Tauri wrapper
├── docs/                            Sphinx documentation
├── Dockerfile
├── docker-compose.yml
└── CHANGELOG.md
```

## Architecture

WifiX keeps the user workflow consistent while allowing each platform to use
the backend that fits it best.

The Windows desktop app packages the Python Flask backend as a hidden sidecar.
When the desktop app starts, Tauri launches the backend, the React UI connects
to `127.0.0.1:5000`, and nearby clients use the host machine LAN IP.

The Android app embeds a Rust backend inside the Tauri mobile app. It serves
the same core workflow through HTTP endpoints and can host files directly from
the phone. Browser clients can open the phone's LAN link and use the WifiX UI.

The Docker build uses the Python backend and the production React build for
server-style deployments.

## Common Commands

| Task | Command |
| --- | --- |
| Install frontend dependencies | `cd frontend\react && npm.cmd install` |
| Run React dev server | `npm.cmd run dev -- --host 0.0.0.0` |
| Build React frontend | `npm.cmd run build` |
| Build desktop installer | `npm.cmd run tauri:build` |
| Run mobile dev app | `cd frontend\react\mobile && npm.cmd run tauri android dev` |
| Build Android debug APK | `npm.cmd run tauri android build -- --debug --apk --target aarch64` |
| Build docs | `cd docs && python -m sphinx -b html . _build\html` |
| Run Docker Compose | `docker-compose up -d` |

## Configuration

Backend settings can be provided through environment variables or a backend
`.env` file.

```env
ACCESS_PIN=1234
SECRET_KEY=change-this-secret
CORS_ORIGINS=http://localhost:5173
FILE_TTL_SECONDS=0
CLEANUP_INTERVAL_SECONDS=60
```

Frontend development can use:

```env
VITE_API_URL=http://localhost:5000
```

For packaged desktop and mobile builds, the app uses platform-aware backend
detection so LAN/browser links do not depend on the Vite development server.

## Release Assets

Recommended GitHub Release assets:

| Asset | Platform |
| --- | --- |
| `WifiX-Desktop-Windows-Setup.exe` | Windows x64 |
| `WifiX-Mobile-Android-Debug.apk` | Android testing |
| Signed APK or AAB | Android production |
| `ghcr.io/codesangel/wifix:<tag>` | Docker |

See [docs/user-guide/releases.rst](docs/user-guide/releases.rst) for the full
release checklist.

## Security Notes

- Use WifiX on trusted local networks.
- Keep host approval enabled when accepting client connections.
- Use PIN protection when sharing sensitive files.
- Do not expose the LAN server directly to the public internet without HTTPS,
  stronger authentication, and network hardening.
- Report vulnerabilities through [SECURITY.md](SECURITY.md).

## Documentation

The full documentation is in `docs/` and can be built locally:

```powershell
cd docs
python -m sphinx -b html . _build\html
```

Useful pages:

- [Installation Guide](docs/user-guide/installation.rst)
- [Quick Start](docs/user-guide/quickstart.rst)
- [Release Downloads](docs/user-guide/releases.rst)
- [Architecture](docs/development/architecture.rst)
- [Troubleshooting](docs/troubleshooting.rst)

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md)
before opening a pull request.

For code changes:

1. Create a feature branch.
2. Keep desktop and mobile Tauri changes in their own folders.
3. Run the relevant build or test command.
4. Update docs and `CHANGELOG.md` when behavior changes.

## License

WifiX is released under the MIT License. See [LICENSE](LICENSE) for details.
