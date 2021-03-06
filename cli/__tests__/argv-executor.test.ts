// import test from 'ava';
// import proxyquire from 'proxyquire';
//
// const config = {
//     commands: ['a', 'b', 'abba', 'bucket', 'c'],
//     aliases: {
//         abba: 'a',
//         bucket: 'b',
//     },
//     commandParams: {
//         a: {
//             executor: 'user/a.js',
//             summary: 'Open a.',
//             aliases: ['abba'],
//         },
//         b: {
//             executor: 'user/b.js',
//             summary: 'Open b.',
//             aliases: ['bucket'],
//         },
//         c: {
//             executor: 'user/c.js',
//             summary: 'Open c.',
//         },
//     },
// };
//
// function getFunc(letter) {
//     const func = () => `https://yandex.ru/${letter}`;
//
//     func['@runtimeGlobal'] = true;
//     func['@noCallThru'] = true;
//
//     return func;
// }
//
// function getCommandLine(args) {
//     return () => ({
//         command: args.command,
//         argv: args.argv,
//     });
// }
//
// test('Check arg adding in properties', (t) => {
//     const ArgvExecutor = proxyquire('../src/executor', {
//         'command-line-commands': getCommandLine({
//             command: 'a',
//         }),
//     });
//
//     const argvExecutor = new ArgvExecutor(config);
//
//     t.is(argvExecutor.command, 'a');
//     t.falsy(argvExecutor.argv);
// });
//
// test('Check lookup method', async (t) => {
//     const originalConsoleLog = console.log;
//     console.log = (url) => {
//         t.is(url, 'https://yandex.ru/a');
//     };
//
//     const ArgvExecutor = proxyquire('../src/executor', {
//         'command-line-commands': getCommandLine({
//             command: 'a',
//         }),
//         'user/a.js': getFunc('a'),
//         'user/b.js': getFunc('b'),
//         'user/c.js': getFunc('c'),
//         opn: (url) => {
//             console.log(url);
//         },
//     });
//
//     const argvExecutor = new ArgvExecutor(config);
//     await argvExecutor.exec();
//     console.log = originalConsoleLog;
// });
//
// test('Check help', (t) => {
//     const originalConsoleLog = console.log;
//
//     console.log = (help) => {
//         t.true(/a, abba/.test(help), 'Error with a');
//         t.true(/b, bucket/.test(help), 'Error with b');
//         t.true(/c/.test(help), 'Error with c');
//     };
//
//     const ArgvExecutor = proxyquire('../src/executor', {
//         'command-line-commands': getCommandLine({}),
//     });
//
//     const argvExecutor = new ArgvExecutor(config);
//     argvExecutor.printHelp();
//     console.log = originalConsoleLog;
// });
//
// test('Check help', async (t) => {
//     const originalConsoleLog = console.log;
//
//     console.log = (help) => {
//         t.true(/a, abba/.test(help), 'Error with a');
//         t.true(/b, bucket/.test(help), 'Error with b');
//         t.true(/c/.test(help), 'Error with c');
//         console.log = originalConsoleLog;
//     };
//
//     const ArgvExecutor = proxyquire('../src/executor', {
//         'command-line-commands': getCommandLine({
//             argv: ['-h'],
//         }),
//     });
//
//     const argvExecutor = new ArgvExecutor(config);
//     await argvExecutor.exec();
// });
