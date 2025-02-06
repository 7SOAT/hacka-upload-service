import { randomUUID } from 'crypto';
import { GetPreSignedUrlGateway } from 'src/adapters/gateways/get-presigned-url.gateway';
import { GetPreSignedUrlUseCasePort } from '@application/ports/get-presigned-url.usecase';

export class GetPreSignedUrlUseCase implements GetPreSignedUrlUseCasePort {
  constructor(private _repository: GetPreSignedUrlGateway) {}

  async execute(): Promise<string> {
    const userId: string = randomUUID();
    const videoId: string = randomUUID();

    const s3Key: string = `${userId}/${videoId}`;

    return await this._repository.execute(s3Key);
  }
}
