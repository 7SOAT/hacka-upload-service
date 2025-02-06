export interface GetPreSignedUrlGateway {
  execute(s3Key: string): Promise<string>;
}
