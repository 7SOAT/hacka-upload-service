import { GetPreSignedUrlControllerPort } from 'src/adapters/controllers/ports/get-presigned-url.controller.port';
import { GetPreSignedUrlUseCasePort } from 'src/application/ports/get-presigned-url.usecase';
import { GetPreSignedUrlControllerDto } from './dtos/get-presigned-url.controller.dto';

export class GetPreSignedUrlController
  implements GetPreSignedUrlControllerPort
{
  constructor(private _useCase: GetPreSignedUrlUseCasePort) {}

  async execute(): Promise<GetPreSignedUrlControllerDto> {
    return await this._useCase.execute();
  }
}
