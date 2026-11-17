output "website_bucket_name" {
  description = "Private S3 bucket containing the Astro website."
  value       = aws_s3_bucket.website.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution identifier."
  value       = aws_cloudfront_distribution.website.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain."
  value       = aws_cloudfront_distribution.website.domain_name
}

output "website_url" {
  description = "Public URL of the portfolio."
  value       = "https://${aws_cloudfront_distribution.website.domain_name}"
}
