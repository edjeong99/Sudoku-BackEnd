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
   Backend app is deployed in Beanstalk.  Amplify only connects to HTTPS but Beanstalk doesn't offer HTTPS.  So use API Gateway to get connected HTTPS and then to Beanstalk.

Note : it was way harder than expected to deploy Beanstalk and connect to API.  Not much useful material to learn proper way.



# Deployed in Render
https://sudoku-backend-wl5r.onrender.com
-- AWS Beanstalk didn't offer https.  it was hard to implement https.(API gateway, load balancing, etc)