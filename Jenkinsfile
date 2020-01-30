pipeline {
  agent none
  stages {
    stage('Checkout code') {
      agent {
        docker {
          image 'node:alpine'
        }
      }
      steps {
        script {
          def scmVars = checkout(scm)
          def commitHash = scmVars.GIT_COMMIT.substring(scmVars.GIT_COMMIT.length()-8)
          env.DOCKER_LABEL=sh(script: "echo v\$(cat package.json | grep version | head -1 | awk -F: '{ print \$2 }' | sed 's/[\",]//g' | awk '{\$1=\$1};1')-${commitHash}-${BUILD_NUMBER}", returnStdout: true).trim()
        }
      }
    }
    stage('Install dependencies') {
      agent {
        docker {
          image 'node:alpine'
        }
      }
      steps {
        sh 'npm install'
        sh 'npm install @angular/cli@^6.0.0'
        stash name: 'node_project'
      }
    }
    stage('Build Project') {
      agent {
        docker {
          image 'node:alpine'
        }
      }
      steps {
        unstash 'node_project'
        sh 'npm run build-prod'
        stash includes: 'dist/**', name: 'builded_project'
        stash includes: 'nginx.conf', name: 'nginx_config'
      }
    }
    stage('Docker operations') {
      agent any
      steps {
        script {
          unstash 'builded_project'
          unstash 'nginx_config'
          def image = docker.build("thomastopies/szeged-transport:${env.DOCKER_LABEL}")
          docker.withRegistry( '', 'docker-hub' ) {
            image.push()
            image.push('latest')
          }
        }
      }
    }
    stage('Docker-compose rebuild') {
      agent any
      steps {
        script {
          sh 'docker-compose -f /var/jenkins_home/docker-compose/btj/docker-compose.yml up -d --no-deps --force-recreate webfejl'
        }
      }
    }
  }
}
