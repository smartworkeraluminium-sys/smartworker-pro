[app]

# (str) Title of your application
title = Smart Worker Pro

# (str) Source code where the main.py live
source.dir = .

# (str) Package name
package.name = smartworkerpro

# (str) Package domain (needed for android packaging)
package.domain = org.smartworker

# (list) Source files to include (let it empty to include all files)
source.include_exts = py,png,jpg,kv,atlas,ttf

# (str) Application versioning (method 1)
version = 1.0

# (list) Application requirements
requirements = python3,kivy,pillow

# (str) Supported orientations
orientation = portrait

# (str) Supported architectures
android.archs = arm64-v8a

[buildozer]

# (int) Log level (0 = error, 1 = info, 2 = debug (with command output))
log_level = 2

# (int) Display warning if buildozer is run as root (0 = False, 1 = True)
warn_on_root = 1
