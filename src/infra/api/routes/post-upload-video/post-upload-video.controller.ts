import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostFrameExtractorDTO } from './dto/post-frame-extractor.dto';
import { UploadVideoControllerPort } from 'src/adapters/controllers/ports/upload-video.controller.port';

@Controller('v1/upload-video')
export class PostUploadVideoRoute {
  constructor(
    @Inject('UploadVideoControllerPort')
    private _uploadVideoController: UploadVideoControllerPort,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async execute(
    @Body() input: PostFrameExtractorDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this._uploadVideoController.execute(file);
  }
}
