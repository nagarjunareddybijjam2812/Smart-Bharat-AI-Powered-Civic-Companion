import { Module } from '@nestjs/common'
import { AiController } from './ai.controller'
import { AiService } from './ai.service'
import { RagService } from './rag.service'
import { EmbeddingService } from './embedding.service'
import { GeminiService } from './gemini.service'
import { OcrService } from './ocr.service'
import { MemoryService } from './memory.service'

@Module({
  controllers: [AiController],
  providers: [AiService, RagService, EmbeddingService, GeminiService, OcrService, MemoryService],
  exports: [AiService, EmbeddingService, OcrService],
})
export class AiModule {}
