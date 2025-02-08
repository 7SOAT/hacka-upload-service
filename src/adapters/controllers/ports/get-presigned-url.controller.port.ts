import { GetPreSignedUrlControllerOutputDto } from 'src/adapters/controllers/dtos/get-presigned-url.controller.dto';

export interface GetPreSignedUrlControllerPort {
  execute(fileName: string): Promise<GetPreSignedUrlControllerOutputDto>;
}
