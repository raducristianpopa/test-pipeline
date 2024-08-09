#!/usr/bin/env bash

VERSION=$1
CHANNEL=$2
BROWSER=$3

echo $VERSION
echo $CHANNEL
echo $BROWSER

MANIFEST="dist/${BROWSER}/manifest.json"

mkdir -p dist/${BROWSER}
cp -r src/* dist/${BROWSER}/

tmp=$(mktemp)
jq --arg arg_version "$VERSION" '.version = $arg_version' "$MANIFEST" > "$tmp" && mv "$tmp" "$MANIFEST"

if [ $CHANNEL == 'preview' ]; then
  NAME=$(cat "$MANIFEST" | jq -r '.name')
  tmp=$(mktemp)
  jq --arg arg_name "${NAME} Preview" '.name = $arg_name' "$MANIFEST" > "$tmp" && mv "$tmp" "$MANIFEST"
fi

if [ $CHANNEL == 'nightly' ]; then
  NAME=$(cat "$MANIFEST" | jq -r '.name')
  tmp=$(mktemp)
  jq --arg arg_name "${NAME} Nightly" '.name = $arg_name' "$MANIFEST" > "$tmp" && mv "$tmp" "$MANIFEST"
fi

artifact_name="${BROWSER}.zip"
if [ $CHANNEL == 'preview' ]; then
  artifact_name="preview-${BROWSER}-${VERSION}.zip"
fi
cd dist && zip -r "$artifact_name" ${BROWSER} && cd -