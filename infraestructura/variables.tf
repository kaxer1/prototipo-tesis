variable "namespace" {
  description = "Namespace en el que implementar el clúster"
  type        = string
  default     = "prototipodev"
}

variable "imagenes_docker" {
  type        = map(any)
  description = "Imagen en docker y version"
  default = {
    "ai_assistants" = "lambo10/ai_assistants:prototipo-dev-0.0.0",
    "ai_terraform" = "hashicorp/terraform:latest"
  }
}

# NG
variable "ai_assistants_ng" {
  description = "Web Component"
  type        = string
  default     = "ai-assistants-ng"
}

# PORT NG
variable "ai_assistants_web_port" {
  description = "Plataforma AI Assistants Web Port"
  type        = number
  default     = 4230
}

# TIME ZONE
variable "TZ" {
  description = "Timezone"
  type        = string
  default     = "America/Guayaquil"
}

# Terraform
variable "ai_terraform_tf" {
  description = "Web Component"
  type        = string
  default     = "ai-terraform-tf"
}

# PORT NG
variable "ai_terraform_web_port" {
  description = "Plataforma AI Assistants Web Port"
  type        = number
  default     = 5000
}