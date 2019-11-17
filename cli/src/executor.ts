// @ts-ignore
import opn from 'opn';
import commandLineCommands from 'command-line-commands';
import commandLineUsage from 'command-line-usage';
import values from 'lodash.values';
import keys from 'lodash.keys';
import debugUtil from 'debug';

import gatherSummary, { ICommandParams } from './utils/gather-summary';
import HelperError from './utils/helper-error';

const debug = debugUtil('want:cli:exec');
const opnOptions = { wait: false };

export interface IConfig {
    commands: string[];
    commandParams: ICommandParams;
    aliases: {
        [key: string]: string;
    };
}

class Executor {
    private readonly command: string;
    // @ts-ignore
    private readonly argv;
    private readonly config: IConfig;

    constructor(config: IConfig) {
        debug('ArgvExecutor init with config: %O', config);

        // @ts-ignore
        config.commands.push(null);

        const { command, argv } = commandLineCommands(config.commands);

        config.commands.pop();

        // @ts-ignore
        this.command = config.aliases[command] || command;
        this.argv = argv;
        this.config = config;
    }

    async exec() {
        if (this.command) {
            await this.execCommand();
        } else {
            this.execArgv();
        }
    }

    private async execCommand() {
        debug('Try to exec command %s', this.command);

        const { commandParams } = this.config;

        // @ts-ignore
        const commandCfg = commandParams[this.command];
        if (!commandCfg) {
            throw new HelperError('There is no cfg for command.');
        }

        const command = require(commandCfg.executor);
        const urls = await command(commandCfg);

        this.open(urls);
    }

    private open(url: string | string[]) {
        debug('Try to open url: %o', url);

        if (typeof url === 'string') {
            opn(url, opnOptions);
        } else if (Array.isArray(url)) {
            url.forEach((elem) => {
                opn(elem, opnOptions);
            });
        } else {
            throw new HelperError('Cannot parse url for opening');
        }
    }

    private execArgv() {
        if (this.argv.includes('-h') || this.argv.includes('--help')) {
            this.printHelp();
        } else {
            throw new HelperError('There is no such args');
        }
    }

    printHelp() {
        const { commandParams } = this.config;
        const rules = keys(this.config.commandParams).map(gatherSummary(commandParams));

        const commandList = values(rules);
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

        const usage = commandLineUsage(sections);
        console.log(usage);
    }
}

export default Executor;
