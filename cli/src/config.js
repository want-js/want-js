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
const lodash_keys_1 = __importDefault(require("lodash.keys"));
const config_lookuper_1 = __importDefault(require("config-lookuper"));
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default('want:cli:config');
const CONFIG_NAME = '.want-js.config.js';
const PLUGIN_PREFIX = 'want-js-plugin.';
const getLookuperConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    const lookuper = new config_lookuper_1.default(CONFIG_NAME);
    const lookuperConfig = (yield lookuper
        .lookup(process.cwd())
        .lookupNPM(process.cwd(), PLUGIN_PREFIX)
        .lookupGlobalModules(PLUGIN_PREFIX));
    debug('Lookup: %O', lookuperConfig);
    return lookuperConfig.resultConfig;
});
exports.getConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    const config = yield getLookuperConfig();
    config.commands = lodash_keys_1.default(config.commandParams);
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
});
//# sourceMappingURL=config.js.map