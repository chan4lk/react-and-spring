pipeline {
  agent any
  stages {
    stage('Maven install') {
      steps {
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