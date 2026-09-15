REST API
========

WifiX exposes HTTP endpoints for browser clients, desktop clients, and the
Android mobile app. The Python desktop backend and Rust mobile backend are kept
compatible at the workflow level so clients can open the host link and perform
the same basic actions.

Core Endpoints
--------------

.. list-table::
   :header-rows: 1
   :widths: 28 20 52

   * - Endpoint
     - Method
     - Purpose
   * - ``/``
     - ``GET``
     - Serves the WifiX web interface from the active host.
   * - ``/device-info``
     - ``GET``
     - Returns host IP, LAN URL, and related connection metadata.
   * - ``/files``
     - ``GET``
     - Lists files currently shared by the host.
   * - ``/upload``
     - ``POST``
     - Uploads a file to the host.
   * - ``/download/<filename>``
     - ``GET``
     - Downloads a shared file.
   * - ``/delete/<filename>``
     - ``DELETE``
     - Removes a shared file from the host.
   * - ``/connect/request``
     - ``POST``
     - Creates a client connection request.
   * - ``/connect/pending``
     - ``GET``
     - Lists pending client requests for the host.
   * - ``/connect/respond``
     - ``POST``
     - Approves or denies a client request.
   * - ``/connect/status/<id>``
     - ``GET``
     - Checks whether a client request was approved or denied.

Compatibility Notes
-------------------

- Desktop development may use Socket.IO for real-time events.
- Browser clients served by the Rust mobile backend use HTTP polling/fallbacks.
- New endpoints should be kept compatible across desktop and mobile hosts.
- LAN URLs should use the host device IP, not ``localhost``.

Security Notes
--------------

- Run WifiX only on trusted local networks.
- Use PIN protection for sensitive files.
- Stop hosting when the sharing session is complete.
