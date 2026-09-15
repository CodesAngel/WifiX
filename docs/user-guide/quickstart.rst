Quick Start
===========

This guide shows the fastest way to use WifiX after installing a release build.
For source-based development, see :doc:`installation`.

Share Files from Windows Desktop
--------------------------------

1. Install ``WifiX-Desktop-Windows-Setup.exe`` from GitHub Releases.
2. Open WifiX from the Start menu.
3. Click **Become Host**.
4. Allow the Windows firewall prompt if it appears.
5. Copy the LAN link shown in the app, or show the QR code.
6. Upload one or more files.

The packaged desktop app starts its backend automatically. You do not need to
run a separate Python command when using the installer.

Connect from Another Device
---------------------------

1. Make sure the client device is on the same Wi-Fi or LAN as the host.
2. Open the shared link in a browser, for example:

   .. code-block:: text

      http://192.168.1.5:5000/

3. Click **Connect as Client**.
4. Approve the request on the host device.
5. Download the shared files.

Use Android as Host
-------------------

1. Install the WifiX Android APK.
2. Open WifiX Mobile.
3. Click **Become Host**.
4. Share the LAN link shown in the app.
5. Open that link from a laptop or another phone on the same network.

The Android app includes a Rust backend inside the mobile build. It does not use
the desktop Python backend.

PIN-Protected Uploads
---------------------

WifiX supports optional per-file PIN protection.

1. Choose a file.
2. Enable PIN protection.
3. Set the PIN.
4. Click **Upload** to send the file.

Setting a PIN prepares the upload only. The file is uploaded after the explicit
Upload action.

Development Quick Start
-----------------------

Use this flow only when running from source.

Backend:

.. code-block:: powershell

   cd D:\Projects\WifiX
   python -m waitress --listen=0.0.0.0:5000 --threads=100 backend.production:app

Frontend:

.. code-block:: powershell

   cd D:\Projects\WifiX\frontend\react
   npm.cmd run dev -- --host 0.0.0.0

Desktop Tauri development:

.. code-block:: powershell

   cd D:\Projects\WifiX\frontend\react
   npm.cmd run tauri dev

Android Tauri development:

.. code-block:: powershell

   cd D:\Projects\WifiX\frontend\react\mobile
   npm.cmd run tauri android dev

Troubleshooting
---------------

- If the shared link does not open, confirm both devices are on the same network.
- If a client request times out, make sure the host clicked **Become Host** first.
- If Windows blocks access, allow WifiX through the firewall for private networks.
- If Android install fails, confirm USB debugging is enabled and ``adb devices`` shows ``device``.
