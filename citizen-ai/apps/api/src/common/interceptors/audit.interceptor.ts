import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private reflector?: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest()
    const { method } = req
    const auditMethods = ['POST', 'PUT', 'PATCH', 'DELETE']

    return next.handle().pipe(
      tap(async () => {
        if (auditMethods.includes(method) && req.user) {
          // Audit logging is handled per-service for granular control
        }
      }),
    )
  }
}
