import { SetMetadata } from '@nestjs/common';

export const NO_AUTH_KEY = Symbol('NO_AUTH');
export const NoAuth = () => SetMetadata(NO_AUTH_KEY, true);