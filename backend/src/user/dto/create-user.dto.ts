import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  notes?: string[];
}
