pipeline {
  agent {
        docker {
            image 'maven:3-alpine' 
            args '-v /root/.m2:/root/.m2' 
        }
  }
  stages {
    stage('Maven install') {
      docker.image('node:10.5.3') {
            /* Wait until mysql service is up */
            sh 'mvn clean install'
      }      
    }
    stage('run') {
      steps {
        sh 'java -jar target/react-and-spring-0.0.1-SNAPSHOT.jar'
      }
    }
  }
}