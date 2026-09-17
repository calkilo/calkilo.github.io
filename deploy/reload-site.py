#!/usr/bin/python3 -I
"""Root-owned helper: validate redirect data, never execute uploaded configuration."""
import os
from pathlib import Path
import re
import subprocess
import sys


def redirect_map(source):
    redirects = {}
    for line in source.splitlines():
        if not line.strip() or line.startswith('#'):
            continue
        parts = line.split()
        if len(parts) != 3 or parts[2] != '301':
            raise ValueError('Only exact permanent redirects are supported')
        old, new = parts[:2]
        for path in (old, new):
            if not re.fullmatch(r'/[A-Za-z0-9_./%~-]*', path) or '//' in path or '..' in path:
                raise ValueError('Unsafe redirect path')
        if old in redirects and redirects[old] != new:
            raise ValueError('Conflicting redirect')
        if old != '/index.html':
            redirects[old] = new
    for old in redirects:
        seen = {old}
        new = redirects[old]
        while new in redirects:
            if new in seen:
                raise ValueError('Redirect cycle')
            seen.add(new)
            new = redirects[new]
        redirects[old] = new
    return ''.join(f'"{old}" "{new}";\n' for old, new in sorted(redirects.items()))


def main():
    if len(sys.argv) != 1:
        raise ValueError('This helper takes no arguments')
    base = Path('/var/www/calkilo-landing')
    source = (base / 'current/_redirects').resolve(strict=True)
    if not source.is_relative_to(base / 'releases') or source.stat().st_size > 1_000_000:
        raise ValueError('Invalid redirect source')
    data = redirect_map(source.read_text())
    target = Path('/etc/nginx/snippets/calkilo-redirects.conf')
    previous = target.read_text() if target.exists() else ''
    staged = target.with_suffix('.tmp')
    staged.write_text(data)
    os.chmod(staged, 0o644)
    staged.replace(target)
    try:
        subprocess.run(['/usr/sbin/nginx', '-t'], check=True)
        subprocess.run(['/usr/bin/systemctl', 'reload', 'nginx'], check=True)
    except Exception:
        target.write_text(previous)
        subprocess.run(['/usr/sbin/nginx', '-t'], check=True)
        subprocess.run(['/usr/bin/systemctl', 'reload', 'nginx'], check=True)
        raise


if __name__ == '__main__':
    main()
