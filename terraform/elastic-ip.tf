resource "aws_eip" "worldops_eip" {
  domain = "vpc"



  tags = {
    Name = "worldops-eip"
  }
}

resource "aws_eip_association" "worldops_eip_assoc" {
  instance_id   = aws_instance.worldops_server.id
  allocation_id = aws_eip.worldops_eip.id
}