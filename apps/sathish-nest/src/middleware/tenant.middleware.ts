import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request & { tenant: string }, res: Response, next: NextFunction) {
    const tenant = req.originalUrl.split('/')[1];
    if (tenant) {
      req.tenant = tenant;
      req.url = req.originalUrl.replace(`/${tenant}`, ''); // rewrite url
    }
    next();
  }
}