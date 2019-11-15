"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default('want:plugin:pr');
function getPullRequestsNumbers(GitApi, github, remoteUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const githubParsedUrls = yield GitApi.getParsedRemoteUrls();
        const githubOriginUrl = yield GitApi.getParsedRemoteOriginUrl();
        const branch = yield GitApi.getBranchName();
        const preResult = yield Promise.all(githubParsedUrls.map((githubParsedUrl) => __awaiter(this, void 0, void 0, function* () {
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
                    head: `${githubOriginUrl.organization}:${branch}`,
                })
                    .then((res) => resolve(res.data))
                    .catch(reject);
            });
            const resData = yield ghPromise;
            return resData.map((pullReqData) => ({
                owner: pullReqData.base.repo.owner.login,
                number: pullReqData.number,
            }));
        })));
        return Array.prototype.concat.apply([], preResult);
    });
}
const parseGithubApiConfig = ({ url }) => ({
    githubApiUrl: url === 'github.com' ? 'api.github.com' : url,
    githubApiPath: url === 'github.com' ? '' : '/api/v3',
});
const pr = (config) => __awaiter(void 0, void 0, void 0, function* () {
    debug('Config: %O', config);
    const githubParsedUrl = yield GitApi.getParsedRemoteOriginUrl();
    const branch = yield GitApi.getBranchName();
    const gitApi = new GitApi();
    const { githubApiUrl, githubApiPath } = parseGithubApiConfig(githubParsedUrl);
    gitApi.initGithubApi(githubApiUrl, githubApiPath, process.env.GITHUB_OAUTH_TOKEN);
    debug('Github api was inited');
    const pullNumbers = yield getPullRequestsNumbers(GitApi, gitApi.getGithubApi(), githubApiUrl);
    debug('PullNumbers %O', pullNumbers);
    if (pullNumbers.length) {
        return pullNumbers.map((elem) => `https://${githubParsedUrl.url}/${elem.owner}/${githubParsedUrl.repository}/pull/${elem.number}`);
    }
    return `https://${githubParsedUrl.url}/${githubParsedUrl.organization}/${githubParsedUrl.repository}/compare/${branch}?expand=1`;
});
exports.default = pr;
//# sourceMappingURL=index.js.map