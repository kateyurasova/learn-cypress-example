pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                bat 'npm install'
            }
        }

        stage('parallel') {
            parallel {
                stage('Run tests in parallel') {
                    steps {
                        bat 'npx cypress run --record --key c6a0355c-4706-45df-a0a3-51ff1614022b --parallel'
                    }
                }
            }
        }
    }
}