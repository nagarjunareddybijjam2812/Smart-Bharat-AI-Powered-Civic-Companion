declare module 'passport-custom' {
  import { Strategy as PassportStrategy } from 'passport';
  import { Request } from 'express';

  interface VerifyCallback {
    (req: Request, done: (error: any, user?: any, info?: any) => void): void;
  }

  export class Strategy extends PassportStrategy {
    constructor(verify: VerifyCallback);
    constructor(options: any, verify: VerifyCallback);
  }
}
