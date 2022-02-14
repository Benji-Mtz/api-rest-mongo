import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  IsArray,
} from 'class-validator';

// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Title of the movie` })
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1900)
  @ApiProperty({ description: `Year of release` })
  readonly year: number;

  @ApiProperty({ description: `Movie actors` })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly cast: string[];

  @ApiProperty({ description: `Gender of movie` })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly genres: string[];
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

export class FilterMovieDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(1900)
  minYear: number;

  @ValidateIf((params) => params.minYear)
  @IsPositive()
  maxYear: number;
}
