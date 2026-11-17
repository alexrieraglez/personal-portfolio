
output "terraform_state_bucket_name" {
  description = "S3 bucket used to store the website Terraform state."
  value       = aws_s3_bucket.terraform_state.id
}

output "terraform_state_bucket_arn" {
  description = "ARN of the Terraform state bucket."
  value       = aws_s3_bucket.terraform_state.arn
}

output "aws_region" {
  description = "AWS Region of the Terraform state bucket."
  value       = "eu-south-2"
}
