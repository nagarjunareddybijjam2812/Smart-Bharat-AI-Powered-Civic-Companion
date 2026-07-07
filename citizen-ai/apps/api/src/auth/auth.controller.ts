import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user and sync with Firebase' })
  async me(@CurrentUser() firebaseUser: any) {
    // Sync the user with our database
    const dbUser = await this.authService.syncFirebaseUser(firebaseUser);
    
    // Remove sensitive fields if any (passwordHash was removed from DB)
    return dbUser;
  }
}
