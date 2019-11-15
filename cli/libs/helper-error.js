"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelperError extends Error {
    constructor(message) {
        super(message);
        this.type = 'HelperError';
    }
}
exports.default = HelperError;
//# sourceMappingURL=helper-error.js.map