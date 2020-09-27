import {
    Controller,
    Get,
    Request,
    Param,
    UseGuards,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { AlbumService } from './album.service';
  
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  
  @Controller('albums')
  export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAlbums(@Request() req) {
      try {
        const { _id: userId } = req.user;
        const albums = await this.albumService.getAlbumsByUser(userId);
        return albums;
      } catch {
        throw new InternalServerErrorException();
      }
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':albumId')
    async getAlbum(@Request() req, @Param('albumId') albumId) {
      try {
        const { _id: userId } = req.user;
        const album = await this.albumService.getAlbumById(userId, albumId);
        return album;
      } catch {
        throw new InternalServerErrorException();
      }
    }
  }
  