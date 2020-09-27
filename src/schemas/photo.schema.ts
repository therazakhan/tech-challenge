import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Album } from './album.schema';

@Schema()
export class Photo extends Document {
  @Prop()
  title: string;

  @Prop()
  url: string;

  @Prop()
  thumbnailUrl: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Album' })
  albumId: Album;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
