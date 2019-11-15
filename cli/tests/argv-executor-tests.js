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
const ava_1 = __importDefault(require("ava"));
const proxyquire_1 = __importDefault(require("proxyquire"));
const config = {
    commands: ['a', 'b', 'abba', 'bucket', 'c'],
    aliases: {
        abba: 'a',
        bucket: 'b',
    },
    commandParams: {
        a: {
            executor: 'user/a.js',
            summary: 'Open a.',
            aliases: ['abba'],
        },
        b: {
            executor: 'user/b.js',
            summary: 'Open b.',
            aliases: ['bucket'],
        },
        c: {
            executor: 'user/c.js',
            summary: 'Open c.',
        },
    },
};
function getFunc(letter) {
    const func = () => `https://yandex.ru/${letter}`;
    func['@runtimeGlobal'] = true;
    func['@noCallThru'] = true;
    return func;
}
function getCommandLine(args) {
    return () => ({
        command: args.command,
        argv: args.argv,
    });
}
ava_1.default('Check arg adding in properties', (t) => {
    const ArgvExecutor = proxyquire_1.default('../src/executor', {
        'command-line-commands': getCommandLine({
            command: 'a',
        }),
    });
    const argvExecutor = new ArgvExecutor(config);
    t.is(argvExecutor.command, 'a');
    t.falsy(argvExecutor.argv);
});
ava_1.default('Check lookup method', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const originalConsoleLog = console.log;
    console.log = (url) => {
        t.is(url, 'https://yandex.ru/a');
    };
    const ArgvExecutor = proxyquire_1.default('../src/executor', {
        'command-line-commands': getCommandLine({
            command: 'a',
        }),
        'user/a.js': getFunc('a'),
        'user/b.js': getFunc('b'),
        'user/c.js': getFunc('c'),
        opn: (url) => {
            console.log(url);
        },
    });
    const argvExecutor = new ArgvExecutor(config);
    yield argvExecutor.exec();
    console.log = originalConsoleLog;
}));
ava_1.default('Check help', (t) => {
    const originalConsoleLog = console.log;
    console.log = (help) => {
        t.true(/a, abba/.test(help), 'Error with a');
        t.true(/b, bucket/.test(help), 'Error with b');
        t.true(/c/.test(help), 'Error with c');
    };
    const ArgvExecutor = proxyquire_1.default('../src/executor', {
        'command-line-commands': getCommandLine({}),
    });
    const argvExecutor = new ArgvExecutor(config);
    argvExecutor.printHelp();
    console.log = originalConsoleLog;
});
ava_1.default('Check help', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const originalConsoleLog = console.log;
    console.log = (help) => {
        t.true(/a, abba/.test(help), 'Error with a');
        t.true(/b, bucket/.test(help), 'Error with b');
        t.true(/c/.test(help), 'Error with c');
        console.log = originalConsoleLog;
    };
    const ArgvExecutor = proxyquire_1.default('../src/executor', {
        'command-line-commands': getCommandLine({
            argv: ['-h'],
        }),
    });
    const argvExecutor = new ArgvExecutor(config);
    yield argvExecutor.exec();
}));
//# sourceMappingURL=argv-executor-tests.js.map