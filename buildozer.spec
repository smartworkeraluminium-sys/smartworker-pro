[app]

# (str) Title of your application
title = Smart Worker Pro

# (str) Source code where the main.py live
source.dir = .

# (str) Package name
package.name = smartworkerpro

# (str) Package domain (needed for android packaging)
package.domain = org.smartworker

# (list) Source files to include
source.include_exts = py,png,jpg,kv,atlas,ttf,pdf

# (str) Application versioning
version = 1.0

# (list) Application requirements (আপনার পিডিএফ বা ডেটাবেস থাকলে কাজে লাগবে)
requirements = python3,kivy,pillow,sqlite3

# (str) Supported orientations
orientation = portrait

# (str) Supported architectures
android.archs = arm64-v8a

# Auto-accept Android SDK licenses
android.accept_sdk_license = True

# Kivy-র জন্য সবচেয়ে স্ট্যাবল API এবং NDK ভার্সন
android.api = 33
android.minapi = 21
android.ndk = 25b

[buildozer]

# (int) Log level
log_level = 2
warn_on_root = 1

