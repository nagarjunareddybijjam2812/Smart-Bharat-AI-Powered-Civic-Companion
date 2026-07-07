import { Injectable, NotFoundException, ForbiddenException, Inject } from '@nestjs/common'
import { PrismaClient, ComplaintStatus, ComplaintPriority, UserRole } from '@citizen-ai/database'
import { PRISMA_SERVICE } from '../common/database/database.module'
import { CreateComplaintDto } from './dto/create-complaint.dto'
import { UpdateComplaintDto } from './dto/update-complaint.dto'
import { paginate, PaginationDto } from '../common/dto/pagination.dto'

@Injectable()
export class ComplaintsService {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient) {}

  async create(userId: string, dto: CreateComplaintDto) {
    const complaint = await this.prisma.complaint.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        category: dto.category,
        subCategory: dto.subCategory,
        priority: dto.priority || ComplaintPriority.MEDIUM,
        latitude: dto.latitude,
        longitude: dto.longitude,
        address: dto.address,
        departmentId: dto.departmentId,
        isAnonymous: dto.isAnonymous || false,
        updates: {
          create: {
            status: ComplaintStatus.OPEN,
            message: 'Complaint submitted successfully',
            updatedBy: userId,
          },
        },
      },
      include: { department: true, updates: true, media: true },
    })

    await this.prisma.activityLog.create({
      data: { userId, action: 'COMPLAINT_SUBMITTED', entity: 'Complaint', entityId: complaint.id },
    })

    return complaint
  }

  async findAll(userId: string, userRole: UserRole, dto: PaginationDto & { status?: ComplaintStatus; category?: string }) {
    const { page = 1, pageSize = 20, search, status, category } = dto
    const skip = (page - 1) * pageSize

    const where: any = {}
    if (userRole === UserRole.CITIZEN) where.userId = userId
    if (userRole === UserRole.OFFICER) where.officerId = userId
    if (status) where.status = status
    if (category) where.category = category
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { complaintNo: { contains: search } },
      ]
    }

    const [items, total] = await Promise.all([
      this.prisma.complaint.findMany({
        where, skip, take: pageSize,
        include: { user: { include: { profile: true } }, department: true, updates: { take: 1, orderBy: { createdAt: 'desc' } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.complaint.count({ where }),
    ])

    return paginate(items, total, page, pageSize)
  }

  async findOne(id: string, userId: string, userRole: UserRole) {
    const complaint = await this.prisma.complaint.findUnique({
      where: { id },
      include: {
        user: { include: { profile: true } },
        department: true,
        officer: { include: { profile: true } },
        updates: { orderBy: { createdAt: 'asc' } },
        media: true,
      },
    })
    if (!complaint) throw new NotFoundException('Complaint not found')

    if (userRole === UserRole.CITIZEN && complaint.userId !== userId) {
      throw new ForbiddenException('Access denied')
    }
    return complaint
  }

  async update(id: string, userId: string, userRole: UserRole, dto: UpdateComplaintDto) {
    const complaint = await this.prisma.complaint.findUnique({ where: { id } })
    if (!complaint) throw new NotFoundException('Complaint not found')

    if (userRole === UserRole.CITIZEN) {
      if (complaint.userId !== userId) throw new ForbiddenException('Access denied')
      if (!['OPEN'].includes(complaint.status)) throw new ForbiddenException('Cannot update complaint in current status')
    }

    const updated = await this.prisma.complaint.update({
      where: { id },
      data: {
        status: dto.status,
        priority: dto.priority,
        officerId: dto.officerId,
        resolvedAt: dto.status === ComplaintStatus.RESOLVED ? new Date() : undefined,
        updates: dto.status ? {
          create: {
            status: dto.status,
            message: dto.remarks || `Status updated to ${dto.status}`,
            updatedBy: userId,
            isPublic: true,
          },
        } : undefined,
      },
      include: { updates: { orderBy: { createdAt: 'asc' } }, department: true },
    })
    return updated
  }

  async getStats(userId?: string, departmentId?: string) {
    const where: any = {}
    if (userId) where.userId = userId
    if (departmentId) where.departmentId = departmentId

    const [total, open, inProgress, resolved, escalated] = await Promise.all([
      this.prisma.complaint.count({ where }),
      this.prisma.complaint.count({ where: { ...where, status: ComplaintStatus.OPEN } }),
      this.prisma.complaint.count({ where: { ...where, status: ComplaintStatus.IN_PROGRESS } }),
      this.prisma.complaint.count({ where: { ...where, status: ComplaintStatus.RESOLVED } }),
      this.prisma.complaint.count({ where: { ...where, status: ComplaintStatus.ESCALATED } }),
    ])

    return { total, open, inProgress, resolved, escalated }
  }
}
