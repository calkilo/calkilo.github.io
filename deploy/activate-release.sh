#!/usr/bin/env bash
set -euo pipefail

# Runs as calkilo-web; sudo is limited to the root-owned redirect validator.
release=${1:?Usage: activate-release.sh RELEASE_ID}
[[ "$release" =~ ^[a-zA-Z0-9-]+$ ]] || exit 2
base=/var/www/calkilo-landing
exec 9>"$base/.deploy.lock"
flock -w 60 9
incoming="$base/incoming/$release"
destination="$base/releases/$release"
test -f "$incoming/index.html"
test -f "$incoming/404.html"
test -f "$incoming/contact/index.html"
test -d "$incoming/_next/static"
test ! -e "$destination"

# Retain hashed assets so browsers with an older page can still load chunks.
rsync -a --ignore-existing "$incoming/_next/static/" "$base/assets/"
for kind in assets data; do
  test -d "$incoming/$kind/versioned"
  rsync -a --ignore-existing "$incoming/$kind/versioned/" "$base/versioned-$kind/"
done
printf '%s\n' "$release" > "$incoming/deployment.txt"
mv "$incoming" "$destination"
previous=$(readlink "$base/current" || true)
ln -s "$destination" "$base/current.next"
mv -Tf "$base/current.next" "$base/current"

healthy=true
sudo -n /usr/local/sbin/calkilo-web-reload || healthy=false
for path in / /contact/ /fa/ /robots.txt; do
  curl --fail --silent --show-error --max-time 15 \
    -H 'Host: calkilo.com' "http://127.0.0.1:8089$path" -o /dev/null || healthy=false
done
actual=$(curl --fail --silent --show-error --max-time 15 \
  -H 'Host: calkilo.com' http://127.0.0.1:8089/deployment.txt) || healthy=false
[[ "$actual" == "$release" ]] || healthy=false
if [[ "$healthy" != true ]]; then
  if [[ -n "$previous" ]]; then
    ln -s "$previous" "$base/current.rollback"
    mv -Tf "$base/current.rollback" "$base/current"
    sudo -n /usr/local/sbin/calkilo-web-reload
  else
    rm "$base/current"
  fi
  echo 'Origin health check failed; restored the previous release.' >&2
  exit 1
fi
echo "Activated $release"

# Keep the five newest releases plus the previous release for rollback.
find "$base/releases" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' \
  | sort -rn | tail -n +6 | cut -d ' ' -f 2- \
  | while IFS= read -r old; do
      [[ "$old" == "$destination" || "$old" == "$previous" ]] || rm -rf -- "$old"
    done
