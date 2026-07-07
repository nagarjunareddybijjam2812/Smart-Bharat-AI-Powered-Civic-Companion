import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, UserRole } from '@citizen-ai/database';
import { PRISMA_SERVICE } from '../common/database/database.module';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
  ) {}

  async syncFirebaseUser(firebaseUser: any) {
    let user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: firebaseUser.email || undefined },
          { phone: firebaseUser.phone || undefined },
        ].filter(Boolean) as any, // Remove undefined filters
      },
      include: { profile: true },
    });

    if (!user) {
      // Create new user
      user = await this.prisma.user.create({
        data: {
          email: firebaseUser.email || null,
          phone: firebaseUser.phone || null,
          isEmailVerified: !!firebaseUser.email,
          isPhoneVerified: !!firebaseUser.phone,
          role: firebaseUser.role || UserRole.CITIZEN,
          lastLoginAt: new Date(),
          profile: {
            create: {
              firstName: 'Citizen',
              lastName: '',
            },
          },
        },
        include: { profile: true },
      });
    } else {
      // Update login time
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
        include: { profile: true },
      });
    }

    return user;
  }
}
