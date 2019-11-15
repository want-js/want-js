#!/usr/bin/env node
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
const config_1 = require("./config");
const executor_1 = __importDefault(require("./executor"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    let executor;
    const config = yield config_1.getConfig();
    const logError = (e) => {
        if (e.type === 'HelperError') {
            console.error('\x1b[31m', e.message);
        }
        else {
            console.error('\x1b[31m', e);
        }
        if (executor && executor.printHelp) {
            executor.printHelp();
        }
    };
    try {
        executor = new executor_1.default(config);
        yield executor.exec();
    }
    catch (e) {
        logError(e);
    }
}))();
process.addListener('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection:');
    console.error('Reason:', reason);
    console.error('Promise:', promise);
});
//# sourceMappingURL=index.js.map