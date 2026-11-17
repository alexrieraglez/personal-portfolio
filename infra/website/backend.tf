terraform {
  backend "s3" {
    bucket       = "personal-portfolio-tfstate-656022989959"
    key          = "website/terraform.tfstate"
    region       = "eu-south-2"
    encrypt      = true
    use_lockfile = true
  }
}