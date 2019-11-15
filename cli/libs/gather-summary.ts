const gatherSummary = (commandParams) => (elemName) => {
    const { aliases = [], summary } = commandParams[elemName];
    let name = elemName;

    aliases.forEach((alias) => {
        name += `, ${alias}`;
    });

    return {
        name,
        summary,
    };
};

export default gatherSummary;
