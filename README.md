
---

# 🚀 Full-Stack Application — Spring Boot + React + DevOps

This project is my **first complete integration of a full-stack application with automated CI/CD and cloud-native deployment**.
It includes a Java Spring Boot backend, a modern frontend built with React, Vite, and TailwindCSS, and full DevOps support using GitHub Actions, Docker, Kubernetes, and ArgoCD.

---

## 📁 Project Structure

```
├── Backend/            # Spring Boot app with JPA, Validation, MySQL
├── Frontend/           # React + Vite + TailwindCSS
├── Kubernetes/         # K8s manifests for services and deployment
├── Github/             # GitHub Actions workflows
└── README.md
```

---

## 🧱 Tech Stack

### Backend (Spring Boot)

* **Spring Boot 3.4.4**
* **JPA & MySQL Connector**
* **Validation**
* **Dotenv for env management**
* **Lombok** for cleaner code
* Built with **Java 17**

### Frontend (React + Vite + Tailwind)

* **React 19**, via React architecture
* **React Router v7**
* **TailwindCSS 4**
* **Lucide, HeroIcons, HeadlessUI**
* TypeScript support
* Code linting and formatting via **ESLint + Prettier**

### DevOps & Deployment

* **GitHub Actions** for CI/CD
* **Docker** for containerization
* **Kubernetes** for orchestration
* **ArgoCD** for GitOps-based deployment

---

## 🛠️ Getting Started

### Prerequisites

* Java 17+
* Node.js 18+
* Docker
* Kubernetes cluster (e.g., Minikube, Docker Desktop, k3s, GKE)
* ArgoCD access
* `kubectl`, `docker`, `argocd` CLI installed

---

### 🔄 CI/CD with GitHub Actions

Your GitHub Actions pipeline:

* Builds backend & frontend
* Builds Docker images
* Pushes images to Docker registry
* Triggers ArgoCD sync (manual or webhook)

---

### 🚢 GitOps via ArgoCD

ArgoCD watches the repo and automatically syncs Kubernetes manifests:

* Ensure manifests in `Kubernetes/` are declarative and up-to-date
* Syncs happen on push to `main` (or target branch)
