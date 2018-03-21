
module.exports = async (data, GitApi) => {
    const githubParsedUrl = await GitApi.getParsedRemoteOriginUrl();
    const branch = await GitApi.getBranchName();
    const gitApi = new GitApi(
        data.githubApiUrl,
        data.githubApiPath,
        data.githubApiOauthTokenName
    );
    const pullNumbers = await gitApi.getPullRequestsNumbers();
    return pullNumbers.map(function (elem) {
        return `https://${githubParsedUrl.url}/${elem.owner}/${githubParsedUrl.repository}/pull/${elem.number}`;
    });
};
