resource "aws_cloudfront_origin_access_control" "website" {
  name        = "${local.project_name}-oac"
  description = "Origin Access Control for personal portfolio"

  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_function" "rewrite_uri" {
  name    = "${local.project_name}-url-rewrite"
  comment = "Rewrite Astro routes to index.html"
  runtime = "cloudfront-js-1.0"
  publish = true

  code = file("${path.module}/functions/rewrite-uri.js")
}

resource "aws_cloudfront_distribution" "website" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${local.project_name}-cdn"
  default_root_object = "index.html"

  http_version = "http2and3"
  price_class  = "PriceClass_All"

  origin {
    domain_name              = aws_s3_bucket.website.bucket_regional_domain_name
    origin_id                = local.origin_id
    origin_access_control_id = aws_cloudfront_origin_access_control.website.id
  }

  default_cache_behavior {
    target_origin_id       = local.origin_id
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    compress = true

    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.rewrite_uri.arn
    }
  }

  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 10
  }

  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 10
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Name = "${local.project_name}-cdn"
  }

  lifecycle {
    # AWS manages the WAF association for the CloudFront Free plan.
    ignore_changes = [web_acl_id]
  }
}
