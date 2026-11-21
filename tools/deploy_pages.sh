#!/bin/sh
# Publishes the yonder/ folder to the "gh-pages" branch, which GitHub Pages serves for free (no credits).
# Run from anywhere inside the repo:  sh tools/deploy_pages.sh
set -e
ROOT=$(git rev-parse --show-toplevel)
REMOTE=$(git -C "$ROOT" remote get-url origin)
NAME=$(git -C "$ROOT" config user.name)
EMAIL=$(git -C "$ROOT" config user.email)
TMP=$(mktemp -d)
cp -R "$ROOT/yonder/." "$TMP/"
touch "$TMP/.nojekyll"   # serve the files exactly as they are
cd "$TMP"
git init -q -b gh-pages
git add -A
git -c user.name="$NAME" -c user.email="$EMAIL" commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%MZ)"
git push -f -q "$REMOTE" gh-pages:gh-pages
rm -rf "$TMP"
echo "Published. Live in about a minute at the GitHub Pages address."
