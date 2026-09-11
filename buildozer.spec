[app]
title = Smart Worker Pro
package.name = smartworker
package.domain = org.smartworker
source.dir = .
source.include_exts = py,png,jpg,kv,atlas,ttf,db
version = 1.0

# Critical: Only stable dependencies. Do NOT add sqlite3, reportlab, or requests.
requirements = python3,kivy,plyer

orientation = portrait
fullscreen = 0
android.permissions = WRITE_EXTERNAL_STORAGE,READ_EXTERNAL_STORAGE,INTERNET,ACCESS_NETWORK_STATE

# Android API & NDK Configuration
android.api = 33
android.minapi = 24
android.ndk = 25b
android.ndk_api = 24
android.accept_sdk_license = True

# Build ONLY for arm64-v8a (Runs on all modern Android phones, cuts build time in half to 15-20 mins)
android.archs = arm64-v8a

# App icon & presplash
icon.filename = %(source.dir)s/myicon.png
presplash.filename = %(source.dir)s/myicon.png

[buildozer]
log_level = 2
warn_on_root = 0