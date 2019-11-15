module.exports = {
    commandParams: {
        'github': {
            executor: `${__dirname}/index.js`,
            summary: 'Open github repository in browser.',
            aliases: ['gh']
        }
    }
};
