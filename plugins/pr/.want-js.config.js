module.exports = {
    commandParams: {
        'pull-request': {
            executor: `${__dirname}/index.js`,
            summary: 'Open pull request in github by branch.',
            aliases: ['pr'],

            githubApiUrl: 'github.com',
            githubApiPath: '',
            githubApiOauthTokenName: 'COMMON_GITHUB_OAUTH_TOKEN'
        }
    }
};