ADB = ${ANDROID_HOME}/platform-tools/adb
GRADLEW = ./gradlew --daemon --parallel

# Support Windows-style paths
ifdef ComSpec
  # Use `/` for all paths, except `.\`
  ADB := $(subst \,/,${ADB})
  GRADLEW := $(subst /,\,${GRADLEW})
endif

.PHONY: default setup-js assemble-java test test-js test-java travis release-js release-bootstrap

default: test assemble-java android

test: test-js test-java

setup-js:
	cd js && npm install

test-js:
	cd js && grunt

release-js: setup-js test-js
	cd js && \
		../scripts/write-version-number js $$(git describe --abbrev=0 --tags) && \
		npm publish

setup-bootstrap:
	cd bootstrap && npm install

release-bootstrap: setup-bootstrap
	cd bootstrap && \
		../scripts/write-version-number bootstrap $$(git describe --abbrev=0 --tags) && \
		npm publish

assemble-java:
	cd java && ${GRADLEW} assemble

test-java:
	cd java && ${GRADLEW} test

travis: test


.PHONY: android android-logs android-uninstall
android: android-uninstall android-deploy android-logs
android-deploy:
	cd java && ${GRADLEW} :android-demo-app:installDebug
android-logs:
	${ADB} logcat BikramSambat:V AndroidRuntime:E '*:S' | tee android.log
android-uninstall:
	adb uninstall bikram.sambat
