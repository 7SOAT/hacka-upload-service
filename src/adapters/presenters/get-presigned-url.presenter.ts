import { GetPreSignedUrlControllerDto } from '@controllers/dtos/get-presigned-url.controller.dto';

export class GetPreSignedUrlPresenter {
  static toJson(videoData: GetPreSignedUrlControllerDto): object {
    return {
      preSignedUrl: videoData.preSignedUrl,
      videoId: videoData.videoId,
    };
  }
}
