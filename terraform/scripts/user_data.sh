#!/bin/bash

echo "BOOTSTRAP START $(date)" > /tmp/bootstrap-test.txt

exec > >(tee /var/log/worldops-bootstrap.log)
exec 2>&1

apt update -y
apt upgrade -y

apt install -y \
  curl \
  git \
  unzip

curl -fsSL https://get.docker.com | sh

curl -sfL https://get.k3s.io | sh -

usermod -aG docker ubuntu

until sudo kubectl get nodes >/dev/null 2>&1
do
  echo "Esperando K3s..."
  sleep 10
done

mkdir -p /opt

cd /opt

git clone https://github.com/GonzalezJulio/worldops-2026.git

cd worldops-2026 || exit 1

sudo kubectl apply -f k8s/namespace.yaml

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

echo "BOOTSTRAP FINISHED $(date)"