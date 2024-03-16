resource "kubernetes_deployment" "ai_assistants" {
  metadata {
    name      = var.ai_assistants_ng
    namespace = kubernetes_namespace.prototipo.metadata[0].name
    labels    = {
      "gf.service" = var.ai_assistants_ng
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        "gf.service" = var.ai_assistants_ng
      }
    }

    template {
      metadata {
        labels = {
          "gf.service" = var.ai_assistants_ng
        }
      }

      spec {
        container {
          name              = var.ai_assistants_ng
          image             = var.imagenes_docker["ai_assistants"]
          image_pull_policy = "Always"
          port {
            container_port = 4230
          }

          env {
            name  = "TZ"
            value = var.TZ
          }

        }

        restart_policy = "Always"
      }
    }
  }
  depends_on = [kubernetes_namespace.prototipo]
}
resource "kubernetes_service" "ai_assistants" {
  metadata {
    name      = kubernetes_deployment.ai_assistants.metadata[0].name
    namespace = kubernetes_namespace.prototipo.metadata[0].name

    labels = {
      "gf.service" = var.ai_assistants_ng
    }
  }

  spec {
    port {
      name        = "4230"
      port        = var.ai_assistants_web_port
      target_port = "4230"
    }

    selector = {
      "gf.service" = var.ai_assistants_ng
    }
    type = "LoadBalancer"
  }
  depends_on = [kubernetes_deployment.ai_assistants]
}