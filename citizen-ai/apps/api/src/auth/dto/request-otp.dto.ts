import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsIn } from 'class-validator'

export class RequestOtpDto {
  @ApiProperty({ description: 'Email or phone number' })
  @IsString()
  identifier!: string

  @ApiProperty({ enum: ['login', 'signup', 'reset_password', 'verify_phone'] })
  @IsString()
  @IsIn(['login', 'signup', 'reset_password', 'verify_phone'])
  purpose!: string
}
