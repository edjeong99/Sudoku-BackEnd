# Sudoko 2024

This is a backend part of personal project to build and deploy Sudoko puzzle.
1st step is making a high quality puzzle and deploy using AWS.
2nd step is adding advanced functionalities (group competition, ranking, etc)
3rd step is commercialize the app/site

## Tech Stack

ReactJS
NodeJS
MongoDB

- Command to start program
  Backend : nodemon server

# Deployment

- Frontend : AWS Amplify
- BackEnd : AWS Elastic Beanstalk & API Gateway
  Backend app is deployed in Beanstalk. Amplify provide HTTPS endpoint which Beanstalk doesn't offer HTTPS. For CI/CD, use AWS CodePipeline and AWS CodeBuild.

Note : it was way harder than expected to connect all AWS services and make them work. not enough materials...

# DB setting

- use mongodb in cloud.mongodb.com
  Collections
  User : uid, email, password, nickName
  timeStat: {
  count: {Easy, Medium, Hard, Total},
  avgTime: {Easy, Medium, Hard, Total}
  }

CompletionTimes : uid, difficulty, completionTime, completedAt

# before it was Deployed in Render

https://sudoku-backend-wl5r.onrender.com
