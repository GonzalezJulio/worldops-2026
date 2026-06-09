resource "aws_instance" "worldops_server" {
  ami           = "ami-0fbcf351e82d18381"
  instance_type = "t3.small"

  key_name = aws_key_pair.worldops.key_name

  vpc_security_group_ids = [
    aws_security_group.worldops_sg.id
  ]

  associate_public_ip_address = true


  user_data = file("${path.module}/scripts/user_data.sh")

  tags = {
    Name = "worldops-2026"
  }
}