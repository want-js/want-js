import git from 'simple-git/promise';
import gitRemoteOriginUrl from 'git-remote-origin-url';
import debugUtil from 'debug';

const debug = debugUtil('want:utils:git');

export const parseRemote = (url: string) => {
    const commonRegExp = /(https:\/\/|git@)([a-z.\-_]+@)?([a-z.\-_]+)[:|/]([.A-Za-z0-9_\-]+)\/([.A-Za-z0-9_\-]+).git/;
    const parsedUrl = commonRegExp.exec(url);

    if (!parsedUrl) {
        throw new Error(`Can not parse url "${url}"`);
    }

    return {
        protocol: (parsedUrl[1] || '').replace(/(:\/\/)|@/, ''),
        username: (parsedUrl[2] || '').replace('@', ''),
        url: parsedUrl[3],
        organization: parsedUrl[4],
        repository: parsedUrl[5]
    };
};

export const getRemoteOriginUrl = gitRemoteOriginUrl;

export const getBranchName = async () => {
    const branch = await git().revparse(['--abbrev-ref', 'HEAD']);

    debug('Branch name: %o', branch);

    return branch.trim();
};

export const getCommit = async () => {
    const commit = await git().revparse(['HEAD']);

    debug('Commit: %o', commit);

    return commit.trim();
};

export const getParsedRemoteOriginUrl = async () => {
    const url = await gitRemoteOriginUrl();

    debug('Remote origin url: %o', url);

    return parseRemote(url);
};

export const getParsedRemoteUrls = async () => {
    const remotes = await git().getRemotes(true);

    debug('Remote urls: %o', remotes);

    return remotes.map(remote => parseRemote(remote.refs.push));
};
