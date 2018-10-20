# Building Serverless Calorie tracker application with AWS AppSync

In this workshop you will build a serverless Calorie tracker application which will allow users to setup calorie target goal, allows you to add, update and track the calories consumed or burned and also receive food based on their food habits.

The features that we would be building today:
- User sign-up, login and logout
- Set personal information like calorie target per day, height, weight etc.
- Track activities through out the day like add calories (breakfast, lunch, dinner, snacks) and burn calories (workout, walk, run)
- View suggested based on the activities and personal information such as BMI.

Following diagram shows the deployment architecture of the web application:

<img src="images/architecture.png"/>

**Services used**
- AWS AppSync
- AWS Lambda
- Amazon DynamoDB
- Amazon Cognito
- Amazon Neptune

## Requirements

This workshop requires:

- An active AWS Account with administrative permissions.
- If you are using your own laptop, you should have [npm](https://docs.npmjs.com/getting-started/installing-node) and [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed.
- Knowledge of Javascript/ NodeJS.


## Steps:

1. [Setting up Neptune](1_neptune_stack/)
2. [Setting up AppSync](2_appsync_stack/)
2. [Setting up the front end](3_frontend/)
3. [Testing Food Calorie application]()
4. [Bonus Round](4_bonus_round/)
5. [Closing and Clean up](5_closing_and_clean_up/)
