import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Photo } from './photo.schema';

@Schema()
export class Album extends Document {
  @Prop()
  title: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Photo' }])
  photos: Photo;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
