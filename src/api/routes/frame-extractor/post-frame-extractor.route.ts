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
import { FrameExtractorControllerPort } from '@controllers/ports/frame-extractor.controller.port';

@Controller('v1/frame-extractor')
export class PostFrameExtractorRoute {
  constructor(
    @Inject('FrameExtractorControllerPort')
    private _frameExtractorController: FrameExtractorControllerPort,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async execute(
    @Body() input: PostFrameExtractorDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this._frameExtractorController.execute(input, file);
  }
}
