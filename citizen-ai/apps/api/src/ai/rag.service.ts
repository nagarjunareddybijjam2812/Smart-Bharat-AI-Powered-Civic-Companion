import { Injectable, Logger } from '@nestjs/common'
import { EmbeddingService } from './embedding.service'
import { GeminiService } from './gemini.service'

const CITIZEN_AI_SYSTEM_PROMPT = `You are CitizenAI, an official AI assistant for the Government of India's digital services platform.

Your role:
- Help citizens understand and access government services
- Explain government schemes and their eligibility criteria
- Assist with complaint submission and tracking
- Provide information about required documents
- Guide citizens through application processes
- Answer questions about government policies in simple language

Guidelines:
- Always be respectful, clear, and helpful
- If you don't know something, say so honestly and suggest where to find the information
- Cite your sources when providing factual information
- Support all major Indian languages when requested
- Never give legal advice or make promises about application outcomes
- Keep responses concise but complete
- Use bullet points for lists to improve readability`

@Injectable()
export class RagService {
  private readonly logger = new Logger(RagService.name)

  constructor(
    private readonly embeddingService: EmbeddingService,
    private readonly gemini: GeminiService,
  ) {}

  async query(userQuery: string, conversationHistory: Array<{ role: 'user' | 'model'; content: string }> = []) {
    // 1. Semantic search for relevant context
    const relevantChunks = await this.embeddingService.semanticSearch(userQuery, 5, 0.65)

    // 2. Assemble context from retrieved chunks
    const context = relevantChunks.length > 0
      ? `\n\nRelevant Government Information:\n${relevantChunks.map((c, i) => `[Source ${i + 1}]: ${c.content}`).join('\n\n')}`
      : ''

    // 3. Build the augmented prompt
    const augmentedQuery = context
      ? `${userQuery}\n${context}\n\nBased on the above context and your knowledge, please answer the citizen's question accurately. Cite source numbers when using the provided context.`
      : userQuery

    // 4. Generate response with conversation history
    const messages = [
      ...conversationHistory,
      { role: 'user' as const, content: augmentedQuery },
    ]

    const response = await this.gemini.chat(messages, CITIZEN_AI_SYSTEM_PROMPT)

    // 5. Extract sources for citation
    const sources = relevantChunks.map((c, i) => ({
      index: i + 1,
      documentId: c.documentId,
      excerpt: c.content.substring(0, 150) + '...',
      similarity: Math.round(c.similarity * 100),
    }))

    return { response, sources, hasContext: relevantChunks.length > 0 }
  }

  async ingestDocument(title: string, content: string, documentId: string, category?: string) {
    // Chunk the document (500 token chunks with 50 token overlap)
    const chunks = this.chunkText(content, 1800, 200)
    this.logger.log(`Ingesting "${title}" → ${chunks.length} chunks`)

    for (let i = 0; i < chunks.length; i++) {
      await this.embeddingService.embedAndStoreChunk(documentId, chunks[i], i, { title, category })
    }

    return { chunksProcessed: chunks.length }
  }

  private chunkText(text: string, chunkSize: number, overlap: number): string[] {
    const chunks: string[] = []
    const sentences = text.split(/(?<=[.!?])\s+/)
    let current = ''

    for (const sentence of sentences) {
      if ((current + sentence).length > chunkSize && current.length > 0) {
        chunks.push(current.trim())
        // Overlap: keep last few sentences
        const words = current.split(' ')
        current = words.slice(-Math.floor(overlap / 5)).join(' ') + ' ' + sentence
      } else {
        current += (current ? ' ' : '') + sentence
      }
    }
    if (current.trim()) chunks.push(current.trim())
    return chunks
  }
}
