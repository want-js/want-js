module.exports = async function (data, GitApi) {
    const parsedUrl = await GitApi.getParsedRemoteOriginUrl();
    if (parsedUrl) {
        const siteUrl = data.siteUrl || parsedUrl.url;
        return `https://${siteUrl}/${parsedUrl.organization}/${parsedUrl.repository}`;
    }
};
