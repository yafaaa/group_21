
  ### Versions of HTTP
### 1. **HTTP/1.0** 

**Problem:**

Every time the browser needed a file, a **new connection** is opened and **closed**.
headers(meta data of requests) and supprots more https method than GET, like put, post and delete

### 2. **HTTP/1.1** 

One connection can be used for many files.

Also added:

- **caching** (save files locally, efficient request only)
- **Pipelining** (send multiple requests at once)
  
problem:

**Head-of-Line Blocking**: If the 1st file is slow, others wait behind it.(since it uses TCP)


### 3. **HTTP/2**

Do **many requests/responses at once** on the same connection.

- **Binary format**: Easier and faster for computers to read (reduce the external conversion needed)
- **HPACK Compression**: Shrinks headers (data sent with requests) to save data
- **Server Push**: Server sends things *before* you ask like sending the CSS as soon as you request the HTML

problem

uses **TCP** so if a packet is lost, it can slow down everything.(protocol used to share file)

### 4. **HTTP/3** 

Uses **QUIC** (built on **UDP**(NO **TCP**) ) a newer, faster delivery system.(protocol used for time sensitve like streaming)

- **No full connection block** if one file has a problem (each stream is independent)
- **Faster setup**: Combines TCP (handshake for connection) and TLS (handshake to secure), making only **one step** .
