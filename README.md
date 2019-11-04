### Project Description ###

This is an example of project based on Cypress.
The project contains tests for web-services:
1) create user endpoint provided by https://reqres.in/
2) web-services for per entity provided by https://petstore.swagger.io/
Testing data is generated randomly using chance library. 

And there is also one UI tests for web-site https://www.iherb.com. Search by product name scenarios is implemented.
It uses data from the fixture file and implemented using page-object.

Note: Some of API tests are failed. Failures show problems in the web-services under test.
There is an integration with Cypress Dashboard service and Test Rail system. 
You may find details of how to find generated reports in the "Reporting" section below.


## 1. Prerequisites
Before running test use should install NodeJS >6.1.0 at you environment:
https://nodejs.org/en/download/

## 2. Running of auto-tests locally

In order to run testing script at your own machine perform the following instructions:
#### 2.1 Load the project from the GitHub
Project URL: https://github.com/ZEFR-INC/rid3-e2e-test
For example, you may load the project using the command line:
```
git clone https://github.com/kateyurasova/learn-cypress-example.git
```
#### 2.2 Install components
As soon as project is loaded, go to the root and perform command:
```
npm install
```
It will install all components based on package.json file into node_modules folder.
#### 2.3 As soon as components are loaded you may run testing scripts. 
##### 2.3.1 Run all tests

*If you are not interested in seeing GUI while tests execution you may run tests in Electron*
https://www.npmjs.com/package/electron.

To run all tests in Electron:
```
npx cypress run
```
*If you prefer to see the application GUI while tests execution you may run tests in Chrome.*

To run all tests in Chrome:
```
npx cypress run -b chrome
```

In order to get the report in the Cypress Dashboard you should add some more parameters:

```
npx cypress run -b chrome --record --key d359f2ab-8828-480a-9bd0-150fd7951f15
```
**--record** means that transfer results to the Cypress Dashboard is on. 
**--key** parameter followed by value **d359f2ab-8828-480a-9bd0-150fd7951f15** is used for access 
to project in the Cypress Dashboard.

So, the command above will run testing scrips in Chrome and will create the report in the Cypress 
Dashboard. 

To do the same in a headless mode (Electron) use the following command:
```
npx cypress run --record --key d359f2ab-8828-480a-9bd0-150fd7951f15
```

##### 2.3.2 Run single test file
Cypress provides the Test Runner that allows you to run testing files separately and see 
the execution process:  https://docs.cypress.io/guides/core-concepts/test-runner.html#Overview

To open it use the following command:
```
npx cypress open
```
In the Test Runner you will see the list of testing files. You may click any of them and execution 
tests within a single it would be started in a separate window. Pay attention that results recording 
and reports creation is not performed if you use the Test Runner. So, this option is mostly for 
development and issues investigation. For running all the scope you should better use other options.

#### 3. Reporting

##### 3.1 Results are loaded into the Cypress Dashboard
Link for the reporting project: https://dashboard.cypress.io/#/projects/ki2hyc/runs
Please, log in with your credentials - since the project is public you will be able to see results and report 
into this project in case of running of tests at your local env with the key.

##### 3.2 Report sample is created in Test Rail
To access the Test Rails account use the following credentials: 
Login: kateyurasova10@gmail.com
Password: AutomationUniversity2019
This test rail account is created for demonstration of integration work and report view. 

In order to find report generated as a result of execution of test, please, follow the link:
https://automationuniversity.testrail.io/index.php?/runs/overview/1

*Note*: Report is created in Test Rail only if you run all scope with command npx cypress run. 
Report is not created if you run tests one by one in Cypress interactive window. 



