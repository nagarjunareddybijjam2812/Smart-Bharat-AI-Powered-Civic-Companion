import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class VerifyOtpDto {
  @ApiProperty()
  @IsString()
  identifier!: string

  @ApiProperty({ minLength: 6, maxLength: 6 })
  @IsString()
  @Length(6, 6)
  otp!: string

  @ApiProperty()
  @IsString()
  purpose!: string
}
