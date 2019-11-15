"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = gatherSummary;
//# sourceMappingURL=gather-summary.js.map