data "aws_route53_zone" "website" {
  zone_id      = "Z00912682XC578WP6QGWS"
  private_zone = false
}


# Root domain - IPv4
resource "aws_route53_record" "website_ipv4" {
  zone_id = data.aws_route53_zone.website.zone_id
  name    = "alejandroriera.dev"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

# Root domain - IPv6
resource "aws_route53_record" "website_ipv6" {
  zone_id = data.aws_route53_zone.website.zone_id
  name    = "alejandroriera.dev"
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

# WWW subdomain - IPv4
resource "aws_route53_record" "www_ipv4" {
  zone_id = data.aws_route53_zone.website.zone_id
  name    = "www.alejandroriera.dev"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

# WWW subdomain - IPv6
resource "aws_route53_record" "www_ipv6" {
  zone_id = data.aws_route53_zone.website.zone_id
  name    = "www.alejandroriera.dev"
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}
