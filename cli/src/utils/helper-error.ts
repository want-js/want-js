class HelperError extends Error {
    public type: string;

    constructor(message?: string) {
        super(message);
        this.type = 'HelperError';
    }
}

export default HelperError;
