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

If you use other github installation, уou can customise you project adding there config.
For example:

```js
const wantJSCfg = require('want-js-plugin.pr/.want-js.config');

module.exports = {
    commandParams: {
        'my-command': {
            executor: wantJSCfg.commandParams.github.executor,
            siteUrl: 'example.github.com',
            summary: 'My own test command.',
            aliases: ['mc']
        }
    }
};
```


Or you can create you plugin which will redefine current.

It will detect all pull requests by branch name.