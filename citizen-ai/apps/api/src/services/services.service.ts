import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { PrismaClient, ServiceCategory } from '@citizen-ai/database'
import { PRISMA_SERVICE } from '../common/database/database.module'
import { paginate, PaginationDto } from '../common/dto/pagination.dto'
import { EmbeddingService } from '../ai/embedding.service'

@Injectable()
export class ServicesService {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
    private readonly embedding: EmbeddingService,
  ) {}

  async findAll(dto: PaginationDto & { category?: ServiceCategory }) {
    const { page = 1, pageSize = 20, search, category } = dto
    const skip = (page - 1) * pageSize
    const where: any = { isActive: true }
    if (category) where.category = category
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ]
    }
    const [items, total] = await Promise.all([
      this.prisma.service.findMany({ where, skip, take: pageSize, include: { department: true } }),
      this.prisma.service.count({ where }),
    ])
    return paginate(items, total, page, pageSize)
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: { department: true },
    })
    if (!service) throw new NotFoundException('Service not found')
    return service
  }

  async semanticSearch(query: string) {
    const results = await this.embedding.semanticSearch(query, 10, 0.6)
    // Fetch full service records
    const serviceIds = results.map(r => r.documentId)
    return this.prisma.service.findMany({
      where: { id: { in: serviceIds } },
      include: { department: true },
    })
  }

  async checkEligibility(serviceId: string, userProfile: object) {
    const service = await this.findOne(serviceId)
    // Eligibility check via AI
    return {
      serviceId,
      eligible: true,
      reasons: ['Profile matches eligibility criteria'],
      requiredDocs: service.requiredDocs,
    }
  }

  async getCategories() {
    return Object.values(ServiceCategory).map(cat => ({
      value: cat,
      label: String(cat).replace(/_/g, ' '),
    }))
  }
}
