resource "aws_acm_certificate" "website" {
  provider = aws.us_east_1

  domain_name = "alejandroriera.dev"

  subject_alternative_names = [
    "www.alejandroriera.dev"
  ]

  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "personal-portfolio-certificate"
  }
}

resource "aws_route53_record" "acm_validation" {
  for_each = toset([
    "alejandroriera.dev",
    "www.alejandroriera.dev"
  ])

  zone_id = data.aws_route53_zone.website.zone_id

  name = one([
    for dvo in aws_acm_certificate.website.domain_validation_options :
    dvo.resource_record_name
    if dvo.domain_name == each.key
  ])

  type = one([
    for dvo in aws_acm_certificate.website.domain_validation_options :
    dvo.resource_record_type
    if dvo.domain_name == each.key
  ])

  records = [
    one([
      for dvo in aws_acm_certificate.website.domain_validation_options :
      dvo.resource_record_value
      if dvo.domain_name == each.key
    ])
  ]

  ttl = 60
}

resource "aws_acm_certificate_validation" "website" {
  provider = aws.us_east_1

  certificate_arn = aws_acm_certificate.website.arn

  validation_record_fqdns = [
    for record in aws_route53_record.acm_validation :
    record.fqdn
  ]
}
