Python Integration Notes
========================

WifiX does not currently publish a separate Python SDK package. Python code in
the repository is used by the desktop backend and desktop sidecar build.

Useful Entry Points
-------------------

.. list-table::
   :header-rows: 1
   :widths: 34 66

   * - Path
     - Purpose
   * - ``backend/app.py``
     - Flask application and development entry point.
   * - ``backend/production.py``
     - Production import path for Waitress, Gunicorn, and packaged backends.
   * - ``backend/run_backend.py``
     - Sidecar-friendly backend launcher.

Running the Backend
-------------------

.. code-block:: powershell

   python -m waitress --listen=0.0.0.0:5000 --threads=100 backend.production:app

Packaging Notes
---------------

The desktop release uses a PyInstaller-built backend sidecar. When packaged
correctly, users should not need to install Python on the target Windows PC.
