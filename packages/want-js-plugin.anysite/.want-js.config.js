module.exports = {
    commandParams: {
        github: {
            executor: `${__dirname}/index.js`,
            summary: 'Open github.',
            aliases: ['gt']
        }
    }
};
