# want-js-plugin.pr
Plugin for want-js-helper which allows open pull-requests on Github.com

## Usage

1) Install want-js-helper

```bash
$ npm install want-js-helper --global
```

2) Install current plugin global

```bash
$ npm install want-js-plugin.pr --global
```

or in some project

```bash
$ npm install want-js-plugin.pr --save-dev
```

3) If you use github.com, then simply enter:
```bash
$ want pull-requrest
```
 
or

```bash
$ want pr
```

If you use other github installation, уou can customise you project adding config `.want-js.config.js` in the root of the project.
For example:

```js
module.exports = {
    commandParams: {
        'my-command': {
            // refefined option
            githubApiUrl: 'example.github.com',
            githubApiPath: '/api/some/path',
            githubApiOauthTokenName: 'SPECIAL_GITHUB_OAUTH_TOKEN'
        }
    }
};
```

`SPECIAL_GITHUB_OAUTH_TOKEN` must be present in enviroment as a variable.

Or you can create you own redefined plugin, where will `.want-js.config.js`.


```js
const wantJSCfg = require('want-js-plugin.pr/.want-js.config');

module.exports = {
    commandParams: {
        'my-command': {
            executor: wantJSCfg.commandParams['pull-request'].executor,
            summary: 'Open pull request on example.github.com.',
            aliases: wantJSCfg.commandParams['pull-request'].aliases,
            githubApiUrl: 'example.github.com',
            githubApiPath: '/api/some/path',
            githubApiOauthTokenName: 'SPECIAL_GITHUB_OAUTH_TOKEN'
        }
    }
};
```

This way is better then previous when you use other installation project in different projects.
But you may create config fastly like previos in common project direcory.
The main disadvantage of this approach is lack of opportunity to share config with other.

Plugin will detect all pull requests by branch name.