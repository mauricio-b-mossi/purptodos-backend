import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

export class VerificationMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const password: string = req.body.password;
    const email: string = req.body.email;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (password.length < 6)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Password must have at least 6 characters',
        },
        HttpStatus.BAD_REQUEST,
      );

    // verify email
    if (email.match(mailFormat) == null)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid email address',
        },
        HttpStatus.BAD_REQUEST,
      );

    next();
  }
}
