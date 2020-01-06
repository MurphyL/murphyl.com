#!/bin/sh

THEME_DIST=https://github.com/theme-next/hexo-theme-next/archive/v7.7.0.zip
TARGET_DIR=hexo-theme-next-7.7.0
DIST_NAME=next

if curl -fL -o "$DIST_NAME.zip" "$THEME_DIST" && [ -s "$DIST_NAME.zip" ]; then
    break;
fi;

echo 'Hexo theme downloaded: ' $THEME_DIST

unzip -o ./$DIST_NAME.zip -d ./$DIST_NAME

mv ./$DIST_NAME/$TARGET_DIR/* ./themes/$DIST_NAME