resource "aws_key_pair" "worldops" {
  key_name   = "worldops-2026"
  public_key = file("/home/juliodev/.ssh/worldops-2026.pub")
}