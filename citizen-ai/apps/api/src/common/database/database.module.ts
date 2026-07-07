import { Module, Global } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PrismaClient } from '@citizen-ai/database'

export const PRISMA_SERVICE = 'PRISMA_SERVICE'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useFactory: async (config: ConfigService) => {
        const client = new PrismaClient({
          log: config.get('NODE_ENV') === 'development' ? ['error', 'warn'] : ['error'],
        })
        try {
          await client.$connect()
        } catch (error) {
          console.error('⚠️ Database connection failed. Ensure DATABASE_URL is correct.')
        }
        return client
      },
      inject: [ConfigService],
    },
  ],
  exports: [PRISMA_SERVICE],
})
export class DatabaseModule {}
