import OctokitRest, { AuthOAuthToken } from '@octokit/rest';
import debugUtil from 'debug';
import { parseRemote } from 'want-js-utils.git';

const debug = debugUtil('want:utils:github');

const parseGithubApiConfig = (url: string) => ({
    githubApiUrl: url === 'github.com' ? 'api.github.com' : url,
    githubApiPath: url === 'github.com' ? '' : '/api/v3',
});

const maskToken = (token: string): string => {
    return `${token.substr(0, 2)}${'*'.repeat(token.length - 4)}${token.substr(token.length - 3, 2)}`;
};

interface IPull {
    owner: string;
    number: number;
}

class GitHubApi {
    private readonly api: OctokitRest;
    private readonly url: string;
    private readonly org: string;
    private readonly repo: string;

    constructor(remoteOriginUrl: string, envTokenName: string) {
        const { url, organization, repository } = parseRemote(remoteOriginUrl);
        const { githubApiUrl, githubApiPath } = parseGithubApiConfig(url);
        const baseUrl = `https://${githubApiUrl}${githubApiPath || '/'}`;

        this.url = url;
        this.org = organization;
        this.repo = repository;
        this.api = new OctokitRest({ baseUrl });

        if (envTokenName && typeof process.env[envTokenName] !== 'undefined') {
            const token = String(process.env[envTokenName]);
            const auth: AuthOAuthToken = {
                type: 'oauth',
                token,
            };

            this.api.authenticate(auth);
            debug(`Github api auth with oauth token "${maskToken(token)}"`);
        }
    }

    public getApi(): OctokitRest {
        if (!this.api) {
            throw new Error('Github API was not inited');
        }

        return this.api;
    }

    public async getPullRequestsNumbers(branch: string): Promise<IPull[]> {
        debug('Start get pulls for %s', branch);

        const response = await this.api.pulls.list({
            state: 'all',
            owner: this.org,
            repo: this.repo,
            head: `${this.org}:${branch}`,
        });

        return response.data.map((pull) => ({
            owner: pull.base.repo.owner.login,
            number: pull.number,
        }));
    }

    public getUrlPrefix(): string {
        return `https://${this.url}/${this.org}/${this.repo}`;
    }
}

export default GitHubApi;
