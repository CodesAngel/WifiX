WifiX Documentation
===================

.. image:: https://img.shields.io/badge/version-1.0.1-blue.svg
   :alt: Version 1.0.1

.. image:: https://img.shields.io/badge/platform-Windows%20%7C%20Android-informational.svg
   :alt: Windows and Android

.. image:: https://img.shields.io/badge/license-MIT-green.svg
   :alt: MIT License

WifiX is a local-network file sharing application for moving files between
nearby devices without cloud storage, accounts, or manual USB transfers. A
device becomes the host, shares a LAN link or QR code, and nearby clients open
that link to request access and download shared files.

Current Product Shape
---------------------

WifiX is currently maintained in two app targets:

.. list-table::
   :header-rows: 1
   :widths: 24 38 38

   * - Target
     - Backend
     - Purpose
   * - Windows desktop
     - Python backend packaged as a Tauri sidecar
     - Full desktop app with automatic backend startup
   * - Android mobile
     - Rust backend embedded in the Tauri mobile app
     - Mobile host/client testing and LAN sharing from Android
   * - Browser client
     - Connects to the active host over HTTP on the LAN
     - Opens the WifiX interface from the shared link

Key Capabilities
----------------

- Host files from the desktop app or Android app on the same local network.
- Share a direct LAN URL and QR code with nearby devices.
- Require host approval before clients connect.
- Upload files with progress feedback.
- Add optional per-file PIN protection before upload.
- View shared files from a browser, desktop app, or mobile app.
- Run the Windows desktop backend automatically when the packaged app starts.
- Use a native Android build with an embedded Rust backend for mobile hosting.

Quick Start
-----------

For normal users, install the latest release from GitHub:

1. Download the Windows installer, ``WifiX-Desktop-Windows-Setup.exe``.
2. Install and open WifiX on the host computer.
3. Click **Become Host**.
4. Share the displayed LAN link or QR code.
5. On another device, open the link and click **Connect as Client**.
6. Approve the request on the host, then share or download files.

For Android testing, install the debug APK from the release assets or with ADB:

.. code-block:: powershell

   adb install -t -r -d WifiX-Mobile-Android-Debug.apk

.. note::

   WifiX is designed for trusted local networks. It does not provide a public
   internet relay by default. Devices must be on the same LAN unless a separate
   relay/cloud layer is added later.

Documentation Contents
----------------------

.. toctree::
   :maxdepth: 2
   :caption: Getting Started

   user-guide/installation
   user-guide/quickstart
   user-guide/releases
   user-guide/configuration

.. toctree::
   :maxdepth: 2
   :caption: User Guide

   user-guide/host-workflow
   user-guide/client-workflow
   user-guide/features
   user-guide/security

.. toctree::
   :maxdepth: 2
   :caption: API Reference

   api/rest-api
   api/websocket-events
   api/python-sdk
   api/examples

.. toctree::
   :maxdepth: 2
   :caption: Development

   development/architecture
   development/contributing
   development/testing
   development/deployment

.. toctree::
   :maxdepth: 1
   :caption: Help and Reference

   troubleshooting
   faq
   changelog
   license

Repository and Support
----------------------

- Repository: `github.com/mehmoodulhaq570/WifiX <https://github.com/mehmoodulhaq570/WifiX>`_
- Issues: `GitHub Issues <https://github.com/mehmoodulhaq570/WifiX/issues>`_
- Discussions: `GitHub Discussions <https://github.com/mehmoodulhaq570/WifiX/discussions>`_
- License: :doc:`license`

Indices and Tables
------------------

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
