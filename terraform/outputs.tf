output "public_ip" {
  value = aws_instance.worldops_server.public_ip
}

output "elastic_ip" {
  description = "Elastic IP de WorldOps"
  value       = aws_eip.worldops_eip.public_ip
}