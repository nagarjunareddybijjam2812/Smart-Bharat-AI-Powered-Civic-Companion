import { Injectable, NotFoundException, Inject } from '@nestjs/common'
import { PrismaClient } from '@citizen-ai/database'
import { PRISMA_SERVICE } from '../common/database/database.module'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { paginate, PaginationDto } from '../common/dto/pagination.dto'

@Injectable()
export class UsersService {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true, departmentOfficer: { include: { department: true } } },
    })
    if (!user) throw new NotFoundException('User not found')
    const { passwordHash, ...safe } = user as any
    return safe
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          update: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            dateOfBirth: dto.dateOfBirth,
            gender: dto.gender,
            address: dto.address,
            city: dto.city,
            state: dto.state,
            pincode: dto.pincode,
            preferredLanguage: dto.preferredLanguage,
          },
        },
      },
      include: { profile: true },
    })
    const { passwordHash, ...safe } = user as any
    return safe
  }

  async findAll(dto: PaginationDto) {
    const { page = 1, pageSize = 20, search } = dto
    const skip = (page - 1) * pageSize

    const where = search ? {
      OR: [
        { email: { contains: search, mode: 'insensitive' as const } },
        { phone: { contains: search } },
        { profile: { firstName: { contains: search, mode: 'insensitive' as const } } },
      ],
    } : {}

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: pageSize,
        include: { profile: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ])

    const safeUsers = users.map(({ passwordHash, ...u }: any) => u)
    return paginate(safeUsers, total, page, pageSize)
  }

  async getActivityLog(userId: string, page = 1, pageSize = 20) {
    const skip = (page - 1) * pageSize
    const [items, total] = await Promise.all([
      this.prisma.activityLog.findMany({
        where: { userId },
        skip, take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.activityLog.count({ where: { userId } }),
    ])
    return paginate(items, total, page, pageSize)
  }

  async getSavedServices(userId: string) {
    return this.prisma.savedService.findMany({
      where: { userId },
      include: { service: { include: { department: true } } },
    })
  }

  async toggleSaveService(userId: string, serviceId: string) {
    const existing = await this.prisma.savedService.findUnique({
      where: { userId_serviceId: { userId, serviceId } },
    })
    if (existing) {
      await this.prisma.savedService.delete({ where: { userId_serviceId: { userId, serviceId } } })
      return { saved: false }
    } else {
      await this.prisma.savedService.create({ data: { userId, serviceId } })
      return { saved: true }
    }
  }
}
