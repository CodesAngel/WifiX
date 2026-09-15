Testing
=======

WifiX testing is currently workflow-focused. Run the checks that match the area
you changed.

Frontend Build
--------------

.. code-block:: powershell

   cd frontend\react
   npm.cmd run build

Desktop Backend
---------------

.. code-block:: powershell

   python -m compileall backend

Production Backend Smoke Test
-----------------------------

.. code-block:: powershell

   python -m waitress --listen=0.0.0.0:5000 --threads=100 backend.production:app

Android Build
-------------

.. code-block:: powershell

   cd frontend\react\mobile
   npm.cmd run tauri android build -- --debug --apk --target aarch64

Manual Workflow Checks
----------------------

- Host starts successfully.
- Client request reaches the host.
- Host can approve or deny the request.
- Files upload only after the Upload action.
- PIN-protected downloads require the correct PIN.
- Browser share links open ``/`` from the host IP.
