import { getRemoteOriginUrl } from 'want-js-utils.git';
import GithubApi from 'want-js-utils.github';

const github = async () => {
    const remoteUrl = await getRemoteOriginUrl();
    const githubApi = new GithubApi(remoteUrl, 'GITHUB_OAUTH_TOKEN');

    return githubApi.getUrlPrefix();
};

export default github;
