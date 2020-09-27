import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from '../schemas/album.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private readonly albumModel: Model<Album>,
  ) {}

  async queryAlbums(query, projection): Promise<Album[]> {
    return this.albumModel.find(query, projection).exec();
  }

  async getAlbumsByUser(userId): Promise<Album[]> {
    const albums = await this.queryAlbums({ userId }, null);
    return albums;
  }

  async getAlbumById(userId, _id): Promise<Album> {
    const albums = await this.queryAlbums({ userId, _id }, null);
    return albums && albums.length > 0 ? albums[0] : null;
  }
}
