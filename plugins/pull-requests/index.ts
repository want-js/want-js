import debugUtil from 'debug';

const debug = debugUtil('want:plugin:pr');

async function getPullRequestsNumbers(GitApi, github, remoteUrl) {
    const githubParsedUrls = await GitApi.getParsedRemoteUrls();
    const githubOriginUrl = await GitApi.getParsedRemoteOriginUrl();
    const branch = await GitApi.getBranchName();

    const preResult = await Promise.all(githubParsedUrls.map(async githubParsedUrl => {
        debug('Start get pulls from %o', githubParsedUrl);

        const ghPromise = new Promise((resolve, reject) => {
            if (githubParsedUrl.url !== remoteUrl) {
                console.warn(`Remote ${githubParsedUrl.url} differs from choosen api ${this.githubUrl}`);
                return resolve([]);
            }

            github.pulls.list({
                state: 'all',
                owner: githubParsedUrl.organization,
                repo: githubParsedUrl.repository,
                head: `${githubOriginUrl.organization}:${branch}`
            })
                .then(res => resolve(res.data))
                .catch(reject);
        });

        const resData = await ghPromise;

        return resData.map(function (pullReqData) {
            return {
                owner: pullReqData.base.repo.owner.login,
                number: pullReqData.number
            };
        });
    }));

    return Array.prototype.concat.apply([], preResult);
}

const parseGithubApiConfig = ({ url }) => {
    return {
        githubApiUrl: url === 'github.com' ? 'api.github.com' : url,
        githubApiPath: url === 'github.com' ? '' : '/api/v3'
    };
};

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
