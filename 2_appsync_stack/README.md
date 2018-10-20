# Serverless Calorie tracking application with AWS AppSync, Amazon DynamoDB and Amazon Neptune
This workshop shows you how easy it is to build a completely serverless web application. You will build a sample web application called Calorie tracker which will allow users to track the calories and get recommendations based on their food habits.
Your application will have following featurs:
- User sign-up, login and logout
- Set personal information like calorie target per day, height, weight etc.
- Track activities through out the day like add calories (breakfast, lunch, dinner, snacks) and burn calories (workout, walk, run)
- View recommendations based on the activities

You will build your web application using AWS Amplify. You will host the static assets of on Amazon S3 and use S3 to deliver the web application to your users. The application will integrate with AWS AppSync to provide real-time data from multiple data sources via GraphQL technology. User's personal information, and activity data will be stored in Amazon DynamoDB and AWS Lambda will query Amazon Neptune graph database to provide recommendation.

User sign-up, login and logout will done using Amazon Cognito User pools. User's personal information and activity information will be stored across multiple tables in DynamoDB and AppSync will make it easy to access these data and provide exact information as needed by our application. Amazon Neptune will be used in providing recommendations based on the user's activity. It makes it easy to build relationships between different data points and querying on those data sets.

Following diagram shows the deployment architecture of the web application:

[TODO: Architecture diagram]

**Services used**
- AWS AppSync
- AWS Lambda
- Amazon DynamoDB
- Amazon Cognito User Pools
- Amazon Neptune

## Pre-requisites

- AWS Account with appropriate permissions to create the related resources
- AWS Amplify
- AWS CLI
- AWS Cloud9?

## Implementation Instructions

### Region Selection
This workshop can be deployed in any AWS region that supports the following services:
- AWS Lambda
- AWS AppSync
- Amazon DynamoDB
- Amazon Neptune
- Amazon Cognito

You can refer to the [region table](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/) in the AWS documentation to see which regions have the supported services. Among the currently supported regions you can choose are: **N. Virginia**, **Ohio**, **Oregon**, **Ireland**, and **London**.

Once you've chosen a region, you should deploy all of the resources for this workshop there. Make sure you select your region from the dropdown in the upper right corner of the AWS Console before getting started.

![Region Selection](images/region.jpg)

### Step 1: Create DynamoDB Tables
Execute following CLI command to create dynamoDB tables.
```
aws cloudformation create-stack --stack-name dynamoDBStack --template-body file://templates/dynamodb-tables.yaml --parameters ParameterKey=APIName,ParameterValue=caltrack
```
Above command will launch a Cloudformation stack. When the stack creation is completed successfully, you will see the following tables created. You can check the status of your stack from the CloudFormation console.
- caltrack_user_table
- caltrack_activity_table
- caltrack_activity_category_table
- caltrack_user_aggregate_table

Execute following CLI command to load some sample activity categories to be used by the web app.
```
aws dynamodb batch-write-item --request-items file://assets/activity-categories.json
```

### Step 2: Create AppSync API backend
Open the AWS AppSync Console and click **Create API**.

![AppSync Create API](images/appsync-createapi.jpg)

Choose **Build from Scratch** and click **Start**.

![AppSync Start](images/appsync-start.jpg)

Enter a name for your API (e.g. '*Calorie Tracker App*') and click **Create**.

#### 2.1 Setup data sources
We will be using DynamoDB as our data sources. We will create 4 data sources, one for each DynamoDB table.

**UserTable data source**

On the left pane, select **Data Sources**. Click **New**. Fill the details as provided below and click **Create**.
- Data source name: *UserTable*
- Data source type: *Amazon DynamoDB table*
- Region: *{Region in which you are in}*
- Table name: *caltrack_user_table*

![AppSync data source](images/appsync-ds.jpg)

**ActivityTable data source**

Click **New**. Fill the details as provided below and click **Create**.
- Data source name: *ActivityTable*
- Data source type: *Amazon DynamoDB table*
- Region: *{Region in which you are in}*
- Table name: *caltrack_activity_table*

**UserAggregateTable data source**

Click **New**. Fill the details as provided below and click **Create**.
- Data source name: *UserAggregateTable*
- Data source type: *Amazon DynamoDB table*
- Region: *{Region in which you are in}*
- Table name: *caltrack_user_aggregate_table*

**ActivityCategoryTable data source**

Click **New**. Fill the details as provided below and click **Create**.
- Data source name: *ActivityCategoryTable*
- Data source type: *Amazon DynamoDB table*
- Region: *{Region in which you are in}*
- Table name: *caltrack_activity_category_table*

#### 2.2 Setup AppSync Schema
Now we will create GraphQL schema.
- On the left pane, select **Schema**.
- Copy the contents of the **assets/schema.graphql** file and paste it into the Schema editor and click **Save**.

![AppSync Schema](images/appsync-schema.jpg)

#### 2.3 Configure resolvers
We will configure query, mutation and subscription resolvers in this step. Before configuring your resolvers, get your AppSync API Id.
- On the left page, select **Settings**.
- Click **Copy** button next to the API ID field.
- Replace **API_ID** with your API ID, in the command below.
- Execute the CLI command below. It will launch a CloudFormation stack to configure resolvers.
  ```
  aws cloudformation create-stack --stack-name resolver-stack --template-body file://templates/appsync-resolvers.yaml --parameters ParameterKey=AppSyncApiId,ParameterValue=3xrxari5hzamrb4vhq4ryms7iu ParameterKey=AppSyncUserTableDataSourceName,ParameterValue=UserTable ParameterKey=AppSyncActivityTableDataSourceName,ParameterValue=ActivityTable ParameterKey=AppSyncActivityCategoryTableDataSourceName,ParameterValue=ActivityCategoryTable ParameterKey=AppSyncUserAggTableDataSourceName,ParameterValue=UserAggregateTable
  ```
- When the CloudFormation stack is completed successfully, you will have your resolvers configured.

### Step 3: Create Lambda Function
We will create the Lambda function which will be executed every time user logs an activity in the app, using DynamoDB streams. This function will update the User Aggregate table with the calories. If the activity category is either Food or Drink, it will add the calories to the 'caloriesConsumed' field for the user. If the activity category is Exercise, it will add the calories to the 'caloriesBurned' field for the user.

[TODO: Finish rest of the steps]

### Step 4: Implement Vue.js web front end using Amplify

### Step 5: Deploy Vue.js front end

### Step 6: Test

## License Summary
This sample code is made available under a modified MIT license. See the LICENSE file.

[Proceed to next section - Setting up the frontend application](../3_frontend/README.md)

[Back to home page](../README.md)
