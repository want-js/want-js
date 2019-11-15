class HelperError extends Error {
    public type: string;

    constructor(message) {
        super(message);
        this.type = 'HelperError';
    }
}

export default HelperError;
