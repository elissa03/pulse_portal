import {
  Controller,
  Post,
  Get,
  Param,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FirebaseService } from './firebase.service';
import { memoryStorage } from 'multer';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('filename', {
      storage: memoryStorage(),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const result = await this.firebaseService.uploadFileToStorage(file);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  @Get(':type/:filename')
  async getFile(
    @Param('type') type: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    try {
      const directory = type === 'gifs' ? 'gifs' : null;
      const downloadURL = await this.firebaseService.getFileDownloadURL(
        `${directory}/${filename}`,
      );
      res.status(200).json({ downloadURL });
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
}
