"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const opn_1 = __importDefault(require("opn"));
const command_line_commands_1 = __importDefault(require("command-line-commands"));
const command_line_usage_1 = __importDefault(require("command-line-usage"));
const lodash_values_1 = __importDefault(require("lodash.values"));
const lodash_keys_1 = __importDefault(require("lodash.keys"));
const debug_1 = __importDefault(require("debug"));
const gather_summary_1 = __importDefault(require("../libs/gather-summary"));
const helper_error_1 = __importDefault(require("../libs/helper-error"));
const debug = debug_1.default('want:cli:exec');
const opnOptions = { wait: false };
class Executor {
    constructor(config) {
        debug('ArgvExecutor init with config: %O', config);
        config.commands.push(null);
        const { command, argv } = command_line_commands_1.default(config.commands);
        config.commands.pop();
        this.command = config.aliases[command] || command;
        this.argv = argv;
        this.config = config;
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.command) {
                yield this.execCommand();
            }
            else {
                this.execArgv();
            }
        });
    }
    execCommand() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('Try to exec command %s', this.command);
            const { commandParams } = this.config;
            const commandCfg = commandParams[this.command];
            if (!commandCfg) {
                throw new helper_error_1.default('There is no cfg for command.');
            }
            const command = require(commandCfg.executor);
            const urls = yield command(commandCfg);
            this.open(urls);
        });
    }
    open(url) {
        debug('Try to open url: %o', url);
        if (typeof url === 'string') {
            opn_1.default(url, opnOptions);
        }
        else if (Array.isArray(url)) {
            url.forEach((elem) => {
                opn_1.default(elem, opnOptions);
            });
        }
        else {
            throw new helper_error_1.default('Cannot parse url for opening');
        }
    }
    execArgv() {
        if (this.argv.includes('-h') || this.argv.includes('--help')) {
            this.printHelp();
        }
        else {
            throw new helper_error_1.default('There is no such args');
        }
    }
    printHelp() {
        const { commandParams } = this.config;
        const rules = lodash_keys_1.default(this.config.commandParams).map(gather_summary_1.default(commandParams));
        const commandList = lodash_values_1.default(rules);
        commandList.unshift({ name: '--help', summary: 'Display help information about want.' });
        const sections = [
            {
                header: 'Want-open-helper',
                content: 'Tool for quick opening services like Github, Travis and etc. from local project directory.',
            },
            {
                header: 'Synopsis',
                content: '$ want <command> | --help',
            },
            {
                header: 'Command List',
                content: commandList,
            },
        ];
        const usage = command_line_usage_1.default(sections);
        console.log(usage);
    }
}
exports.default = Executor;
//# sourceMappingURL=executor.js.map