import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsEnum, IsString } from 'class-validator'
import { ComplaintStatus, ComplaintPriority } from '@citizen-ai/database'

export class UpdateComplaintDto {
  @ApiPropertyOptional({ enum: ComplaintStatus }) @IsOptional() @IsEnum(ComplaintStatus) status?: ComplaintStatus
  @ApiPropertyOptional({ enum: ComplaintPriority }) @IsOptional() @IsEnum(ComplaintPriority) priority?: ComplaintPriority
  @ApiPropertyOptional() @IsOptional() @IsString() officerId?: string
  @ApiPropertyOptional() @IsOptional() @IsString() remarks?: string
}
