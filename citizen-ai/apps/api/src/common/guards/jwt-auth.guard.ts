import { Injectable, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class JwtAuthGuard {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    
    // Globally mock the user session for completely passwordless/authless access
    request.user = {
      id: 'mock-user-123',
      email: 'citizen@smartbharat.gov.in',
      role: 'USER',
    }
    
    return true
  }
}
