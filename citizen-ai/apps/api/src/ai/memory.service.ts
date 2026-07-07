import { Injectable, Inject } from '@nestjs/common'
import { PrismaClient } from '@citizen-ai/database'
import { PRISMA_SERVICE } from '../common/database/database.module'

@Injectable()
export class MemoryService {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient) {}

  async setMemory(userId: string, key: string, value: string, context?: string) {
    return this.prisma.aIMemory.upsert({
      where: { userId_key: { userId, key } },
      create: { userId, key, value, context },
      update: { value, context, updatedAt: new Date() },
    })
  }

  async getMemory(userId: string, key: string) {
    return this.prisma.aIMemory.findUnique({ where: { userId_key: { userId, key } } })
  }

  async getUserContext(userId: string): Promise<string> {
    const memories = await this.prisma.aIMemory.findMany({
      where: { userId, OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] },
      orderBy: { weight: 'desc' },
      take: 20,
    })

    if (memories.length === 0) return ''

    return `User context: ${memories.map(m => `${m.key}: ${m.value}`).join(', ')}`
  }
}
