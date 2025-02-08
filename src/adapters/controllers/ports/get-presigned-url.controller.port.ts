import { GetPreSignedUrlControllerDto } from '@adapters/controllers/dtos/get-presigned-url.controller.dto';

export interface GetPreSignedUrlControllerPort {
  execute(): Promise<GetPreSignedUrlControllerDto>;
}
