import { GetPreSignedUrlControllerPort } from 'src/adapters/controllers/ports/create-presigned-url.controller.port';
import { GetPreSignedUrlUseCasePort } from 'src/application/ports/get-presigned-url.usecase';

export class GetPreSignedUrlController
  implements GetPreSignedUrlControllerPort
{
  constructor(private _useCase: GetPreSignedUrlUseCasePort) {}

  execute(): Promise<string> {
    return this._useCase.execute();
  }
}
