GRADLEW = ./gradlew --daemon --parallel

.PHONY: default setup assemble-java test test-js test-java travis release

default: test assemble-java

setup:
	cd js && npm install

assemble-java:
	cd java && ${GRADLEW} assemble

test: test-js test-java

test-js:
	cd js && grunt

test-java:
	cd java && ${GRADLEW} test

travis: test

release: setup test assemble-java
	cd js && \
		../scripts/write-version-number $$(git describe --abbrev=0 --tags) && \
		npm publish
