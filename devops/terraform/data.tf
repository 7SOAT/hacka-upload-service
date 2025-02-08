data "aws_api_gateway_rest_api" "backend" {
  name = "backend-apigw"
}

data "aws_lb" "load_balancer" {
  tags = {
    "kubernetes.io/service-name" = "default/hacka-video-uploader-svc"
  }
}