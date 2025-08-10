pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        IMAGE_NAME = 'kishxrx/jenkins-ci-cd-demo'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                git(
                    url: 'https://github.com/kishxrx/jenkins-ci-cd-demo.git',
                    credentialsId: 'github-token'
                )
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js packages...'
                bat 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat "docker build -t %IMAGE_NAME% ."
            }
        }

        stage('Login to DockerHub') {
            steps {
                echo 'Logging into DockerHub...'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    bat 'echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                echo 'Pushing image to DockerHub...'
                bat "docker push %IMAGE_NAME%"
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs.'
        }
    }
}