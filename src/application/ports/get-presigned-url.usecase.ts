import { GetPreSignedUrlUseCaseDto } from '@application/dtos/get-presigned-url.usecase.dto';

export interface GetPreSignedUrlUseCasePort {
  execute(): Promise<GetPreSignedUrlUseCaseDto>;
}
