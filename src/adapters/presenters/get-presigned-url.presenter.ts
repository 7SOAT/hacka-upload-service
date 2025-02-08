import { GetPreSignedUrlControllerOutputDto } from 'src/adapters/controllers/dtos/get-presigned-url.controller.dto';

export class GetPreSignedUrlPresenter {
  static toJson(videoData: GetPreSignedUrlControllerOutputDto): object {
    return {
      preSignedUrl: videoData.preSignedUrl,
      videoId: videoData.videoId,
    };
  }
}
