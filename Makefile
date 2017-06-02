GRADLEW = ./gradlew --daemon --parallel

.PHONY: default assemble-java test test-js test-java travis travis-deploy

default: test assemble-java

assemble-java:
	cd java && ${GRADLEW} assemble

test: test-js test-java

test-js:
	cd js && grunt

test-java:
	cd java && ${GRADLEW} test

travis: test
travis-deploy:
	npm adduser
	cd js && npm publish
