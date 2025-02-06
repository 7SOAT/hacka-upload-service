data "aws_lb" "load_balancer" {
  tags = {
    "kubernetes.io/service-name" = "default/hacka-video-uploader-svc"
  }
}