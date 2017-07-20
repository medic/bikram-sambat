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

default: clean build logs

build:
	${GRADLEW} installDebug

clean:
	rm -rf build/

logs:
	${ADB} logcat BikramSambat:V AndroidRuntime:E '*:S' | tee android.log


uninstall:
	adb uninstall bikram.sambat
