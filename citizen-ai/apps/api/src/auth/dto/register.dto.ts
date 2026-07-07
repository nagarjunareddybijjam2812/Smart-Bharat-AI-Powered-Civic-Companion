import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, MinLength, IsPhoneNumber } from 'class-validator'

export class RegisterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password!: string

  @ApiProperty()
  @IsString()
  firstName!: string

  @ApiProperty()
  @IsString()
  lastName!: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  language?: string
}
