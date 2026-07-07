import { Controller, Get, Post, Param, Query, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { ServicesService } from './services.service'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { Public } from '../common/decorators/public.decorator'
import { PaginationDto } from '../common/dto/pagination.dto'

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly service: ServicesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List all government services' })
  findAll(@Query() query: any) { return this.service.findAll(query) }

  @Public()
  @Get('categories')
  @ApiOperation({ summary: 'Get all service categories' })
  getCategories() { return this.service.getCategories() }

  @Public()
  @Get('search')
  @ApiOperation({ summary: 'Semantic search for services' })
  search(@Query('q') query: string) { return this.service.semanticSearch(query) }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get service details' })
  findOne(@Param('id') id: string) { return this.service.findOne(id) }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':id/eligibility')
  @ApiOperation({ summary: 'Check eligibility for a service' })
  checkEligibility(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.checkEligibility(id, user.profile || {})
  }
}
