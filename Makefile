install: clean
	npm ci || npm install
	./node_modules/.bin/lerna bootstrap

test: install
	npm run lint
	npm test

build: install test
	./node_modules/.bin/lerna run build

clean:
	git clean -f -d -x --exclude=".idea" --exclude=".env"
