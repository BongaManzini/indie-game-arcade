#!/usr/bin/env python3
"""
RESONANCE PING - Dedicated Local Game Server
Auto-discovers an open port (starting at 8000) and serves the game with correct MIME headers.
"""

import http.server
import socketserver
import os
import sys

DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    candidate_ports = [8000, 8088, 8888, 3000, 5000, 5173]
    
    httpd = None
    active_port = None
    for p in candidate_ports:
        try:
            socketserver.TCPServer.allow_reuse_address = True
            httpd = socketserver.TCPServer(("0.0.0.0", p), CustomHandler)
            active_port = p
            break
        except OSError:
            continue
            
    if not httpd:
        print("ERROR: Could not find an open port.")
        sys.exit(1)

    print("==================================================================")
    print(" RESONANCE PING // HADAL TRENCH TARTARUS-7")
    print(f" Tactical Bridge Online: http://localhost:{active_port}")
    print(f" Open http://localhost:{active_port} in your browser to play.")
    print("==================================================================")
    sys.stdout.flush()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nBridge offline.")
        httpd.shutdown()

if __name__ == '__main__':
    run_server()
