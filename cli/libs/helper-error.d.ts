declare class HelperError extends Error {
    type: string;
    constructor(message: any);
}
export default HelperError;
