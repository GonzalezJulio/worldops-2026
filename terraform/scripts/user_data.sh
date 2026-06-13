#!/bin/bash
set -e

echo "BOOTSTRAP START $(date)" > /tmp/bootstrap-test.txt

exec > >(tee /var/log/worldops-bootstrap.log)
exec 2>&1

echo "===== ACTUALIZANDO SISTEMA ====="

apt update -y
apt upgrade -y

apt install -y curl git unzip

echo "===== INSTALANDO DOCKER ====="

curl -fsSL https://get.docker.com | sh

usermod -aG docker ubuntu

echo "===== INSTALANDO K3S ====="

curl -sfL https://get.k3s.io | sh -

echo "===== ESPERANDO K3S ====="

until sudo kubectl get nodes >/dev/null 2>&1
do
  echo "Esperando K3s..."
  sleep 10
done

echo "===== ESPERANDO TRAEFIK ====="

until sudo kubectl get deployment traefik -n kube-system >/dev/null 2>&1
do
  echo "Esperando deployment Traefik..."
  sleep 5
done

sudo kubectl rollout status deployment/traefik -n kube-system --timeout=300s

echo "===== ESPERANDO CRDs DE TRAEFIK ====="

until sudo kubectl get crd middlewares.traefik.io >/dev/null 2>&1
do
  echo "Esperando CRD middlewares.traefik.io..."
  sleep 5
done

sleep 15

echo "===== CLONANDO REPOSITORIO ====="

mkdir -p /opt

cd /opt

if [ ! -d "/opt/worldops-2026" ]; then
  git clone https://github.com/GonzalezJulio/worldops-2026.git
fi

cd worldops-2026

echo "===== DESPLEGANDO KUBERNETES ====="

sudo kubectl apply -f k8s/namespace.yaml

sleep 5

sudo kubectl apply -f k8s/secrets/

sudo kubectl apply -f k8s/deployments/

sudo kubectl apply -f k8s/services/

echo "===== DESPLEGANDO MONITORING ====="

sudo kubectl apply -f k8s/monitoring/namespace.yaml

sleep 5

sudo kubectl apply -f k8s/monitoring/

echo "===== APLICANDO MIDDLEWARE ====="

sudo kubectl apply -f k8s/ingress/middleware.yaml

echo "===== VERIFICANDO MIDDLEWARE ====="

until sudo kubectl get middleware strip-api -n worldops >/dev/null 2>&1
do
  echo "Esperando Middleware strip-api..."
  sleep 5
done

sleep 10

echo "===== APLICANDO INGRESS ====="

sudo kubectl apply -f k8s/ingress/worldops-ingress.yaml

echo "===== NODES ====="
sudo kubectl get nodes

echo "===== PODS ====="
sudo kubectl get pods -A

echo "===== SERVICES ====="
sudo kubectl get svc -A

echo "===== PVC ====="
sudo kubectl get pvc -A

echo "===== MIDDLEWARES ====="
sudo kubectl get middleware -A

echo "===== INGRESS ====="
sudo kubectl get ingress -A

echo "===== EVENTS ====="
sudo kubectl get events -A --sort-by=.metadata.creationTimestamp

echo "BOOTSTRAP FINISHED $(date)"