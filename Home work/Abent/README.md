                                         #HOME WORK1
          **VERSIONS OF HTTP**
**HTTP** is a protocol at the application layer that governs data communication on the web.
1. http/0.9 - it just supports only plain text in an HTML file.
            - data can not be submitted since it only uses a GET request.

2. http/1 - this version is widely used in web environments because of its nature of working with multiple contents.
          - Headers are introduced to store metadata of the request.
          - One request is possible per TCP connection (i.e, to send 10 requests, 10 TCP connections must be opened).
          - It supports many HTTP request methods like GET, POST, PUT, DELETE.

3. http/1.1 - possible to send many requests per TCP connections through pipelining, although it suffers with head-of-line blocking since the server responds to requests sequentially (i.e, the speed of one request may affect the other).

4. http/2 - at this time multiplexing is introduced and head-of-line blocking at TCP level is reduced.
          - more secure than http/1 since it uses TLS by default (HTTPS).
          - suffers from head-of-line blocking at the TCP level.
