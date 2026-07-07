import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { ScheduleModule } from '@nestjs/schedule'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { DepartmentsModule } from './departments/departments.module'
import { ServicesModule } from './services/services.module'
import { ApplicationsModule } from './applications/applications.module'
import { ComplaintsModule } from './complaints/complaints.module'
import { DocumentsModule } from './documents/documents.module'
import { NotificationsModule } from './notifications/notifications.module'
import { AiModule } from './ai/ai.module'
import { MapsModule } from './maps/maps.module'
import { AnalyticsModule } from './analytics/analytics.module'
import { FeedbackModule } from './feedback/feedback.module'
import { AdminModule } from './admin/admin.module'
import { OfficerModule } from './officer/officer.module'
import { HealthModule } from './health/health.module'
import { DatabaseModule } from './common/database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('THROTTLE_TTL', 60) * 1000,
          limit: config.get<number>('THROTTLE_LIMIT', 100),
        },
      ],
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UsersModule,
    DepartmentsModule,
    ServicesModule,
    ApplicationsModule,
    ComplaintsModule,
    DocumentsModule,
    NotificationsModule,
    AiModule,
    MapsModule,
    AnalyticsModule,
    FeedbackModule,
    AdminModule,
    OfficerModule,
    HealthModule,
  ],
})
export class AppModule {}
