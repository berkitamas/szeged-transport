pipeline {
  agent {
    docker {
      image 'node:alpine'
    }

  }
  stages {
    stage('Checkout code') {
      steps {
        script {
          def scmVars = checkout(scm)
          env.GIT_COMMIT = scmVars.GIT_COMMIT
        }
      }
    }
    stage('Install dependencies') {
      steps {
        echo "${env.GIT_COMMIT}"
        sh 'npm install'
        sh 'npm install -g @angular/cli'
      }
    }
    stage('Build Project') {
      steps {
        sh 'npm run build-prod'
        sh 'docker build -t thomastopies/szeged-transport .'
      }
    }
  }
}