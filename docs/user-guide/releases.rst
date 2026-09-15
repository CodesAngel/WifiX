Release Downloads
=================

WifiX releases are published from GitHub Releases. Each release should include
separate assets for Windows desktop and Android mobile so users can download the
correct package for their device.

Recommended Release Assets
--------------------------

.. list-table::
   :header-rows: 1
   :widths: 32 30 38

   * - Asset
     - Platform
     - Notes
   * - ``WifiX-Desktop-Windows-Setup.exe``
     - Windows x64
     - NSIS installer for the Tauri desktop app.
   * - ``WifiX-Mobile-Android-Debug.apk``
     - Android
     - Debug APK for testing on Android devices.
   * - Signed Android APK or AAB
     - Android production
     - Recommended before public distribution outside testing.

Windows Desktop Release
-----------------------

The Windows desktop app is built with Tauri and includes the packaged Python
backend sidecar. Users should not need to start Python manually after installing
the desktop release.

Expected local output path:

.. code-block:: powershell

   frontend\react\src-tauri\target\release\bundle\nsis\WifiX_1.0.1_x64-setup.exe

Android Release
---------------

The Android app is built from the separate mobile Tauri project under
``frontend/react/mobile``. It uses the shared React UI and an embedded Rust
backend.

Current debug APK output path:

.. code-block:: powershell

   frontend\react\mobile\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk

Install the debug APK with ADB:

.. code-block:: powershell

   adb install -t -r -d app-universal-debug.apk

.. important::

   Do not upload ``app-universal-release-unsigned.apk`` as a public production
   Android release. Android release builds must be signed before distribution.

Creating a GitHub Release
-------------------------

After authenticating with GitHub CLI, create a release and attach both app
packages:

.. code-block:: powershell

   gh auth login -h github.com

   gh release create WifiX-1.0.1 `
     "frontend\react\src-tauri\target\release\bundle\nsis\WifiX_1.0.1_x64-setup.exe#WifiX-Desktop-Windows-Setup.exe" `
     "frontend\react\mobile\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk#WifiX-Mobile-Android-Debug.apk" `
     --title "WifiX 1.0.1" `
     --notes "WifiX desktop and Android mobile release with mobile Rust backend, refreshed mobile layout, splash screen, and WifiX app icons."

Release Checklist
-----------------

- Build the desktop installer.
- Build the Android APK.
- Install and open both packages.
- Confirm the app icon and splash screen use WifiX branding.
- Confirm **Become Host** works on the host device.
- Confirm **Connect as Client** sends a request to the host.
- Confirm browser clients can open ``http://HOST_IP:5000/``.
- Confirm PIN-protected uploads wait for the explicit Upload action.
- Create a GitHub tag and release.
- Upload the Windows installer and Android APK as release assets.
