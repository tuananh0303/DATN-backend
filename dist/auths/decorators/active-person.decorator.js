"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivePerson = void 0;
const common_1 = require("@nestjs/common");
exports.ActivePerson = (0, common_1.createParamDecorator)((field, context) => {
    const request = context
        .switchToHttp()
        .getRequest();
    const person = request['person'];
    return field ? person?.[field] : person;
});
//# sourceMappingURL=active-person.decorator.js.map