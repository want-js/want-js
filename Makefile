install: clean
	npm ci || npm install
	./node_modules/.bin/lerna bootstrap

test: install
	npm run lint
	npm test

build: install test
	./node_modules/.bin/lerna run build

clean:
	rm -rf node_modules
	rm -rf cli/node_modules
	rm -rf plugins/*/node_modules
	rm -rf utils/*/node_modules
	git clean -f -d -x --exclude=".idea" --exclude=".env"
