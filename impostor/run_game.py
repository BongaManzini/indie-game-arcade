#!/usr/bin/env python3
"""
THE BLIGHTSTEAD - Game Server & Launcher
Starts a local HTTP server and attempts to open the default web browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Clean logging
        pass

def main():
    port = PORT
    server = None
    for p in range(PORT, PORT + 20):
        try:
            server = socketserver.TCPServer(("", p), Handler)
            port = p
            break
        except OSError:
            continue

    if not server:
        print("[!] Could not bind to an open port.")
        sys.exit(1)

    url = f"http://localhost:{port}/index.html"
    print("=" * 65)
    print("  THE BLIGHTSTEAD: Gothic Agronomy & Extraction Horror Prototype")
    print("=" * 65)
    print(f"\n[+] Local Server Live at: {url}")
    print("[+] Press Ctrl+C in this terminal to shut down the server.\n")

    try:
        webbrowser.open(url)
    except Exception:
        pass

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[*] Server stopped.")
        server.server_close()

if __name__ == "__main__":
    main()
