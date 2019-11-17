import debugUtil from 'debug';
import { getRemoteOriginUrl, getBranchName } from 'want-js-utils.git';
import GithubApi from 'want-js-utils.github';

const debug = debugUtil('want:plugin:github');

const getPullRequestUrl = (github: GithubApi, pull: number): string => {
    return `${github.getUrlPrefix()}/pull/${pull}`;
};

const getBranchCompareUrl = (github: GithubApi, branch: string): string => {
    return `${github.getUrlPrefix()}/compare/${branch}?expand=1`;
};

const pr = async () => {
    const remoteUrl = await getRemoteOriginUrl();
    const branch = await getBranchName();
    const githubApi = new GithubApi(remoteUrl, 'GITHUB_OAUTH_TOKEN');

    debug('Github api was inited');

    const pullNumbers = await githubApi.getPullRequestsNumbers(branch);

    debug('PullNumbers %O', pullNumbers);

    if (pullNumbers.length) {
        return pullNumbers.map((elem) => getPullRequestUrl(githubApi, elem.number));
    }

    return getBranchCompareUrl(githubApi, branch);
};

export default pr;
