"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = __importDefault(require("@octokit/rest"));
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default('want:utils:github');
const parseGithubApiConfig = ({ url }) => ({
    githubApiUrl: url === 'github.com' ? 'api.github.com' : url,
    githubApiPath: url === 'github.com' ? '' : '/api/v3',
});
class GitHubApi {
    constructor(remoteOriginUrl, envTokenName = '') {
        const { githubApiUrl, githubApiPath } = parseGithubApiConfig(remoteOriginUrl);
        const github = new rest_1.default({
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
    getBranchCompareUrl(branch) {
        return `https://${this.url}/${this.org}/${this.repo}/compare/${branch}?expand=1`;
    }
}
exports.default = GitHubApi;
//# sourceMappingURL=index.js.map