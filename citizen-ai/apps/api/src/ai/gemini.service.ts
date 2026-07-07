import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GoogleGenerativeAI, GenerativeModel, GenerationConfig } from '@google/generative-ai'

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name)
  private readonly genAI: GoogleGenerativeAI
  private readonly model: GenerativeModel
  private readonly embeddingModel: GenerativeModel

  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.getOrThrow<string>('GEMINI_API_KEY')
    this.genAI = new GoogleGenerativeAI(apiKey)
    this.model = this.genAI.getGenerativeModel({
      model: this.config.get<string>('GEMINI_MODEL', 'gemini-2.0-flash'),
    })
    this.embeddingModel = this.genAI.getGenerativeModel({
      model: this.config.get<string>('GEMINI_EMBEDDING_MODEL', 'text-embedding-004'),
    })
  }

  async generateContent(prompt: string, systemPrompt?: string): Promise<string> {
    try {
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        systemInstruction: systemPrompt,
        generationConfig: {
          maxOutputTokens: 4096,
          temperature: 0.7,
          topP: 0.95,
        } as GenerationConfig,
      })
      return result.response.text()
    } catch (error) {
      this.logger.error('Gemini generation failed', error)
      throw error
    }
  }

  async generateStream(prompt: string, systemPrompt?: string) {
    const result = await this.model.generateContentStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      systemInstruction: systemPrompt,
    })
    return result.stream
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const result = await this.embeddingModel.embedContent(text)
    return result.embedding.values
  }

  async generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
    const promises = texts.map(text => this.generateEmbedding(text))
    return Promise.all(promises)
  }

  async chat(
    messages: Array<{ role: 'user' | 'model'; content: string }>,
    systemPrompt?: string,
  ): Promise<string> {
    const chat = this.model.startChat({
      history: messages.slice(0, -1).map(m => ({
        role: m.role,
        parts: [{ text: m.content }],
      })),
      systemInstruction: systemPrompt,
    })
    const lastMessage = messages[messages.length - 1]
    const result = await chat.sendMessage(lastMessage.content)
    return result.response.text()
  }

  async analyzeImage(imageBase64: string, mimeType: string, prompt: string): Promise<string> {
    const result = await this.model.generateContent([
      { inlineData: { data: imageBase64, mimeType } },
      prompt,
    ])
    return result.response.text()
  }
}
