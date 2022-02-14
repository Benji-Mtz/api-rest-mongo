import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  CreateMovieDto,
  FilterMovieDto,
  UpdateMovieDto,
} from '../dtos/movies.dtos';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  findAll(params?: FilterMovieDto) {
    if (params) {
      const filters: FilterQuery<Movie> = {};
      const sortby: any = {};
      const { limit, offset, minYear, maxYear, title, order } = params;
      let orden_default = 1;

      if (minYear && maxYear) {
        filters.year = { $gte: minYear, $lte: maxYear };
        if (order) {
          orden_default = order;
          sortby.year = orden_default;
        } else {
          sortby.year = orden_default;
        }
      }
      if (title) {
        filters.title = { $regex: title, $options: 'i' };
        if (order) {
          orden_default = order;
          sortby.title = orden_default;
        } else {
          sortby.title = orden_default;
        }
      }
      console.log(sortby);
      return this.movieModel
        .find(filters)
        .skip(offset)
        .limit(limit)
        .sort(sortby)
        .exec();
    }
    return this.movieModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.movieModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    }
    return product;
  }

  create(payload: CreateMovieDto) {
    const newProduct = new this.movieModel(payload);
    return newProduct.save();
  }

  update(id: string, payload: UpdateMovieDto) {
    const product = this.movieModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (!product) {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    }
    return product;
  }

  remove(id: string) {
    return this.movieModel.findByIdAndDelete(id);
  }
}
