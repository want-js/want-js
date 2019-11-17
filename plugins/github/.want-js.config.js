module.exports = {
    commandParams: {
        'github': {
            executor: `${__dirname}/dist/index.js`,
            summary: 'Open github repository in browser.',
            aliases: ['gh']
        }
    }
};
