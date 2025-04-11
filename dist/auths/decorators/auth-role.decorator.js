"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoles = void 0;
const common_1 = require("@nestjs/common");
const AuthRoles = (...roles) => (0, common_1.SetMetadata)('auth-roles', roles);
exports.AuthRoles = AuthRoles;
//# sourceMappingURL=auth-role.decorator.js.map