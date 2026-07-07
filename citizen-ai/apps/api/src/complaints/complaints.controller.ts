import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { ComplaintsService } from './complaints.service'
import { CreateComplaintDto } from './dto/create-complaint.dto'
import { UpdateComplaintDto } from './dto/update-complaint.dto'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { RolesGuard } from '../common/guards/roles.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { PaginationDto } from '../common/dto/pagination.dto'

@ApiTags('complaints')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly service: ComplaintsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new complaint' })
  create(@CurrentUser() user: any, @Body() dto: CreateComplaintDto) {
    return this.service.create(user.id, dto)
  }

  @Get()
  @ApiOperation({ summary: 'List complaints' })
  findAll(@CurrentUser() user: any, @Query() query: any) {
    return this.service.findAll(user.id, user.role, query)
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get complaint statistics' })
  getStats(@CurrentUser() user: any) {
    return this.service.getStats(user.role === 'CITIZEN' ? user.id : undefined)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get complaint details' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findOne(id, user.id, user.role)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update complaint status (officer/admin)' })
  update(@Param('id') id: string, @CurrentUser() user: any, @Body() dto: UpdateComplaintDto) {
    return this.service.update(id, user.id, user.role, dto)
  }
}
