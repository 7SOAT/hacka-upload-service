import { GetPreSignedUrlControllerPort } from 'src/adapters/controllers/ports/get-presigned-url.controller.port';
import { GetPreSignedUrlUseCasePort } from 'src/application/ports/get-presigned-url.usecase';
import { GetPreSignedUrlControllerOutputDto } from './dtos/get-presigned-url.controller.dto';

export class GetPreSignedUrlController
  implements GetPreSignedUrlControllerPort
{
  constructor(private _useCase: GetPreSignedUrlUseCasePort) {}

  async execute(
    fileName: string,
    userId: string,
  ): Promise<GetPreSignedUrlControllerOutputDto> {
    return await this._useCase.execute(fileName, userId);
  }
}
