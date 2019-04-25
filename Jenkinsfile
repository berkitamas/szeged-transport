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
          def commitHash = scmVars.GIT_COMMIT.substring(scmVars.GIT_COMMIT.length()-8)
          env.DOCKER_LABEL=sh(script: "echo v\$(cat package.json | grep version | head -1 | awk -F: '{ print \$2 }' | sed 's/[\",]//g' | awk '{\$1=\$1};1')-${commitHash}-${BUILD_NUMBER}", returnStdout: true)
        }
      }
    }
    stage('Install dependencies') {
      steps {
        echo "${env.DOCKER_LABEL}"
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
    stage('Push Project')
  }
}