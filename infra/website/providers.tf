provider "aws" {
  region = "eu-south-2"

  allowed_account_ids = ["656022989959"]

  default_tags {
    tags = {
      Project    = "personal-portfolio"
      ManagedBy  = "Terraform"
      Repository = "personal-portfolio"
    }
  }
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  allowed_account_ids = ["656022989959"]

  default_tags {
    tags = {
      Project    = "personal-portfolio"
      ManagedBy  = "Terraform"
      Repository = "personal-portfolio"
    }
  }
}

