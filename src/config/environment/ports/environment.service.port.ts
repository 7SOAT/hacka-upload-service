export interface EnvironmentServicePort {
  get awsEndpoint(): string;
  get awsRegion(): string;
  get awsAccessKeyId(): string;
  get awsSecretAccessKey(): string;
  get awsSessionToken(): string;
  get frameExtractorQueueUrl(): string;
  get frameExtractorS3Bucket(): string;
}
