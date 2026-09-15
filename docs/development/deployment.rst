Deployment
==========

WifiX can be distributed as a Windows desktop installer and an Android APK.
Release assets should be attached to GitHub Releases rather than committed to
the repository.

Windows Desktop
---------------

Build the desktop installer:

.. code-block:: powershell

   cd frontend\react
   npm.cmd run tauri:build

Expected output:

.. code-block:: text

   frontend\react\src-tauri\target\release\bundle\nsis\WifiX_1.0.1_x64-setup.exe

Android
-------

Build the Android debug APK:

.. code-block:: powershell

   cd frontend\react\mobile
   npm.cmd run tauri android build -- --debug --apk --target aarch64

Expected output:

.. code-block:: text

   frontend\react\mobile\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk

Production Android releases should be signed before public distribution.

GitHub Release
--------------

Use GitHub Releases for downloadable installers:

.. code-block:: powershell

   gh release create WifiX-1.0.1 `
     "frontend\react\src-tauri\target\release\bundle\nsis\WifiX_1.0.1_x64-setup.exe#WifiX-Desktop-Windows-Setup.exe" `
     "frontend\react\mobile\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk#WifiX-Mobile-Android-Debug.apk" `
     --title "WifiX 1.0.1"
