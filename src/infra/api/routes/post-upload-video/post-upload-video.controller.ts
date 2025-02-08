import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PostUploadVideoDTO } from './dtos/post-upload-video.dto';
import { UploadVideoControllerPort } from 'src/adapters/controllers/ports/upload-video.controller.port';

@Controller('v1/upload-video')
export class PostUploadVideoRoute {
  constructor(
    @Inject('UploadVideoControllerPort')
    private _uploadVideoController: UploadVideoControllerPort,
  ) {}

  @Post()
  async execute(@Body() input: PostUploadVideoDTO) {
    await this._uploadVideoController.execute(input);
  }
}
