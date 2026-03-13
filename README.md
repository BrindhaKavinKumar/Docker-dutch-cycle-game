# Docker Dutch Cycle Game 🚴🇳🇱

A simple Dutch-themed browser game deployed using a **3-tier architecture** and containerised with **Docker**.
Players ride through Holland collecting stroopwafels while their scores are stored in a backend API and database.

This project demonstrates a **beginner DevOps workflow** including containerisation, orchestration, and version control.

---

## Architecture

```
Browser
   │
Frontend (Nginx container)
   │
Backend API (Flask container)
   │
PostgreSQL Database
   │
Docker Volume (persistent data)
```

### Components

| Layer            | Technology            |
| ---------------- | --------------------- |
| Frontend         | HTML, CSS, JavaScript |
| Backend          | Python Flask          |
| Database         | PostgreSQL            |
| Containerisation | Docker                |
| Orchestration    | Docker Compose        |

---

## Project Structure

```
Docker-dutch-cycle-game
│
├── frontend
│   ├── Dockerfile
│   ├── index.html
│   ├── style.css
│   └── game.js
│
├── backend
│   ├── Dockerfile
│   ├── app.py
│   └── requirements.txt
│
├── database
│   └── init.sql
│
├── docker-compose.yml
└── README.md
```

---

## Features

* Dutch countryside themed game with windmills
* Player-controlled cyclist
* Collectible stroopwafels
* Leaderboard stored in PostgreSQL
* Persistent database using Docker volumes
* Multi-container setup with Docker Compose

---

## Prerequisites

Make sure the following are installed:

* Docker
* Docker Compose
* Git

---

## Run the Application

Clone the repository:

```
git clone https://github.com/<your-username>/Docker-dutch-cycle-game.git
cd Docker-dutch-cycle-game
```

Start the containers:

```
docker compose up --build
```

---

## Access the Game

Frontend (Game UI)

```
http://localhost:8080
```

Backend API health check

```
http://localhost:5000/health
```

---

## Database Persistence

Game scores are stored in a Docker volume.

Check volumes:

```
docker volume ls
```

The volume ensures leaderboard data remains even if containers restart.

---

## Stop the Application

```
docker compose down
```

Remove containers and volumes:

```
docker compose down -v
```

---

## Future Improvements

* CI/CD pipeline using Jenkins
* Infrastructure provisioning with Terraform
* Deploy to a cloud VM
* Add animations and improved game graphics
* Implement API reverse proxy with Nginx

---

## Author

DevOps Learning Project by **Brindha**
