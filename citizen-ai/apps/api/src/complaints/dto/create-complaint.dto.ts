import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsOptional, IsEnum, IsBoolean, IsNumber } from 'class-validator'
import { ComplaintPriority } from '@citizen-ai/database'

export class CreateComplaintDto {
  @ApiProperty() @IsString() title!: string
  @ApiProperty() @IsString() description!: string
  @ApiProperty() @IsString() category!: string
  @ApiPropertyOptional() @IsOptional() @IsString() subCategory?: string
  @ApiPropertyOptional({ enum: ComplaintPriority }) @IsOptional() @IsEnum(ComplaintPriority) priority?: ComplaintPriority
  @ApiPropertyOptional() @IsOptional() @IsNumber() latitude?: number
  @ApiPropertyOptional() @IsOptional() @IsNumber() longitude?: number
  @ApiPropertyOptional() @IsOptional() @IsString() address?: string
  @ApiPropertyOptional() @IsOptional() @IsString() departmentId?: string
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isAnonymous?: boolean
}
