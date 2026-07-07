import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class LoginDto {
  @ApiProperty({ description: 'Email or phone number' })
  @IsString()
  identifier!: string

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password!: string
}
