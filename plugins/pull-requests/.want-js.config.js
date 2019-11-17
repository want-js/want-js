module.exports = {
    commandParams: {
        'pull-requests': {
            executor: `${__dirname}/dist/index.js`,
            summary: 'Open github pull requests in browser.',
            aliases: ['pr']
        }
    }
};
