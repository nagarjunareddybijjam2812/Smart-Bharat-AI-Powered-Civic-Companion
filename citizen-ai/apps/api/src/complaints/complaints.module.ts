import { Module } from '@nestjs/common'
import { ComplaintsController } from './complaints.controller'
import { ComplaintsService } from './complaints.service'
import { ComplaintsGateway } from './complaints.gateway'
import { NotificationsModule } from '../notifications/notifications.module'

@Module({
  imports: [NotificationsModule],
  controllers: [ComplaintsController],
  providers: [ComplaintsService, ComplaintsGateway],
  exports: [ComplaintsService],
})
export class ComplaintsModule {}
