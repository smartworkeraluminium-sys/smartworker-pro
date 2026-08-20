[app]
title = Smart Worker Pro
package.name = smartworker
package.domain = com.sahebghati
source.dir = .
source.include_exts = py,png,jpg,kv,atlas,ttf,db
version = 1.0
requirements = python3,kivy,reportlab
orientation = portrait
author = Saheb Ghati

[android]
android.permissions = WRITE_EXTERNAL_STORAGE, READ_EXTERNAL_STORAGE, INTERNET
android.api = 33
android.minapi = 21
android.sdk_api_version = 33
android.ndk_version = 25b
android.accept_sdk_license = True
android.archs = arm64-v8a, armeabi-v7a
android.release_artifact = aab
