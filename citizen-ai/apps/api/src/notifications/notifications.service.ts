import { Injectable, Inject } from '@nestjs/common'
import { PrismaClient, NotificationType, NotificationChannel } from '@citizen-ai/database'
import { PRISMA_SERVICE } from '../common/database/database.module'

@Injectable()
export class NotificationsService {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient) {}

  async create(userId: string, type: NotificationType, title: string, body: string, data?: object) {
    return this.prisma.notification.create({
      data: { userId, type, title, body, data: data as any, channel: NotificationChannel.IN_APP },
    })
  }

  async findAll(userId: string, page = 1, pageSize = 20) {
    const skip = (page - 1) * pageSize
    const [items, total, unread] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId },
        skip, take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.notification.count({ where: { userId } }),
      this.prisma.notification.count({ where: { userId, isRead: false } }),
    ])
    return { items, total, unread, page, pageSize }
  }

  async markAsRead(userId: string, notificationId?: string) {
    const where: any = { userId, isRead: false }
    if (notificationId) where.id = notificationId
    await this.prisma.notification.updateMany({ where, data: { isRead: true, readAt: new Date() } })
    return { success: true }
  }
}
