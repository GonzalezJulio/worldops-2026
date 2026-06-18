# 🏆 WorldOps 2026

Plataforma Cloud-Native de votación inspirada en la Copa Mundial 2026, desarrollada para demostrar prácticas modernas de DevOps, Kubernetes, GitOps, Observabilidad y CI/CD.

---

## 🚀 Demo

**URL pública:**

https://worldops2026.duckdns.org

---

## 📌 Arquitectura

```text
Usuario
   │
   ▼
DuckDNS
   │
   ▼
Traefik Ingress
   │
   ├────────────► Frontend (React + Vite)
   │
   └────────────► Backend (FastAPI)
                         │
                         ├────► Redis
                         │
                         └────► PostgreSQL
```

---

## 🏗 Infraestructura

* AWS EC2
* Elastic IP
* Ubuntu Server
* Docker
* K3s (Kubernetes)
* Traefik Ingress Controller
* ArgoCD

---

## ⚙️ Stack Tecnológico

### Frontend

* React
* Vite
* TailwindCSS

### Backend

* FastAPI
* Python

### Base de Datos

* PostgreSQL

### Cache

* Redis

### DevOps

* Docker
* Kubernetes (K3s)
* GitHub Actions
* ArgoCD
* Prometheus
* Grafana

---

## 🔄 CI/CD

### Continuous Integration

GitHub Actions ejecuta automáticamente:

* Build Frontend
* Build Backend
* Docker Build
* Docker Push a Docker Hub

### Continuous Delivery

ArgoCD implementa GitOps:

```text
GitHub
   │
   ▼
ArgoCD
   │
   ▼
Kubernetes
```

Cada cambio en el repositorio es sincronizado automáticamente en el cluster.

---

## 📊 Observabilidad

### Prometheus

Métricas recolectadas:

* Requests totales
* Votos por selección
* Latencia API
* Estado de servicios

### Grafana

Dashboard personalizado:

* Votos en tiempo real
* Estado de Pods
* Estado del cluster
* Recursos Kubernetes

---

## 🐳 Imágenes Docker

### Frontend

```bash
docker pull <TU_USUARIO>/worldops-frontend
```

### Backend

```bash
docker pull <TU_USUARIO>/worldops-backend
```

---

## ☸️ Kubernetes

Principales recursos desplegados:

### Deployments

* frontend
* backend
* redis
* postgres

### Services

* frontend
* backend
* redis
* postgres

### Ingress

* Traefik Ingress Controller

### GitOps

* ArgoCD Application

---

## 📂 Estructura del Proyecto

```text
worldops-2026
│
├── client/
│
├── server/
│
├── k8s/
│   ├── deployments/
│   ├── services/
│   ├── ingress/
│   ├── monitoring/
│   ├── configmaps/
│   └── secrets/
│
├── monitoring/
│   ├── prometheus.yml
│   └── dashboard/
│
├── terraform/
│
├── argocd/
│
└── .github/
    └── workflows/
```

---

## 🎯 Objetivos del Proyecto

Este proyecto fue desarrollado para demostrar conocimientos prácticos en:

* Linux
* Docker
* Kubernetes
* Networking
* GitOps
* CI/CD
* AWS
* Terraform
* Observabilidad
* Platform Engineering

---

## 👨‍💻 Autor

**Julio González**

DevOps Engineer | Cloud | Kubernetes | Terraform | AWS

LinkedIn:
https://www.linkedin.com/in/julioggonzalezz/

GitHub:
https://github.com/GonzalezJulio

---

## 📜 Licencia

Proyecto desarrollado con fines educativos y de portfolio profesional.
