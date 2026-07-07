import { NestFactory } from '@nestjs/core'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { AuditInterceptor } from './common/interceptors/audit.interceptor'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import * as admin from 'firebase-admin'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
    cors: false,
  })

  const configService = app.get(ConfigService)
  const port = configService.get<number>('API_PORT', 4000)
  const nodeEnv = configService.get<string>('NODE_ENV', 'development')

  // Initialize Firebase Admin
  const firebaseProjectId = configService.get<string>('FIREBASE_PROJECT_ID')
  const firebaseClientEmail = configService.get<string>('FIREBASE_CLIENT_EMAIL')
  const firebasePrivateKey = configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n')

  if (firebaseProjectId && firebaseClientEmail && firebasePrivateKey) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: firebaseProjectId,
          clientEmail: firebaseClientEmail,
          privateKey: firebasePrivateKey,
        }),
      })
      console.log('🔥 Firebase Admin initialized')
    } catch (error) {
      console.warn('⚠️ Firebase Admin initialization failed (Invalid credentials)')
    }
  } else {
    console.warn('⚠️ Firebase Admin credentials missing')
  }

  // Security
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: nodeEnv === 'production',
  }))
  app.use(compression())
  app.use(cookieParser())

  // CORS
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGINS', 'http://localhost:3000').split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'X-CSRF-Token'],
  })

  // Versioning
  app.enableVersioning({ type: VersioningType.URI })
  app.setGlobalPrefix('api/v1')

  // Global pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }))

  // Global filters
  app.useGlobalFilters(new HttpExceptionFilter())

  // Global interceptors
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new LoggingInterceptor(),
    new AuditInterceptor(),
  )

  // Swagger (non-production)
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('CitizenAI API')
      .setDescription('Production-grade AI-powered civic platform API')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('auth', 'Authentication endpoints')
      .addTag('users', 'User management')
      .addTag('services', 'Government services')
      .addTag('applications', 'Service applications')
      .addTag('complaints', 'Complaint management')
      .addTag('documents', 'Document management')
      .addTag('ai', 'AI assistant and RAG')
      .addTag('notifications', 'Push notifications')
      .addTag('maps', 'Maps and locations')
      .addTag('admin', 'Admin operations')
      .addTag('officer', 'Officer portal')
      .addTag('health', 'System health')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    })
  }

  await app.listen(port)
  console.log(`🚀 CitizenAI API running on http://localhost:${port}`)
  console.log(`📖 Swagger docs: http://localhost:${port}/api/docs`)
}

bootstrap()
