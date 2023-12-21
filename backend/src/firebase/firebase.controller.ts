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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiParam,
} from '@nestjs/swagger';

/**
 * Service for handling file uploads and retrievals with Firebase Storage.
 */
@ApiTags('Firebase Storage')
@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * Uploads a file to Firebase Storage.
   *
   * @param {any} file - The file to be uploaded. Should contain properties like originalname and mimetype.
   * @returns {Promise<any>} A promise that resolves to an object containing details about the uploaded file,
   * including its download URL.
   * @throws Will throw an error if the upload fails.
   */
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('filename', {
      storage: memoryStorage(),
    }),
  )
  @ApiOperation({
    summary: 'Upload file',
    description: 'Uploads a file to Firebase Storage.',
  })
  @ApiResponse({ status: 200, description: 'File uploaded successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiConsumes('multipart/form-data')
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

  /**
   * Retrieves the download URL of a file stored in Firebase Storage.
   *
   * @param {string} filename - The name of the file in Firebase Storage.
   * @returns {Promise<string>} A promise that resolves to the file's download URL.
   * @throws Will throw an error if retrieving the URL fails.
   */
  @Get(':type/:filename')
  @ApiOperation({
    summary: 'Get file URL',
    description:
      'Retrieves the download URL of a file stored in Firebase Storage.',
  })
  @ApiResponse({ status: 200, description: 'File URL retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'File not found.' })
  @ApiParam({
    name: 'type',
    type: 'string',
    description: 'The type of the file (e.g., gifs).',
  })
  @ApiParam({
    name: 'filename',
    type: 'string',
    description: 'The name of the file to retrieve.',
  })
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
