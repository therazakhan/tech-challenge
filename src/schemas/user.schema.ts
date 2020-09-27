import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Album } from './album.schema';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  address: MongooseSchema.Types.Mixed;

  @Prop()
  phone: string;

  @Prop()
  website: string;

  @Prop()
  company: MongooseSchema.Types.Mixed;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Album' }])
  albums: Album;
}

export const UserSchema = SchemaFactory.createForClass(User);
