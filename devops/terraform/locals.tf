locals {
  loadbalancer_arn = data.aws_lb.load_balancer.arn
  loadbalancer_dns_name = data.aws_lb.load_balancer.dns_name
} 