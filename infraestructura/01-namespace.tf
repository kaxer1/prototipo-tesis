resource "kubernetes_namespace" "prototipo" {
  metadata {
    name = var.namespace
  }
}