#!/bin/bash
set -e

echo "BOOTSTRAP START $(date)" > /tmp/bootstrap-test.txt

exec > >(tee /var/log/worldops-bootstrap.log)
exec 2>&1

echo "===== ACTUALIZANDO SISTEMA ====="

apt update -y
apt upgrade -y

apt install -y \
  curl \
  git \
  unzip

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

sudo kubectl apply -f k8s/ingress/

echo "===== NODES ====="
sudo kubectl get nodes

echo "===== PODS ====="
sudo kubectl get pods -A

echo "===== SERVICES ====="
sudo kubectl get svc -A

echo "===== INGRESS ====="
sudo kubectl get ingress -A

echo "===== EVENTS ====="
sudo kubectl get events -A --sort-by=.metadata.creationTimestamp

echo "BOOTSTRAP FINISHED $(date)"