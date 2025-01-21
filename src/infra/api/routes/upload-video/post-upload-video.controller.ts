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
import { UploadVideoController } from 'src/adapters/controllers/upload-video.controller';
import { SendMessageToQueueUseCase } from 'src/application/use-cases/send-message-to-queue.usecase';
import { PersistVideoDataUseCase } from 'src/application/use-cases/persist-video-data.usecase';
import { UploadVideoUseCasePort } from 'src/application/ports/upload-video.usecase.port';

@Controller('v1/upload-video')
export class PostUploadVideoController {
  private _uploadVideoController: UploadVideoController;
  private _sendMessageToQueueUseCase: SendMessageToQueueUseCase;
  private _persistVideoDataUseCase: PersistVideoDataUseCase;

  constructor(@Inject() private _uploadVideoUseCase: UploadVideoUseCasePort) {
    this._uploadVideoController = new UploadVideoController(
      this._uploadVideoUseCase,
      this._sendMessageToQueueUseCase,
      this._persistVideoDataUseCase,
    );
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async execute(
    @Body() input: PostFrameExtractorDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this._uploadVideoController.execute(file);
  }
}
