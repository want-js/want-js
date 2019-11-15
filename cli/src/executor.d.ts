declare class Executor {
    private readonly command;
    private readonly argv;
    private readonly config;
    constructor(config: any);
    exec(): Promise<void>;
    private execCommand;
    private open;
    private execArgv;
    printHelp(): void;
}
export default Executor;
