#!/bin/bash

apt update -y
apt upgrade -y

apt install -y \
  curl \
  git \
  unzip

curl -fsSL https://get.docker.com | sh

curl -sfL https://get.k3s.io | sh -

usermod -aG docker ubuntu