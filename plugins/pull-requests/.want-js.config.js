module.exports = {
    commandParams: {
        'pull-request': {
            executor: `${__dirname}/index.js`,
            summary: 'Open pull request in github by branch.',
            aliases: ['pr', 'pull']
        }
    }
};