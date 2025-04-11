"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBefore = isBefore;
const common_1 = require("@nestjs/common");
function isBefore(time1, time2, message) {
    if (!(new Date(`1970-01-01T${time1}Z`) < new Date(`1970-01-01T${time2}Z`))) {
        throw new common_1.BadRequestException(message);
    }
}
//# sourceMappingURL=is-before.js.map