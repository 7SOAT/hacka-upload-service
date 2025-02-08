import { randomUUID } from 'crypto';
import { GetPreSignedUrlGateway } from 'src/adapters/gateways/get-presigned-url.gateway';
import { GetPreSignedUrlUseCasePort } from '@application/ports/get-presigned-url.usecase';
import { GetPreSignedUrlUseCaseDto } from '../dtos/get-presigned-url.usecase.dto';

export class GetPreSignedUrlUseCase implements GetPreSignedUrlUseCasePort {
  constructor(private _repository: GetPreSignedUrlGateway) {}

  async execute(): Promise<GetPreSignedUrlUseCaseDto> {
    const userId: string = randomUUID();
    const videoId: string = randomUUID();

    const s3Key: string = `${userId}/${videoId}`;
    const preSignedUrl: string = await this._repository.execute(s3Key);

    return {
      videoId,
      preSignedUrl,
    };
  }
}
