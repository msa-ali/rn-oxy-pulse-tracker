# Release Step

1. Do a version change in android/app/build.gradle.

2. cd android     

3. run ./gradlew bundleRelease  

4. cd ..

5. npx react-native run-android --variant=release

*It will create apk files in android/app/build/outputs*

