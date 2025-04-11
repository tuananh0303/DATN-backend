import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AdminGuard } from './admin.guard';
import { OwnerGuard } from './owner.guard';
import { PlayerGuard } from './player.guard';
import { Reflector } from '@nestjs/core';
export declare class AuthRoleGuard implements CanActivate {
    private readonly adminGuard;
    private readonly ownerGuard;
    private readonly playerGuard;
    private readonly reflector;
    private static readonly defaultRole;
    private get roleGuardMap();
    constructor(adminGuard: AdminGuard, ownerGuard: OwnerGuard, playerGuard: PlayerGuard, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
