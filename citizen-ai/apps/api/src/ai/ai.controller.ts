import { Controller, Post, Get, Body, Param, UseGuards, Res } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { Response } from 'express'
import { AiService } from './ai.service'
import { RagService } from './rag.service'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly ragService: RagService,
  ) {}

  @Post('chat/:conversationId')
  @ApiOperation({ summary: 'Send message to AI assistant' })
  chat(
    @CurrentUser('id') userId: string,
    @Param('conversationId') conversationId: string,
    @Body('message') message: string,
  ) {
    return this.aiService.chat(userId, conversationId, message)
  }

  @Get('conversations')
  @ApiOperation({ summary: 'Get user conversations' })
  getConversations(@CurrentUser('id') userId: string) {
    return this.aiService.getConversations(userId)
  }

  @Get('conversations/:id')
  @ApiOperation({ summary: 'Get a conversation with messages' })
  getConversation(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.aiService.getConversation(id, userId)
  }

  @Get('recommendations')
  @ApiOperation({ summary: 'Get personalized scheme recommendations' })
  getRecommendations(@CurrentUser('id') userId: string) {
    return this.aiService.getSchemeRecommendations(userId)
  }

  @Post('draft-complaint')
  @ApiOperation({ summary: 'AI-assisted complaint drafting' })
  draftComplaint(@Body() body: { description: string; category?: string }) {
    return this.aiService.draftComplaint(body.description, body.category)
  }

  @Post('simplify-policy')
  @ApiOperation({ summary: 'Simplify a government policy text' })
  simplifyPolicy(@Body('text') text: string) {
    return this.aiService.simplifyPolicy(text)
  }
}
