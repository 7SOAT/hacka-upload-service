import { Controller, Get, Inject } from '@nestjs/common';
import { GetPreSignedUrlControllerPort } from 'src/adapters/controllers/ports/create-presigned-url.controller.port';

@Controller('v1/presigned-url')
export class GetPreSignedUrlRoute {
  constructor(
    @Inject('GetPreSignedUrlControllerPort')
    private _controller: GetPreSignedUrlControllerPort,
  ) {}

  @Get()
  async execute() {
    return this._controller.execute();
  }
}
