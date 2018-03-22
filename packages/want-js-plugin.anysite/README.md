# want-js-plugin.anysite
Universal plugin for want-js for different servises which can be opened as https://somesite/{orgName}/{repoName}

## Usage

1) Install want-js-helper

```bash
$ npm install want-js-helper --global
```

2) Install current plugin global

```bash
$ npm install want-js-plugin.anysite --global
```

or in some project

```bash
$ npm install want-js-plugin.anysite --save-dev
```

3) If you use github.com, then simply enter:
```bash
$ want github
```
 
or

```bash
$ want gt
```

If you want to use other apps which can opened project page with path like github, уou can customise you project adding config `.want-js.config.js` in the root of the project.
For example:

```js

const wantJSCfg = require('want-js-plugin.anysite/.want-js.config');

module.exports = {
    commandParams: {
        travis: {
            executor: wantJSCfg.commandParams.github.executor,
            siteUrl: 'travis-ci.org',
            summary: 'Open travis',
            aliases: ['tr']
        }
    }
};

```

Or you can create you own redefined plugin, where will `.want-js.config.js`.

This way is better then previous when you use other installation project in different projects.
But you may create config fastly like previos in common project directory.
The main disadvantage of this approach is lack of opportunity to share config with other.
