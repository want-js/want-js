#!/usr/bin/env node

import { getConfig } from './config';
import Executor from './executor';

(async () => {
    let executor;
    const config = await getConfig();

    const logError = (e) => {
        if (e.type === 'HelperError') {
            console.error('\x1b[31m', e.message);
        } else {
            console.error('\x1b[31m', e);
        }

        if (executor && executor.printHelp) {
            executor.printHelp();
        }
    };

    try {
        executor = new Executor(config);
        await executor.exec();
    } catch (e) {
        logError(e);
    }
})();

process.addListener('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection:');
    console.error('Reason:', reason);
    console.error('Promise:', promise);
});
