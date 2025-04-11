"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBetweenTime = isBetweenTime;
const common_1 = require("@nestjs/common");
function isBetweenTime(startTime, endTime, openTime, closeTime, message) {
    const start = new Date(`1970-01-01T${startTime}Z`).valueOf();
    const end = new Date(`1970-01-01T${endTime}Z`).valueOf();
    const open = new Date(`1970-01-01T${openTime}Z`).valueOf();
    const close = new Date(`1970-01-01T${closeTime}Z`).valueOf();
    if (!(open <= start && end <= close)) {
        throw new common_1.BadRequestException(message);
    }
}
//# sourceMappingURL=is-between-time.js.map