import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateMovieDto,
  FilterMovieDto,
  UpdateMovieDto,
} from '../dtos/movies.dtos';
import { MoviesService } from '../services/movies.service';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

@ApiTags('Movies')
@Controller('movies')
@UseInterceptors(CacheInterceptor)
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'List of all movies' })
  getProducts(@Query() params: FilterMovieDto) {
    return this.movieService.findAll(params);
  }

  @Get(':id')
  // @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.movieService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateMovieDto) {
    return this.movieService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateMovieDto,
  ) {
    return this.movieService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.movieService.remove(id);
  }
}
