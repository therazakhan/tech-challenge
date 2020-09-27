import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Photo } from '../schemas/photo.schema';
import { AlbumService } from '../album/album.service';

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(Photo.name) private readonly photoModel: Model<Photo>,
    private readonly albumService: AlbumService,
  ) {}

  async queryPhotos(query, projection): Promise<Photo[]> {
    return this.photoModel.find(query, projection).exec();
  }

  async getPhotosByUser(userId): Promise<Photo[]> {
    const albumIds = [];
    const albums = await this.albumService.queryAlbums({ userId }, { _id: 1 });
    albums.map(album => albumIds.push(album._id));
    const photos = await this.queryPhotos({ albumId: { $in: albumIds } }, null);
    return photos;
  }

  async getPhotoById(userId, _id): Promise<Photo> {
    const photos = await this.queryPhotos({ _id }, null);
    if (photos && photos.length) {
      const { albumId: _id } = photos[0];
      const albums = await this.albumService.queryAlbums({ userId, _id }, null);
      return albums && albums.length > 0 ? photos[0] : null;
    }
    return null;
  }
}
