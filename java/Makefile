#
# TODO This file should be merged into the parent Makefile when convenient
#

ADB = ${ANDROID_HOME}/platform-tools/adb
EMULATOR = ${ANDROID_HOME}/tools/emulator
GRADLEW = ./gradlew --daemon --parallel

ifdef ComSpec	 # Windows
  # Use `/` for all paths, except `.\`
  ADB := $(subst \,/,${ADB})
  EMULATOR := $(subst \,/,${EMULATOR})
  GRADLEW := $(subst /,\,${GRADLEW})
endif

.PHONY: default build clean uninstall logs
.PHONY: clean-lib clean-demo-app build-lib build-demo-app

default: clean build logs

build: build-lib build-demo-app

build-lib:
	${GRADLEW} :lib:uploadArchives

build-demo-app:
	${GRADLEW} :demo-app:installDebug


publish-lib:
	echo TODO publish lib somehow to a maven repo.  Maybe github pages?
	exit 1


clean: clean-lib clean-demo-app

clean-lib:
	cd lib && rm -rf build/

clean demo-app:
	cd demo-app && rm -rf build/


logs:
	${ADB} logcat BikramSambat:V AndroidRuntime:E '*:S' | tee android.log


uninstall:
	adb uninstall bikram.sambat
