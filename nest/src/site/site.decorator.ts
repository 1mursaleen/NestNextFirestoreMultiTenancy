/**
 * Subdomain decorator
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Subdomain = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // Extract the first subdomain
    const subdomain = request.subdomains[0];

    return subdomain;
  },
);

export const Host = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.host;
  },
);
