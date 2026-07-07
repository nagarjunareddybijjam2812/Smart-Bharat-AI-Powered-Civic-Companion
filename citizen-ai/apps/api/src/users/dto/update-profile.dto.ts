import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, IsDateString, IsEnum } from 'class-validator'
import { Gender } from '@citizen-ai/database'

export class UpdateProfileDto {
  @ApiPropertyOptional() @IsOptional() @IsString() firstName?: string
  @ApiPropertyOptional() @IsOptional() @IsString() lastName?: string
  @ApiPropertyOptional() @IsOptional() @IsDateString() dateOfBirth?: string
  @ApiPropertyOptional({ enum: Gender }) @IsOptional() @IsEnum(Gender) gender?: Gender
  @ApiPropertyOptional() @IsOptional() @IsString() address?: string
  @ApiPropertyOptional() @IsOptional() @IsString() city?: string
  @ApiPropertyOptional() @IsOptional() @IsString() state?: string
  @ApiPropertyOptional() @IsOptional() @IsString() pincode?: string
  @ApiPropertyOptional() @IsOptional() @IsString() preferredLanguage?: string
  @ApiPropertyOptional() @IsOptional() @IsString() avatarUrl?: string
}
