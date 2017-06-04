.PHONY: default update

default:
	@echo 'Run `make update` to update pages.'
	@echo 'WARNING: this will affect your git working directory.'

update:
	git checkout master -- bootstrap/dist/
	git reset
	mv bootstrap/dist/* .
	git status
