[app]

# (str) Title of your application
title = Smart Worker Pro

# (str) Package name
package.name = smartworkerpro

# (str) Package domain (needed for android packaging)
package.domain = org.smartworker

# (list) Source files to include (let it empty to include all files)
source.include_exts = py,png,jpg,kv,atlas,ttf

# (list) Source files to exclude (let it empty to exclude all files)
#source.exclude_exts = spec

# (list) List of inclusion/exclusion patterns
#source.exclude_patterns = license,images/*/*.jpg

# (str) Application versioning (method 1)
version = 1.0

# (list) Application requirements
# comma separated e.g. requirements = sqlite3,kivy
requirements = python3,kivy,pillow

# (list) Custom source folders for python modules
#source.dirs = extra_dirs

# (list) Permissions
#android.permissions = INTERNET

# (str) Supported orientations
orientation = portrait

# (list) The Android target API, default is 31
#android.api = 31

# (int) Minimum API your APK will support.
#android.minapi = 21

# (str) Supported architectures
android.archs = arm64-v8a

[buildozer]

# (int) Log level (0 = error, 1 = info, 2 = debug (with command output))
log_level = 2

# (int) Display warning if buildozer is run as root (0 = False, 1 = True)
warn_on_root = 1
