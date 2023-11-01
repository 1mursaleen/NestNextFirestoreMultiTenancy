// dynamicCors.middleware.ts

import { NextFunction, Request, Response } from 'express';

import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DynamicCorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Get the request origin from the 'referer' header
    const requestOrigin = req.header('referer');

    console.log('requestOriginrequestOriginrequestOrigin', requestOrigin);

    // Check if the request origin is allowed
    if (isAllowedOrigin(requestOrigin)) {
      res.header('Access-Control-Allow-Origin', requestOrigin);
      res.header(
        'Access-Control-Allow-Methods',
        'GET, HEAD, PUT, PATCH, POST, DELETE',
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      res.header('Access-Control-Allow-Credentials', 'true');

      if (req.method === 'OPTIONS') {
        // Handle preflight requests
        res.status(204).end();
      } else {
        next();
      }
    } else {
      // Handle disallowed origin
      res.status(403).end();
    }
  }
}

// Implement your own logic to check if the request origin is allowed
function isAllowedOrigin(origin: string): boolean {
  return true;
  // You can implement your own logic here, e.g., check against a list of allowed origins
  // Return true if the origin is allowed, otherwise return false
  return origin === 'https://s1.nest.test'; // Replace with your allowed domain
}
