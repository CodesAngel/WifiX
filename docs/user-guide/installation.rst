Installation Guide
==================

This guide covers the supported ways to install and run WifiX. Most users
should install a packaged release. Developers can run the desktop and Android
projects from source.

System Requirements
-------------------

Release Builds
~~~~~~~~~~~~~~

- **Windows desktop:** Windows 10 or Windows 11, x64.
- **Android mobile:** Android device or emulator with the matching APK.
- **Network:** Host and client devices must be on the same LAN or Wi-Fi.

Source Development
~~~~~~~~~~~~~~~~~~

- **Python:** 3.8 or higher
- **Node.js:** 18 or higher
- **Rust:** Stable toolchain for Tauri builds
- **Android Studio:** Required for Android builds
- **Visual Studio Build Tools:** Required for Windows Tauri builds
- **Disk Space:** At least 1 GB for dependencies and build output

Install from GitHub Releases
----------------------------

Windows Desktop
~~~~~~~~~~~~~~~

1. Open the latest release on GitHub.
2. Download ``WifiX-Desktop-Windows-Setup.exe``.
3. Run the installer.
4. Open WifiX from the Start menu.
5. Click **Become Host** to start sharing.

The desktop release starts its packaged backend automatically. Python is not
required on the target PC when the backend sidecar is bundled correctly.

Android Mobile
~~~~~~~~~~~~~~

1. Download the Android APK from the release assets.
2. Install it on the Android device.
3. Open WifiX Mobile.
4. Click **Become Host** or **Connect as Client**.

For ADB installation:

.. code-block:: powershell

   adb install -t -r -d WifiX-Mobile-Android-Debug.apk

.. important::

   Public Android release builds should be signed before distribution. Do not
   publish an unsigned release APK as the production Android download.

Run from Source
---------------

Clone the repository:

.. code-block:: bash

   git clone https://github.com/mehmoodulhaq570/WifiX.git
   cd WifiX

Install Python backend dependencies:

.. code-block:: powershell

   python -m pip install -r backend\requirements.txt

Install React dependencies:

.. code-block:: powershell

   cd frontend\react
   npm.cmd install

Run the production-style Python backend during development:

.. code-block:: powershell

   cd D:\Projects\WifiX
   python -m waitress --listen=0.0.0.0:5000 --threads=100 backend.production:app

Run the frontend in another terminal:

.. code-block:: powershell

   cd D:\Projects\WifiX\frontend\react
   npm.cmd run dev -- --host 0.0.0.0

Build Desktop
-------------

Build the Windows desktop installer:

.. code-block:: powershell

   cd D:\Projects\WifiX\frontend\react
   npm.cmd run tauri:build

Expected installer output:

.. code-block:: text

   frontend\react\src-tauri\target\release\bundle\nsis\WifiX_1.0.1_x64-setup.exe

Build Android
-------------

Build the Android debug APK:

.. code-block:: powershell

   cd D:\Projects\WifiX\frontend\react\mobile
   npm.cmd run tauri android build -- --debug --apk --target aarch64

Expected APK output:

.. code-block:: text

   frontend\react\mobile\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk

Docker Installation (Alternative)
----------------------------------

If you prefer using Docker:

.. code-block:: bash

   # Clone repository
   git clone https://github.com/mehmoodulhaq570/WifiX.git
   cd WifiX

   # Build and run with Docker Compose
   docker-compose up -d

   # Access at http://localhost:5173

Platform-Specific Notes
-----------------------

Windows
~~~~~~~

**Firewall Configuration:**

Windows Firewall may block network access. Allow Python and Node.js:

1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Add Python (``python.exe``) and Node.js (``node.exe``)
4. Check both "Private" and "Public" networks

**Running on Startup:**

Create a batch script ``start-wifix.bat``:

.. code-block:: batch

   @echo off
   cd /d "C:\path\to\WifiX\backend"
   start cmd /k "venv\Scripts\activate && python app.py"
   cd /d "C:\path\to\WifiX\frontend"
   start cmd /k "npm run dev"

macOS
~~~~~

**Bonjour Service:**

macOS includes Bonjour (mDNS) by default, so automatic discovery works out of the box.

