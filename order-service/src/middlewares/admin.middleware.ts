import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { STATUS } from 'src/commons/status.code';
import { ROLE_ENUM } from 'src/users/users.constant';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(STATUS.UNAUTHORIZED).json('you are not authenticate!');
    } else {
      jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
        if (err) {
          return res.status(STATUS.FORBIDDEN).json('token invalid!');
        } else {
          if (user['role'] !== ROLE_ENUM.ADMIN) {
            return res.status(STATUS.FORBIDDEN).json('you are not allwed!');
          }
          req.user = user;
          next();
        }
      });
    }
  }
}
