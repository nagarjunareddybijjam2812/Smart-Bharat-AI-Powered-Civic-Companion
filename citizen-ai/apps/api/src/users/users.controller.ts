import { Controller, Get, Patch, Body, UseGuards, Param, Query, Post } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { RolesGuard } from '../common/guards/roles.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { Roles } from '../common/decorators/roles.decorator'
import { PaginationDto } from '../common/dto/pagination.dto'
import { UserRole } from '@citizen-ai/database'

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getMe(@CurrentUser('id') userId: string) {
    return this.usersService.findById(userId)
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  updateMe(@CurrentUser('id') userId: string, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(userId, dto)
  }

  @Get('me/activity')
  @ApiOperation({ summary: 'Get user activity log' })
  getActivity(@CurrentUser('id') userId: string, @Query() query: PaginationDto) {
    return this.usersService.getActivityLog(userId, query.page, query.pageSize)
  }

  @Get('me/saved-services')
  @ApiOperation({ summary: 'Get saved services' })
  getSavedServices(@CurrentUser('id') userId: string) {
    return this.usersService.getSavedServices(userId)
  }

  @Post('me/saved-services/:serviceId')
  @ApiOperation({ summary: 'Toggle save/unsave service' })
  toggleSave(@CurrentUser('id') userId: string, @Param('serviceId') serviceId: string) {
    return this.usersService.toggleSaveService(userId, serviceId)
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'List all users (admin only)' })
  findAll(@Query() query: PaginationDto) {
    return this.usersService.findAll(query)
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.OFFICER)
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id)
  }
}
