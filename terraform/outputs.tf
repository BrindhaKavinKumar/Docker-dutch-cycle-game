output "ec2_public_ip" {
  value = aws_instance.dutchgame.public_ip
}

output "ec2_public_dns" {
  value = aws_instance.dutchgame.public_dns
}

output "instance_id" {
  value = aws_instance.dutchgame.id
}

output "ssh_command" {
  value = "ssh ubuntu@${aws_instance.dutchgame.public_ip}"
}