**Running on Startup:**

Create a Launch Agent at ``~/Library/LaunchAgents/com.wifix.plist``:

.. code-block:: xml

   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
       <key>Label</key>
       <string>com.wifix</string>
       <key>ProgramArguments</key>
       <array>
           <string>/path/to/WifiX/start.sh</string>
       </array>
       <key>RunAtLoad</key>
       <true/>
   </dict>
   </plist>

Linux
~~~~~

**Avahi (mDNS):**

Install Avahi for automatic discovery:

.. code-block:: bash

   # Ubuntu/Debian
   sudo apt install avahi-daemon avahi-utils

   # Fedora
   sudo dnf install avahi avahi-tools

   # Start service
   sudo systemctl start avahi-daemon
   sudo systemctl enable avahi-daemon

**Systemd Service:**

Create ``/etc/systemd/system/wifix.service``:

.. code-block:: ini

   [Unit]
   Description=WifiX File Sharing Server
   After=network.target

   [Service]
   Type=simple
   User=your-username
   WorkingDirectory=/path/to/WifiX/backend
   ExecStart=/path/to/WifiX/backend/venv/bin/python app.py
   Restart=always

   [Install]
   WantedBy=multi-user.target

Enable and start:

.. code-block:: bash

   sudo systemctl daemon-reload
   sudo systemctl enable wifix
   sudo systemctl start wifix

Troubleshooting Installation
-----------------------------

Port Already in Use
~~~~~~~~~~~~~~~~~~~

If port 5000 or 5173 is already in use:

**Backend (change port):**

.. code-block:: bash

   # Set PORT environment variable
   export PORT=5001  # macOS/Linux
   set PORT=5001     # Windows CMD
   $env:PORT=5001    # Windows PowerShell

**Frontend (change port):**

Edit ``frontend/vite.config.js``:

.. code-block:: javascript

   export default {
     server: {
       port: 5174  // Change to desired port
     }
   }

Python Module Not Found
~~~~~~~~~~~~~~~~~~~~~~~~

If you get ``ModuleNotFoundError``:

.. code-block:: bash

   # Ensure you're in virtual environment
   source venv/bin/activate  # macOS/Linux
   venv\Scripts\activate     # Windows

   # Reinstall dependencies
   pip install --upgrade -r requirements.txt

npm Install Fails
~~~~~~~~~~~~~~~~~

If ``npm install`` fails:

.. code-block:: bash

   # Clear npm cache
   npm cache clean --force

   # Delete node_modules and package-lock.json
   rm -rf node_modules package-lock.json

   # Reinstall
   npm install

Permission Denied
~~~~~~~~~~~~~~~~~

On macOS/Linux, if you get permission errors:

.. code-block:: bash

   # Don't use sudo with pip, use virtual environment instead
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt

Network Not Detected
~~~~~~~~~~~~~~~~~~~~

If mDNS/Bonjour isn't working:

1. **Check firewall settings** - Allow UDP port 5353
2. **Verify mDNS service:**

   - **Windows:** Bonjour Service should be running
   - **macOS:** Built-in, should work automatically
   - **Linux:** Check ``sudo systemctl status avahi-daemon``

3. **Use manual IP:** If discovery fails, connect via IP address directly

Verification Checklist
----------------------

After installation, verify everything works:

.. code-block:: bash

   # 1. Backend is running
   curl http://localhost:5000/api/info
   # Should return JSON with server info

   # 2. Frontend is accessible
   # Open browser to http://localhost:5173
   # You should see WifiX interface

   # 3. WebSocket connection
   # In browser console, check for "Connected" message

   # 4. File upload/download works
   # Try uploading a test file

✅ **Installation Complete!**

Next Steps
----------

- Read :doc:`quickstart` to learn basic usage
- Configure :doc:`configuration` for your needs
- Learn about :doc:`features` and capabilities
- Set up :doc:`security` options

Need Help?
----------

- Check :doc:`../troubleshooting` for common issues
- Visit `GitHub Issues <https://github.com/mehmoodulhaq570/WifiX/issues>`_
- Read :doc:`../faq` for frequently asked questions
