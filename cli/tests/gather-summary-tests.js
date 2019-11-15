"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const gather_summary_1 = __importDefault(require("../libs/gather-summary"));
ava_1.default.beforeEach((t) => {
    const commandsExecFilename = {
        s: {
            type: 'command',
            summary: 'test startrek',
            aliases: ['st', 'star', 'startrek'],
        },
        bunker: {
            type: 'command',
            summary: 'test bunker',
        },
    };
    t.context.gatherSummary = gather_summary_1.default(commandsExecFilename);
});
ava_1.default('Check that it works with usual config.', (t) => {
    const expected = {
        name: 's, st, star, startrek',
        summary: 'test startrek',
    };
    const actual = t.context.gatherSummary('s');
    t.deepEqual(actual, expected);
});
ava_1.default('Check that it works with usual config without aliases.', (t) => {
    const expected = {
        name: 'bunker',
        summary: 'test bunker',
    };
    const actual = t.context.gatherSummary('bunker');
    t.deepEqual(actual, expected);
});
//# sourceMappingURL=gather-summary-tests.js.map