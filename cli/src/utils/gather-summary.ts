export interface ICommandParams {
    [key: string]: {
        executor: string;
        summary: string;
        aliases: string[];
    };
}

const gatherSummary = (commandParams: ICommandParams) => (elemName: string) => {
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
