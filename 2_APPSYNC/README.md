# Module 2: AWS AppSync backend

In this module, we will create the backend for our application. We will use Amazon DynamoDB to store user information and AWS AppSync to create GraphQL based backend.

AppSync is setup with DynamoDB tables as data source to persist user information. The below picture shows the relationship between AppSync schema, resolver and data sources.

![Appsync](../images/image-appsync-completed.png)

As we go through different steps in this module, you will learn what resources we are creating and what is it used for in the application.

Following are the steps to create the application backend:

1. [Create DynamoDB Tables and Lambda function](#step-1-create-dynamodb-tables-and-lambda-function)
2. [Create AppSync API backend](#step-2-create-appsync-api-backend)
    1. [Create AppSync API](#create-appsync-api)
    2. [Setup data sources](#setup-data-sources)
    3. [Create AppSync Schema](#create-appsync-schema)
    4. [Configure resolvers](#configure-resolvers)
3. [Setup Lambda event source](#step-3-add-amazon-dynamodb-user-table-as-event-source-for-add-new-user-bmi-lambda)

## Step 1: Create DynamoDB Tables and Lambda function
In this step we are creating following 4 DynamoDB tables:
- User - to store user details such as username, height, weight, etc.
- Activity - to store user activity details i.e. username, calories consumed or burned, date and time
- Activity Category - to store Activity category and its type.
- User Aggregate - to store aggregated values of calories consumed and calories burned per user per day.

We are also creating a Lambda function to aggregate the calories consumed and calories burned by each user on every activity, and update it in the dynamoDB table. This Lambda function will be executed every time user logs an activity in the app and it's triggered through Activity DynamoDB stream.

Use the following link to launch the stack. 

Region| Launch
------|-----
eu-west-1 (Ireland) | [![Launch](../images/cloudformation-launch-stack-button.png)](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/new?stackName=reinvent-calorie-tracker-module2&templateURL=https://s3-eu-west-1.amazonaws.com/aws-appsync-calorie-tracker-master/2_APPSYNC/templates/dynamodb-lambda.yaml)

![CFN](../images/image-appsync-cf-inputs.png)

> Leave all Cloudformation inputs as defaults and click Next and Create the Stack

When the stack creation is completed successfully, you will have following 4 DynamoDB tables and a Lambda function created. 

Here's what we just deployed:

![DynamoDB Tables](../images/image-dynamodb.png)

![Calories Aggregator function](../images/image-calories-aggregator-lambda.png)

Next, go to your *AWS Cloud9 terminal*, type the following command to load the sample activity categories (Make sure you are in the workshop project directory):

```
aws dynamodb batch-write-item --request-items file://2_APPSYNC/assets/activity-categories.json --region eu-west-1
```
![Calories Aggregator function](../images/image-dynamo-batch-write.png)


## Step 2: Create AppSync API backend
In this step, we will do the following:
- Create an AppSync API for our application
- Setup 4 data sources, one for each dynamoDB table
- Create AppSync schema.
- Create resolvers for query, mutation and subscriber types.

### Create AppSync API

Open the AWS AppSync Console and click **Create API**.

![AppSync Create API](images/appsync-createapi.jpg)

Choose **Build from Scratch** and click **Start**.

![AppSync Start](images/appsync-start.jpg)

Enter a name for your API `Calorie Tracker App` and click **Create**.


### Setup data sources
We will be using DynamoDB as our data sources. We will create 4 data sources, one for each DynamoDB table.

![AppSync DS](../images/image-appsync-datasource.png)

**UserTable data source**

On the left pane, select **Data Sources**. Click **Create data source**. Fill the details as provided below and click **Create**.
- Data source name: **UserTable**
- Data source type: **Amazon DynamoDB table**
- Region: **EU-WEST-1**
- Table name: **caltrack_user_table**
- Use an Existing Role: **appsync-ddb-datasource**

![AppSync data source](../images/images_appsync_usertable_ds.png)

**ActivityTable data source**

Click **Create data source**. Fill the details as provided below and click **Create**.
- Data source name: **ActivityTable**
- Data source type: **Amazon DynamoDB table**
- Region: **EU-WEST-1**
- Table name: **caltrack_activity_table**
- Use an Existing Role: **appsync-ddb-datasource**

**UserAggregateTable data source**

Click **Create data source**. Fill the details as provided below and click **Create**.
- Data source name: **UserAggregateTable**
- Data source type: **Amazon DynamoDB table**
- Region: **EU-WEST-1**
- Table name: **caltrack_user_aggregate_table**
- Use an Existing Role: **appsync-ddb-datasource**

**ActivityCategoryTable data source**

Click **Create data source**. Fill the details as provided below and click **Create**.
- Data source name: **ActivityCategoryTable**
- Data source type: **Amazon DynamoDB table**
- Region: **EU-WEST-1**
- Table name: **caltrack_activity_category_table**
- Use an Existing Role: **appsync-ddb-datasource**

Once you have created the datasources, you should see 4 Appsync Datasources in the console. 

![AppSync data source](../images/image-completed-ds.png)

### Create AppSync Schema
In this section we will create a GraphQL Schema. In the following first few steps, we will show how you can define the type, query and mutations from scratch. But, in the interest of time, we have the GrapphQL schema pre-created for you, which you will directly copy and paste in your schema editor.

##### Entity type - User
  - To store user information in the DynamoDB table, we need to define a type called **User**. It will be defined as below. 
	```
	  type User {
	    caloriesConsumed: Int
	    caloriesTargetPerDay: Int!
	    height: Float!
	    id: String!
	    username: String!
	    weight: Float!
	    bmi: Float
	  }
	  ```
##### Query type - getUser
  - To fetch user details using User Id, we need to define a *query* type, called **getUser**. The query **getUser** take **ID** as input argument and returns **User** type.
	 ```
	 type Query {
	      getUser(id: ID!): User
	  }
	 ```
##### Mutation type - createUser
  - Mutation type is used to create or update information in the data source.
  - To store user information we need to create a *mutation* type called **createUser**
  - The mutation **createUser** takes **CreateUserInput** as input argument and return **User** type. **CreateUserInput** is an Input type which contains the attributes we want to store for each user.
	 ```
	  type Mutation {
	    createUser(input: CreateUserInput!): User
	  }
	
	  input CreateUserInput {
	    id: String
	    caloriesConsumed: Int
	    caloriesTargetPerDay: Int!
	    height: Float!
	    username: String!
	    weight: Float!
	  }
	 ```
  Putting above 3 types together, your AppSync Schema will look like below.
  ```
  type User {
    caloriesConsumed: Int
    caloriesTargetPerDay: Int!
    height: Float!
    id: String!
    username: String!
    weight: Float!
    bmi: Float
  }

  type Query {
      getUser(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
  }

  input CreateUserInput {
    id: String
    caloriesConsumed: Int
    caloriesTargetPerDay: Int!
    height: Float!
    username: String!
    weight: Float!
  }

  ```

However, for our application we need more than above 3 types. We need to create entity types for all 4 dynamoDB tables; query types for fetching user details, activity details; and mutation types for saving user information, activity information and activity deletion.

We have pre-created the schema of our application. You can find the schema in the workshop project directory at *2_APPSYNC/assets/schema.graphql*. Follow the steps below to create the schema.

- Copy the contents of the **2_APPSYNC/assets/schema.graphql** file
- In the **AppSync** console, under **Calorie Tracker App**, click **Schema** on the left navigation pane
- Select all the content of the schema editor and Paste the schema, then click **Save Schema**.

  ![AppSync Schema](images/appsync-schema.jpg)

At this point, we have the GraphQL schema ready for our app, but we do not have the resolvers configured. In next section, we will configure resolvers for our query, mutation and subscriber types.

#### Configure resolvers

GraphQL resolvers connect the fields in a type's schema to a data source. Resolvers are the mechanism by which requests are fulfilled. Resolvers in AWS AppSync use mapping templates written in Apache Velocity Template Language (VTL) to convert a GraphQL expression into a format the data source can use

We will configure query, mutation and subscription resolvers in this step. 

Make a note of your AppSync API ID.
- On the left navigation pane, select **Settings**.
- Click **Copy** button next to the API ID field.

  ![AppSync resolvers](../images/image-appsync-api.png)

Because we have a lot of resolvers to configure (for each query, mutation and subscription), in the interest of time, we will use a CloudFormation template to create resolvers for this workshop. However, feel free to open the *2_APPSYNC/templates/appsync-resolvers.yaml* file to see how resolvers are written, after the workshop. 

Click the following link to launch a CloudFormation stack. 

Region| Launch
------|-----
eu-west-1 (Ireland) | [![Launch](../images/cloudformation-launch-stack-button.png)](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/new?stackName=reinvent-cal-tracker-resolver&templateURL=https://s3-eu-west-1.amazonaws.com/aws-appsync-calorie-tracker-master/2_APPSYNC/templates/appsync-resolvers.yaml)

 Paste the API ID for the *AppSyncAPIId* parameter value and create the stack.

 ![AppSync resolvers](../images/image-resolvers-ds.png)

When stack creation is completed, you will have the resolvers configured and it will look like below screenshot.

  ![AppSync resolvers](images/appsync-resolvers.jpg)

## Step 3: Add Amazon DynamoDB (user-table) as Event Source for `add-new-user-bmi` Lambda

When a new user signup, the app captures their height and weight. Using this, we need to calculate their BMI which will be used later to provide diet suggestions. 

In this step, we will configure Amazon DynamoDB as an event source to `add-new-user-bmi` Lambda function.

- Go to AWS Lambda console.
- Click **add-new-user-bmi** function.
- Under **triggers** in the left pane, select **DynamoDB**
- Select `DynamoDB` in the center pane, scroll down to `Configure trigger` section

  ![BMI Lambda](../images/image-add-bmi-lambda.png)

- Select `caltrack_user_table` as DynamoDB Table
- Leave the batch size as default
- Starting position as `Latest`
- Ensure `Enable trigger` is checked and click `Add`

  ![BMI Lambda](../images/image-configure-trigger.png)

- Click `Save`

  ![Save](../images/image-lambda-save.png)

You have successfully configured DynamoDB as an event source for the Lambda function.

<details>
You can deploy all the resources of this module with one-click using the master template below. Use it only if you want to save time.
<summary><b>AWS AppSync Master CloudFormation template (Skip)</b></summary><p>

Region| Launch
------|-----
eu-west-1 (Ireland) | [![Launch](../images/cloudformation-launch-stack-button.png)](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/new?stackName=reinvent-calorie-tracker-module3&templateURL=https://s3-eu-west-1.amazonaws.com/aws-appsync-calorie-tracker-master/2_APPSYNC/templates/master.yaml)

Once the Cloudformation stack has completed, go to your `AWS Cloud9 terminal`, type the following command to load the sample activity categories (Make sure you are at the right directory):

```
aws dynamodb batch-write-item --request-items file://2_APPSYNC/assets/activity-categories.json --region eu-west-1
```
![Calories Aggregator function](../images/image-dynamo-batch-write.png)

Next, go to [3. Setup Lambda event source](#step-3-add-amazon-dynamodb-user-table-as-event-source-for-add-new-user-bmi-lambda)

</p></details>

-----

## Summary
**Congratulations!!** You have successfully completed module 2 in which you created DynamoDB tables, Lambda function and AWS AppSync GraphQL backend. We also configured DynamoDB as event source on **add-new-user-bmi** Lambda function.

Proceed to Module 3 - [Setup the frontend VueJS application](../3_FRONTEND_APP/README.md)

[Back to home page](../README.md)
