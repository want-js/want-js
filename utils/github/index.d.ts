declare class GitHubApi {
    private readonly api;
    private readonly url;
    private readonly org;
    private readonly repo;
    constructor(remoteOriginUrl: any, envTokenName?: string);
    getApi(): any;
    getPullRequestsNumbers(): void;
    getBranchCompareUrl(branch: string): string;
}
export default GitHubApi;
