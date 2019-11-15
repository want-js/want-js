import OctokitRest from '@octokit/rest';
import debugUtil from 'debug';
import { parseRemote, IRemote } from 'want-js-utils.git';

const debug = debugUtil('want:utils:github');

const parseGithubApiConfig = ({ url }: IRemote) => ({
    githubApiUrl: url === 'github.com' ? 'api.github.com' : url,
    githubApiPath: url === 'github.com' ? '' : '/api/v3',
});

class GitHubApi {
    private readonly api;
    private readonly url: string;
    private readonly org: string;
    private readonly repo: string;

    constructor(remoteOriginUrl: IRemote, envTokenName = '') {
        const { githubApiUrl, githubApiPath } = parseGithubApiConfig(remoteOriginUrl);
        const github = new OctokitRest({
            baseUrl: `https://${githubApiUrl}${githubApiPath || '/'}`,
        });

        if (envTokenName && process.env[envTokenName]) {
            const authOptions = {
                type: 'token',
                token: process.env[envTokenName],
            };

            github.authenticate(authOptions);
            debug('Github api auth with options: %o', authOptions);
        }

        this.api = github;
    }

    getApi() {
        if (!this.api) {
            throw new Error('Github API was not inited');
        }

        return this.api;
    }

    getPullRequestsNumbers() {
    }

    getBranchCompareUrl(branch: string): string {
        return `https://${this.url}/${this.org}/${this.repo}/compare/${branch}?expand=1`;
    }
}

export default GitHubApi;
