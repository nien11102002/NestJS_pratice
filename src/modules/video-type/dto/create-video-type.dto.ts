import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVideoTypeDto {
  @IsString({ message: `Field type_name has to be string` })
  @ApiProperty({
    type: String,
    description: 'Has to be String',
    default: '',
  })
  type_name: string;

  @IsString()
  @ApiProperty()
  icon: string;
}
