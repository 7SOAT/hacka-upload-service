import { GetPreSignedUrlUseCaseOutputDto } from '@application/dtos/get-presigned-url.usecase.dto';

export interface GetPreSignedUrlUseCasePort {
  execute(fileName: string): Promise<GetPreSignedUrlUseCaseOutputDto>;
}
