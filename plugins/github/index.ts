import debugUtil from 'debug';

const debug = debugUtil('want:plugin:github');

const pr = async (config) => {
    debug('Config: %O', config);

    const githubParsedUrl = await GitApi.getParsedRemoteOriginUrl();
    const branch = await GitApi.getBranchName();
    const gitApi = new GitApi();

    const { githubApiUrl, githubApiPath } = parseGithubApiConfig(githubParsedUrl);

    gitApi.initGithubApi(
        githubApiUrl,
        githubApiPath,
        process.env.GITHUB_OAUTH_TOKEN
    );

    debug('Github api was inited');

    const pullNumbers = await getPullRequestsNumbers(GitApi, gitApi.getGithubApi(), githubApiUrl);

    debug('PullNumbers %O', pullNumbers);

    if (pullNumbers.length) {
        return pullNumbers.map(function (elem) {
            return `https://${githubParsedUrl.url}/${elem.owner}/${githubParsedUrl.repository}/pull/${elem.number}`;
        });
    }

    return `https://${githubParsedUrl.url}/${githubParsedUrl.organization}/${githubParsedUrl.repository}/compare/${branch}?expand=1`;
};

export default pr;
