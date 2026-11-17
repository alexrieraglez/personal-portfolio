locals {
  project_name = "personal-portfolio"
  account_id   = "656022989959"

  website_bucket_name = "${local.project_name}-web-${local.account_id}"

  origin_id = "${local.project_name}-s3-origin"
}
