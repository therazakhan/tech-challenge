import {
    Controller,
    Get,
    Request,
    Param,
    UseGuards,
    InternalServerErrorException,
  } from '@nestjs/common';
  
  import { PhotoService } from './photo.service';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  
  @Controller('photos')
  export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async getPhotos(@Request() req) {
      try {
        const { _id: userId } = req.user;
        const photos = await this.photoService.getPhotosByUser(userId);
        return photos;
      } catch {
        throw new InternalServerErrorException();
      }
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':photoId')
    async getPhoto(@Request() req, @Param('photoId') photoId) {
      try {
        const { _id: userId } = req.user;
        const photo = await this.photoService.getPhotoById(userId, photoId);
        return photo;
      } catch {
        throw new InternalServerErrorException();
      }
    }
  }
  