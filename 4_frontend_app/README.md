### 0. OPTIONAL: Provision a Cloud9 Environment.

We'd recommend using a t2.small or above for best performance. There's no need for the environment to be deployed to a specific VPC.

Once the environment is ready to use, use nvm to upgrade the current Node revision to v8:

```
$ nvm install 8
```

### 1. Clone the code from Github[TODO: CORRECT URL]
```
$ git clone https://github.com/aws-samples/aws-appsync-calorie-tracker-workshop aws-appsync-calorie-tracker-workshop
```

Repository will be downloaded into `calorie-tracker/` folder. CD into the folder and install dependencies:

``` bash
$ cd aws-appsync-calorie-tracker-workshop/4_frontend_app/ && npm install
```

### 2. Install dependencies and AWS Amplify

Now to install and configure[AWS Amplify](https://aws-amplify.github.io/). AWS Amplify includes:

* a JavaScript library with support for React Native and web frameworks including 
React, Angular, Vue and Ionic
* a style guide including UI components
* the Amplify CLI with support for managing the serverless backend, web hosting, and codegen

Start by running:

``` bash
$ npm install -g @aws-amplify/cli
$ amplify configure
```

Follow the onscreen instructions to configure your environmental settings and create an IAM User for the Amplify service.

Make sure to set the default region to the same region where the AppSync and Neptune were created in previous steps.

### 3. Initalize AmplifyJS

From the root of the app directory run:

``` bash
$ amplify init
```

Follow the onscreen questions. We'll be using Javascript as our language and Vue as the Framework. You'll also need to change the value of the 3 questions. See below:

![Screenshot-1](../images/readme-1.png)

Once this stage is done and after you've chosen the AWS Profile you'd like to use for this project, Amplify will sync between the project to the cloud.

![Screenshot-2](../images/readme-2.png)


### 3. Setup Cognito Authentication

The app is now ready to run, but it won't be able to do much without an authentication backend. Luckily, Amplify can create a Cognito User Pool for us and point the client-side code to use it.

To add Cognito authentication, run:

```bash
$ amplify add auth
```

Choose the 'No, I will set up my own configuration' option, and then 'User Sign-Up & Sign-In only (Best used with a cloud API only)'. You can leave the default option for the rest of the questions.

The end result should look something like this:

![Screenshot-3](../images/readme-3.png)

Once done, the Amplify client-side library is configured to point all Auth API requests to the Cognito Pool we've just created.

But wait a minute, we haven't created anything aside for a bunch of local configuration files and a Cloudformation template. See `./amplify/backend/auth/{{labelname}}/` for the full details.

To create the Cognito endpoint we've just configured in your AWS account simply run:

```bash
$ amplify push auth
```

The Cloudformation template will take about a minute or two to run, and once done the app should be able to authenticate and register new users!

![Screenshot-4](../images/readme-4.png)

Pop over to the AWS Console if you'd like to take a better look at the newly created Cognito User Pool. 


### 4. Generate the AppSync Code

In the last stage we added Cognito Authentication to our app. The next step would be to generate the AppSync Queries, Mutations and Subscriptions for us by parsing the AppSync GraphQL Schema in the AWS Account.

Start by logging into the [AWS AppSync Console](https://us-west-2.console.aws.amazon.com/appsync/home) and scroll to the `"Integrate Your App"` section and choosing the JavaScript option, then copy the codegen code snippet.

![Screenshot-5](../images/readme-5.png)

Click through the onscreen options:

![Screenshot-6](../images/readme-6.png)

Viola! Amplify just fetched all avaliable queries, mutations ans subscriptions from our AppSync Schema and generated their respective code snippets in the `src/graphql` folder. Browse to this folder with your favourite IDE, we'll need to add 2 queries that Amplify did not generate.

At the `src/graphql/queries.js` file add the following queries:

####getUserBmi:

```javascript
export const getUserBmi = `query getUser($id: String!) {
  getUser(id: $id) {
    bmi
  }
}`
``` 


#### ListActivityCategories:

```javascript
export const listActivityCategoriesOnly = `query ListActivityCategories(
  $filter: TableActivityCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listActivityCategories(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      category
    }
    nextToken
  }
}
`;
```

There would be some scenarios where the client-side code would only need to fetch specific values for specific parameters. 

In REST-based APIs this could be achieved in two eays: 

1. Getting all available fields and then cherrypicking the necessary values on the clide-side. This solution should work, however it is not cost effective and may not scale well when you'll have millions (or more!) of concurrent clients polling your API for data.

2. Making a server-side change to the API by adding an additional GET query to return only the necessary parameters that are needed. This solution is effective, but it also complicated your development cycles, as each of these changes would require a production change to your APIs.

Luckily this is not an issue with GraphQL. As you can see in the queries we've added above, we can specify which parameters should be returned at runtime. No performance penalty, no changes to our precious production API.

Once the additional queries were added, Save the `queries.js` file and return to the terminal.

### 5. Run the app locally

To start the app in development mode, run:

```bash
$ npm start
```

After Webpack is done arranging the compiling all of the App's assests, you should be seeing the following message:

![Screenshot-7](../images/readme-7.png)

If you've chosen your local machine as your development box, simply browse to `https://localhost:8080` and have a look through the app. Since we're building a mobile app, we would recommend using your browser's development toolbar to mimic an actual iPhone 6 device screen:

![Screenshot-8](../images/readme-8.png)

If you're presented with the login screen, we're good to go! 

Try running through an actual user flow. Register yourself as a new user (Cognito), add, view and delete activities (AppSync) and get recommendations to meet your calories per day target (Neptune).

To better understand how the app works, browse through the various pages and use the Developer Toolbar to trace the GraphQL calls between the app the AWS AppSync Endpoint. 


### 4. Build app for production

#WIP

We will be using AWS Amplify to build, push and host our app on S3. Simply run:

```
$ amplify add hosting
```

And pick 'PROD' as the environment and leave all other options at their default value. 

Once you're ready, run the `$ amplify publish` command. Amplify will then build the app using Webpack, upload the assests to the designated S3 Bucket and setup all the necessary configuration and permissions to host the app on that bucket. As a bonus we also get Cloudfront in front of the bucket to cache all the static assests (HTML, JavaScript, etc.) and make our app blazing fast!

You should see something similar to this message once done:

![Screenshot-9](../images/readme-9.png)

Congrats! The app is now live in production.

Next, [bonus round](../5_bonus_round/README.md)

[Back to home page](../README.md)


