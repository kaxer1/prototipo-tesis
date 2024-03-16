terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.0"
    }
  }
}

provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "docker-desktop"
}


# Usar el contexto minikube

# # # # # # # # # # # # # # # # # # Verificar los Pods:
# Listar todos los Pods en el clúster:
# kubectl get pods --all-namespaces

# Listar los Pods en un Namespace específico:
# kubectl get pods -n <nombre-del-namespace>

# Detalles de un Pod específico:
# kubectl describe pod <nombre-del-pod> -n <nombre-del-namespace>

# Ver los registros de un Pod específico:
# kubectl logs <nombre-del-pod> -n <nombre-del-namespace>

# # # # # # # # # # # # # # # # # #  Verificar las Rutas y Servicios:
# Listar los Servicios en un Namespace específico:
# kubectl get services -n <nombre-del-namespace>

# Describir un Servicio específico:
# kubectl describe service <nombre-del-servicio> -n <nombre-del-namespace>

# Listar los Endpoints asociados a un Servicio:
# kubectl get endpoints <nombre-del-servicio> -n <nombre-del-namespace>

# Listar todas las Rutas (Ingress):
# kubectl get ingress -n <nombre-del-namespace>

# Describir una Ruta (Ingress) específica:
# kubectl describe ingress <nombre-del-ingress> -n <nombre-del-namespace>


# PARA RESTABLECER EL POD
# kubectl -n <namespace> scale deploy <pod> --replicas=0
# kubectl -n prototipodev scale deployment ai-assistants-ng --replicas=0
