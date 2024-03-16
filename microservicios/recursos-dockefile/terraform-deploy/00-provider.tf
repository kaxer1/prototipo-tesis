terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">=5.37.0"
    }
  }
  required_version = "~>1.5.0"
}

provider "aws" {
  region = "us-east-1"  # Cambia esto según tu región
  default_tags {
    tags = var.tags
  }
}

