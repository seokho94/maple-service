import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../decorators/roles/roles.enum';
import { NO_AUTH_KEY } from '../decorators/no-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const noAuth = this.reflector.getAllAndOverride<boolean>(NO_AUTH_KEY, [
			context.getHandler(),
			context.getClass()
		]);

		if (noAuth) {
			return true;
		}

		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!requiredRoles) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		return requiredRoles.some((role) => user.role?.includes(role));
	}
}