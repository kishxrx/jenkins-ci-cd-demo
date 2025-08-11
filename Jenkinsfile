// The complete, final, and corrected Jenkinsfile
pipeline {
    // Tells Jenkins to run the stages inside a Docker container
    // that already has Node.js and npm installed.
    agent {
        docker { image 'node:20-alpine' }
    }

    triggers {
        githubPush()
    }

    environment {
        IMAGE_NAME = 'kishxrx/jenkins-ci-cd-demo'
    }

    stages {
        
        stage('Install Dependencies and Clean Workspace') {
            steps {
                // This is a DevOps best practice to prevent stale file issues.
                cleanWs() 
                
                echo 'Installing Node.js packages...'
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${IMAGE_NAME} ."
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
                    sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                echo 'Pushing image to DockerHub...'
                sh "docker push ${IMAGE_NAME}"
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
