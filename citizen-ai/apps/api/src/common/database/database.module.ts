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
        await client.$connect()
        return client
      },
      inject: [ConfigService],
    },
  ],
  exports: [PRISMA_SERVICE],
})
export class DatabaseModule {}
