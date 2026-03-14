pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Show Workspace') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t dutch-cycle-game-frontend ./frontend'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t dutch-cycle-game-backend ./backend'
            }
        }

        stage('List Docker Images') {
            steps {
                sh 'docker images'
            }
        }
    }
}
