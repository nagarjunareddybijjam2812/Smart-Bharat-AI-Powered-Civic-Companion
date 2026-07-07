import { Injectable, Logger, Inject } from '@nestjs/common'
import { PrismaClient } from '@citizen-ai/database'
import { PRISMA_SERVICE } from '../common/database/database.module'
import { GeminiService } from './gemini.service'

@Injectable()
export class EmbeddingService {
  private readonly logger = new Logger(EmbeddingService.name)

  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
    private readonly gemini: GeminiService,
  ) {}

  async embedAndStoreChunk(documentId: string, content: string, chunkIndex: number, metadata?: object) {
    try {
      const vector = await this.gemini.generateEmbedding(content)
      const vectorString = `[${vector.join(',')}]`

      await this.prisma.$executeRaw`
        UPDATE knowledge_chunks
        SET "embeddingVector" = ${vectorString}::vector
        WHERE id = (
          SELECT id FROM knowledge_chunks
          WHERE "documentId" = ${documentId}
          AND "chunkIndex" = ${chunkIndex}
          LIMIT 1
        )
      `
    } catch (error) {
      this.logger.error(`Failed to embed chunk ${chunkIndex} for doc ${documentId}`, error)
    }
  }

  async semanticSearch(query: string, limit = 5, threshold = 0.7): Promise<Array<{
    id: string; content: string; documentId: string; similarity: number; metadata: unknown
  }>> {
    const queryVector = await this.gemini.generateEmbedding(query)
    const vectorString = `[${queryVector.join(',')}]`

    const results = await this.prisma.$queryRaw<Array<{
      id: string; content: string; documentId: string; similarity: number; metadata: unknown
    }>>`
      SELECT
        id, content, "documentId", metadata,
        1 - ("embeddingVector" <=> ${vectorString}::vector) AS similarity
      FROM knowledge_chunks
      WHERE 1 - ("embeddingVector" <=> ${vectorString}::vector) > ${threshold}
      ORDER BY similarity DESC
      LIMIT ${limit}
    `
    return results
  }
}
