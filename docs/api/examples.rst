API Examples
============

These examples show the most common HTTP workflows used by WifiX clients.

Check Host Information
----------------------

.. code-block:: powershell

   Invoke-RestMethod http://192.168.1.5:5000/device-info

List Shared Files
-----------------

.. code-block:: powershell

   Invoke-RestMethod http://192.168.1.5:5000/files

Create a Client Request
-----------------------

.. code-block:: powershell

   Invoke-RestMethod `
     -Uri http://192.168.1.5:5000/connect/request `
     -Method Post `
     -ContentType "application/json" `
     -Body '{"name":"Laptop Client"}'

Upload a File
-------------

.. code-block:: powershell

   curl.exe -F "file=@C:\Users\Public\Documents\sample.pdf" http://192.168.1.5:5000/upload

Download a File
---------------

.. code-block:: powershell

   curl.exe -O http://192.168.1.5:5000/download/sample.pdf
