import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  isActived?: boolean;

  @IsBoolean()
  @IsOptional()
  isArchived?: boolean;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];
}
