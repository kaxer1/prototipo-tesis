# resource "kubernetes_deployment" "ai_terraform" {
#   metadata {
#     name      = var.ai_terraform_tf
#     namespace = kubernetes_namespace.prototipo.metadata[0].name
#     labels    = {
#       "gf.service" = var.ai_terraform_tf
#     }
#   }

#   spec {
#     replicas = 1

#     selector {
#       match_labels = {
#         "gf.service" = var.ai_terraform_tf
#       }
#     }

#     template {
#       metadata {
#         labels = {
#           "gf.service" = var.ai_terraform_tf
#         }
#       }

#       spec {
#         container {
#           name              = var.ai_terraform_tf
#           image             = var.imagenes_docker["ai_terraform"]
#           image_pull_policy = "Always"
#           port {
#             container_port = 5000
#           }

#           env {
#             name  = "TZ"
#             value = var.TZ
#           }

#         }

#         restart_policy = "Always"
#       }
#     }
#   }
#   depends_on = [kubernetes_namespace.prototipo]
# }
# resource "kubernetes_service" "ai_terraform" {
#   metadata {
#     name      = kubernetes_deployment.ai_terraform.metadata[0].name
#     namespace = kubernetes_namespace.prototipo.metadata[0].name

#     labels = {
#       "gf.service" = var.ai_terraform_tf
#     }
#   }

#   spec {
#     port {
#       name        = "5000"
#       port        = var.ai_terraform_web_port
#       target_port = "5000"
#     }

#     selector = {
#       "gf.service" = var.ai_terraform_tf
#     }
#     type = "LoadBalancer"
#   }
#   depends_on = [kubernetes_deployment.ai_terraform]
# }

