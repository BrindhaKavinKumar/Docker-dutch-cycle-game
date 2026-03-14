# Dutch Cycle Game – DevOps Deployment

This project demonstrates a **complete DevOps workflow** for deploying a full-stack application using Docker, Jenkins, Kubernetes (K3s), Prometheus, and Grafana.

The goal of the project is to build, containerize, deploy, and monitor an application using modern cloud-native tooling.

---

# Architecture Overview

The system includes the following components:

Frontend
A web interface built and packaged as a Docker container.

Backend
Application API service packaged as a Docker container.

Database
PostgreSQL database container.

CI/CD Pipeline
Jenkins builds and pushes Docker images automatically.

Container Registry
DockerHub stores built container images.

Kubernetes Cluster
K3s runs the application containers and manages services.

Monitoring Stack
Prometheus collects metrics and Grafana visualizes them.

---

# Infrastructure

Server Environment

Cloud Provider: AWS EC2
Instance Type: t3.medium (recommended)
Storage: 20GB EBS Volume
OS: Ubuntu

Container Runtime

Docker

Orchestration

Kubernetes (K3s)

---

# Project Structure

```
Docker-dutch-cycle-game
│
├── backend/
│   └── Dockerfile
│
├── frontend/
│   └── Dockerfile
│
├── database/
│
├── k8s/
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── database-deployment.yaml
│   ├── database-service.yaml
│   └── ingress.yaml
│
├── monitoring/
│   └── prometheus.yml
│
├── terraform/
│
├── docker-compose.yml
│
└── Jenkinsfile
```

---

# CI/CD Pipeline

Jenkins automates the container build and publish process.

Pipeline stages

1. Checkout source code from GitHub
2. Build Docker images
3. Login to DockerHub
4. Push images to DockerHub

Example images

```
docker.io/brindhakavinkumar/dutch-cycle-game-frontend
docker.io/brindhakavinkumar/dutch-cycle-game-backend
```

---

# Kubernetes Deployment

The application is deployed to a **K3s Kubernetes cluster**.

Deployment objects used

* Deployment
* Service
* Ingress

Deploy the application

```
kubectl apply -f k8s/
```

Check pods

```
kubectl get pods
```

Check services

```
kubectl get svc
```

---

# Monitoring Stack

Monitoring is implemented using the **kube-prometheus-stack Helm chart**.

Components

Prometheus
Collects metrics from Kubernetes and applications.

Grafana
Visualizes metrics through dashboards.

Kube State Metrics
Provides cluster resource metrics.

Prometheus Operator
Manages Prometheus instances and configuration.

Install monitoring stack

```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm upgrade --install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace
```

---

# Accessing Services

Frontend

```
http://<EC2-PUBLIC-IP>:30080
```

Prometheus

```
http://<EC2-PUBLIC-IP>:31698
```

Grafana

```
http://<EC2-PUBLIC-IP>:3000
```

Retrieve Grafana admin password

```
kubectl get secret monitoring-grafana \
-n monitoring \
-o jsonpath="{.data.admin-password}" | base64 -d
```

---

# Observability

Grafana dashboards provide visibility into:

* Node CPU usage
* Pod memory usage
* Kubernetes cluster health
* Network metrics
* Prometheus targets

Prometheus scrapes metrics from:

* kube-state-metrics
* Kubernetes API server
* node metrics
* application metrics (optional)

---

# Useful Commands

Check cluster nodes

```
kubectl get nodes
```

Check pods

```
kubectl get pods -A
```

Check monitoring stack

```
kubectl get pods -n monitoring
```

Check services

```
kubectl get svc -n monitoring
```

---

# Key DevOps Concepts Demonstrated

Containerization with Docker
Infrastructure provisioning
CI/CD with Jenkins
Kubernetes orchestration
Helm package management
Monitoring with Prometheus
Visualization with Grafana
Cloud deployment on AWS

---

# Future Improvements

Add automated deployment stage in Jenkins
Implement Horizontal Pod Autoscaling
Add application metrics endpoint
Integrate centralized logging (ELK or Loki)
Secure services using TLS and Ingress

---

# Author

Brindha | Learning Cloud, Infrastructure as Code, Kubernetes and DevOps Practices
