GRADLEW = ./gradlew --daemon --parallel

.PHONY: default setup-js assemble-java test test-js test-java travis release-js release-bootstrap

default: test assemble-java deploy-android

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

deploy-android:
	cd java && ${GRADLEW} :android-demo-app:installDebug

travis: test
