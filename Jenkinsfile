pipeline {
    agent any

    environment {
        DOCKER_USER = "yourdockerhubusername"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker build -t $DOCKER_USER/dutch-cycle-game-frontend ./frontend'
                sh 'docker build -t $DOCKER_USER/dutch-cycle-game-backend ./backend'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $DOCKER_USER/dutch-cycle-game-frontend'
                sh 'docker push $DOCKER_USER/dutch-cycle-game-backend'
            }
        }
    }
}
