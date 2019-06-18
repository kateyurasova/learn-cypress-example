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
                        bat 'npx cypress run --record --key d359f2ab-8828-480a-9bd0-150fd7951f15 --parallel'
                    }
                }
                stage('Run tests in parallel Second') {
                                    steps {
                                        bat 'npx cypress run --record --key d359f2ab-8828-480a-9bd0-150fd7951f15 --parallel'
                                    }
                                }
            }
        }
    }
}