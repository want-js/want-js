import keys from 'lodash.keys';
// @ts-ignore
import Lookuper from 'config-lookuper';
import debugUtil from 'debug';
import {IConfig} from "./executor";

const debug = debugUtil('want:cli:config');
const CONFIG_NAME = '.want-js.config.js';
const PLUGIN_PREFIX = 'want-js-plugin.';

const getLookuperConfig = async () => {
    const lookuper = new Lookuper(CONFIG_NAME);

    const lookuperConfig = (await lookuper
        .lookup(process.cwd())
        .lookupNPM(process.cwd(), PLUGIN_PREFIX)
        .lookupGlobalModules(PLUGIN_PREFIX));

    debug('Lookup: %O', lookuperConfig);

    return lookuperConfig.resultConfig;
};

export const getConfig = async () => {
    const config: IConfig = await getLookuperConfig();

    config.commands = keys(config.commandParams);
    config.aliases = {};

    const aliases = config.commands.map((command) => {
        const currentAliases = config.commandParams[command].aliases;

        currentAliases.forEach((alias) => {
            config.aliases[alias] = command;
        });

        return currentAliases;
    });

    config.commands = Array.prototype.concat.apply(config.commands, aliases);

    return config;
};
