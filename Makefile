install:
	npm ci
	./node_modules/.bin/lerna bootstrap

test:
	npm run lint
	npm test

clean:
	rm -rf node_modules; rm -rf cli/node_modules; rm -rf plugins/*/node_modules