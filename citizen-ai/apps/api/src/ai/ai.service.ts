import { Injectable, Inject } from '@nestjs/common'
import { PrismaClient } from '@citizen-ai/database'
import { PRISMA_SERVICE } from '../common/database/database.module'
import { RagService } from './rag.service'
import { GeminiService } from './gemini.service'
import { MemoryService } from './memory.service'

@Injectable()
export class AiService {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
    private readonly rag: RagService,
    private readonly gemini: GeminiService,
    private readonly memory: MemoryService,
  ) {}

  async chat(userId: string, conversationId: string, message: string) {
    // Get or create conversation
    let conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { messages: { orderBy: { createdAt: 'asc' }, take: 20 } },
    })

    if (!conversation) {
      conversation = await this.prisma.conversation.create({
        data: { userId, id: conversationId },
        include: { messages: true },
      })
    }

    // Save user message
    await this.prisma.message.create({
      data: { conversationId, role: 'USER', content: message },
    })

    // Build history for context
    const history = conversation.messages.map(m => ({
      role: m.role === 'USER' ? 'user' as const : 'model' as const,
      content: m.content,
    }))

    // User context from memory
    const userContext = await this.memory.getUserContext(userId)
    const enrichedQuery = userContext ? `${message}\n\n[User Context: ${userContext}]` : message

    // RAG query
    const { response, sources } = await this.rag.query(enrichedQuery, history)

    // Save assistant response
    const assistantMessage = await this.prisma.message.create({
      data: {
        conversationId,
        role: 'ASSISTANT',
        content: response,
        sources: sources as any,
        confidence: sources.length > 0 ? sources[0].similarity / 100 : 0.8,
      },
    })

    // Update conversation title if first message
    if (conversation.messages.length === 0) {
      const title = message.length > 60 ? message.substring(0, 60) + '...' : message
      await this.prisma.conversation.update({ where: { id: conversationId }, data: { title } })
    }

    return { message: assistantMessage, sources }
  }

  async getConversations(userId: string) {
    return this.prisma.conversation.findMany({
      where: { userId, isActive: true },
      include: { messages: { take: 1, orderBy: { createdAt: 'desc' } } },
      orderBy: { updatedAt: 'desc' },
    })
  }

  async getConversation(conversationId: string, userId: string) {
    return this.prisma.conversation.findFirst({
      where: { id: conversationId, userId },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    })
  }

  async getSchemeRecommendations(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    })

    const userContext = await this.memory.getUserContext(userId)
    const prompt = `Based on this citizen profile, recommend the top 5 most relevant government schemes:
Profile: ${JSON.stringify(user?.profile || {})}
Context: ${userContext}

Return a JSON array of scheme recommendations with: name, description, eligibility, benefits, applicationUrl, matchScore (0-100)`

    const response = await this.gemini.generateContent(prompt)
    try {
      const jsonMatch = response.match(/\[[\s\S]*\]/)
      return jsonMatch ? JSON.parse(jsonMatch[0]) : []
    } catch {
      return []
    }
  }

  async draftComplaint(description: string, category?: string): Promise<string> {
    const prompt = `Draft a formal complaint for government submission based on this input:
"${description}"
Category: ${category || 'General'}

Write a clear, formal complaint in 2-3 paragraphs covering:
1. Issue description
2. Impact and urgency
3. Requested action

Keep it professional and factual.`
    return this.gemini.generateContent(prompt)
  }

  async simplifyPolicy(policyText: string): Promise<string> {
    const prompt = `Explain this government policy in simple, everyday language that any citizen can understand:

${policyText}

Provide:
1. What this means for citizens (2-3 sentences)
2. Key benefits as bullet points
3. Who is eligible
4. How to apply (if applicable)`
    return this.gemini.generateContent(prompt)
  }
}
