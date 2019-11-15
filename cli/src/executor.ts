import opn from 'opn';
import commandLineCommands from 'command-line-commands';
import commandLineUsage from 'command-line-usage';
import values from 'lodash.values';
import keys from 'lodash.keys';
import debugUtil from 'debug';

import gatherSummary from '../libs/gather-summary';
import HelperError from '../libs/helper-error';

const debug = debugUtil('want:cli:exec');
const opnOptions = { wait: false };

class Executor {
    private readonly command;
    private readonly argv;
    private readonly config;

    constructor(config) {
        debug('ArgvExecutor init with config: %O', config);

        config.commands.push(null);

        const { command, argv } = commandLineCommands(config.commands);

        config.commands.pop();

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

        let commandCfg = commandParams[this.command];
        if (!commandCfg) {
            throw new HelperError('There is no cfg for command.');
        }

        const command = require(commandCfg.executor);
        const urls = await command(commandCfg);

        this.open(urls);
    }

    private open(url) {
        debug('Try to open url: %o', url);

        if (typeof url === 'string') {
            opn(url, opnOptions);
        } else if (Array.isArray(url)) {
            url.forEach(elem => {
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
                content: 'Tool for quick opening services like Github, Travis and etc. from local project directory.'
            },
            {
                header: 'Synopsis',
                content: '$ want <command> | --help'
            },
            {
                header: 'Command List',
                content: commandList
            }
        ];

        const usage = commandLineUsage(sections);
        console.log(usage);
    }
}

export default Executor;
