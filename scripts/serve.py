#!/usr/bin/env python3
"""Serve the local PromptCode UI and its canonical prompt library."""

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]


class PromptHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def do_GET(self):
        path = urlsplit(self.path).path
        data_files = {'/data/prompt-library.json': 'prompt-library.json', '/data/motion-library.json': 'motion-library.json', '/data/toolkit-library.json': 'toolkit-library.json'}
        if path in data_files:
            try:
                content = (ROOT / 'data' / data_files[path]).read_bytes()
            except OSError:
                self.send_error(503, 'Prompt library unavailable')
                return
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(content)))
            self.end_headers()
            self.wfile.write(content)
            return
        if path == '/health':
            content = json.dumps({'status': 'ok', 'app': 'PromptCode'}).encode()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(content)))
            self.end_headers()
            self.wfile.write(content)
            return
        super().do_GET()

    def list_directory(self, path):
        self.send_error(404, 'Not found')
        return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8765)
    args = parser.parse_args()
    if not 1 <= args.port <= 65535:
        parser.error('端口必须在 1–65535 之间')
    handler = partial(PromptHandler, directory=str(ROOT / 'web'))
    server = None
    for port in range(args.port, min(args.port + 10, 65536)):
        try:
            server = ThreadingHTTPServer(('127.0.0.1', port), handler)
            break
        except OSError as error:
            if error.errno not in (48, 98, 10048):
                raise
    if server is None:
        raise SystemExit('连续 10 个端口不可用，请用 --port 指定其他端口。')
    print(f'PromptCode 本地服务已启动\nLocal: http://127.0.0.1:{server.server_port}\n按 Ctrl+C 停止。', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nPromptCode 本地服务已停止。', flush=True)
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
