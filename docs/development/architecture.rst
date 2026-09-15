Architecture
============

WifiX is split into shared frontend code, a desktop backend, and a mobile
backend.

Repository Layout
-----------------

.. code-block:: text

   backend/                         Python backend for desktop and web hosting
   crates/wifix-core/               Shared Rust backend domain logic
   crates/wifix-server/             Rust HTTP server used by mobile
   frontend/react/src/              Shared React interface
   frontend/react/src-tauri/        Windows desktop Tauri app
   frontend/react/mobile/src-tauri/ Android/mobile Tauri app

Desktop Runtime
---------------

The desktop app is a Tauri shell that starts the packaged Python backend
sidecar. The React frontend talks to the backend at ``127.0.0.1:5000`` inside
the desktop app, while browser clients use the host LAN IP.

Mobile Runtime
--------------

The Android app uses the shared React frontend and starts a Rust backend inside
the mobile Tauri runtime. This lets the phone act as a host without requiring
Python.

Compatibility Principle
-----------------------

Desktop and mobile backends may be implemented in different languages, but they
should expose compatible user workflows and HTTP behavior so browser clients can
connect to either host type.
