import { Injectable, Logger } from '@nestjs/common'
import { GeminiService } from './gemini.service'

@Injectable()
export class OcrService {
  private readonly logger = new Logger(OcrService.name)

  constructor(private readonly gemini: GeminiService) {}

  async extractTextFromImage(imageBase64: string, mimeType: string): Promise<{
    text: string
    documentType: string
    fields: Record<string, string>
    confidence: number
  }> {
    const prompt = `You are an expert OCR system for Indian government documents.
    
Analyze this document image and extract:
1. All text content
2. Document type (Aadhaar, PAN, Passport, Driving License, etc.)
3. Key fields (name, date of birth, document number, address, etc.)

Respond in JSON format:
{
  "text": "full extracted text",
  "documentType": "document type",
  "fields": {
    "name": "...",
    "documentNumber": "...",
    "dateOfBirth": "...",
    "address": "...",
    "issuedBy": "..."
  },
  "confidence": 0.0-1.0
}`

    try {
      const response = await this.gemini.analyzeImage(imageBase64, mimeType, prompt)
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    } catch (error) {
      this.logger.error('OCR failed', error)
    }

    return { text: '', documentType: 'UNKNOWN', fields: {}, confidence: 0 }
  }

  async verifyDocument(imageBase64: string, mimeType: string, expectedType: string): Promise<{
    isValid: boolean
    confidence: number
    issues: string[]
    extractedData: Record<string, string>
  }> {
    const prompt = `Verify if this document is a valid ${expectedType} document.
Check for:
- Document authenticity indicators
- Correct format and layout
- Visible tampering or modifications
- Required security features

Respond in JSON:
{
  "isValid": boolean,
  "confidence": 0.0-1.0,
  "issues": ["issue1", "issue2"],
  "extractedData": { key-value pairs of extracted information }
}`

    const response = await this.gemini.analyzeImage(imageBase64, mimeType, prompt)
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) return JSON.parse(jsonMatch[0])
    return { isValid: false, confidence: 0, issues: ['Could not analyze document'], extractedData: {} }
  }
}
