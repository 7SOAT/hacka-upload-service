import { Controller, Get, Inject, Query } from '@nestjs/common';
import { GetPreSignedUrlControllerPort } from 'src/adapters/controllers/ports/get-presigned-url.controller.port';
import { GetPreSignedUrlPresenter } from 'src/adapters/presenters/get-presigned-url.presenter';

@Controller('v1/presigned-url')
export class GetPreSignedUrlRoute {
  constructor(
    @Inject('GetPreSignedUrlControllerPort')
    private _controller: GetPreSignedUrlControllerPort,
  ) {}

  @Get()
  async execute(@Query('filename') fileName: string) {
    return GetPreSignedUrlPresenter.toJson(
      await this._controller.execute(fileName),
    );
  }
}
