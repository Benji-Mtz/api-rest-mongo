// Importaciones para el schema de mongodb
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/*
@Schema()
export class Cast {
  @Prop()
  name: string;
}
const CastSchema = SchemaFactory.createForClass(Cast);

@Schema()
export class Genres {
  @Prop()
  name: string;
}
const GenresSchema = SchemaFactory.createForClass(Genres);
*/

@Schema()
export class Movie extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  year: number;

  @Prop()
  cast: string[];

  @Prop()
  genres: string[];
  // @Prop({ type: [CastSchema] })
  // cast: Cast[];

  // @Prop({ type: [GenresSchema] })
  // genres: Genres[];

}

export const MovieSchema = SchemaFactory.createForClass(Movie);
// ProductSchema.index({ price: 1, stock: -1 });
