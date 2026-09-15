WebSocket Events
================

The desktop Python backend supports Socket.IO for real-time updates. The Android
Rust backend can serve the same user workflow through HTTP endpoints, so clients
should not assume Socket.IO is always available.

Common Events
-------------

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Event
     - Purpose
   * - ``become_host``
     - Registers the current device as the active host.
   * - ``host_status``
     - Reports whether a host is available.
   * - ``request_connection``
     - Sends a client connection request to the host.
   * - ``connection_request``
     - Notifies the host that a client wants access.
   * - ``approve_request``
     - Approves a pending client request.
   * - ``deny_request``
     - Denies a pending client request.
   * - ``file_uploaded``
     - Announces that a new file is available.
   * - ``file_deleted``
     - Announces that a file was removed.

Client Guidance
---------------

- Prefer HTTP fallback behavior when running inside Android Tauri.
- Show clear loading states while waiting for host approval.
- Treat disconnects and timeouts as recoverable user-facing states.
