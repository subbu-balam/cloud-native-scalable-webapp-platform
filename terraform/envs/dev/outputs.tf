output "vpc_id" {
  value = aws_vpc.taskflow_vpc.id
}

output "subnet_id" {
  value = aws_subnet.public_subnet.id
}

output "security_group_id" {
  value = aws_security_group.taskflow_sg.id
}