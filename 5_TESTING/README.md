# Module 5: Testing the Calorie Tracker application end to end

### Signup new user

![Signup](../images/login.png)

### Register

![register](../images/register.png)

### Setup your height, weight and daily calorie goal

![register](../images/personal_details.png)

### Add activities for each of the categories

![add activities](../images/add_activities.png)

### View the dashboard in the home page

![add activities](../images/dashboard.png)

---
### Next, lets check the suggested food

Oops!!!. if you find the page spinning and dont get any suggestions, lets configure it and get it working

#### Step 1: Setup a new Appsync Data source:

1. Go to AWS Appsync console, `data source`.

![AppSync DS](../images/image-appsync-datasource.png)

2. Click `New`, Data Source Name: `suggestedFood`
3. Data Source type as `AWS Lambda function`
4. Region: `EU-WEST-1` and function ARN as `suggested-food-for-user`
5. Create a new role and click `Create`

#### Step 2: Adding suggestedFood query to Appsync schema:
1. Under your Appsync schema, locate `type Query`, ensure you have `suggestedFood` query. If not, please add the following after `listUsers` and `Save Schema`.

```
	suggestedFood(
		bmi: Float,
		calorie: Float,
		sugar: Float,
		userid: String!
	): [Activity]

```
2. Under `Resolvers` in the right pane, locate suggestedFood

![AppSync DS](../images/image-resolvers-suggested.png)

3. Click Attach
4. `Create a New Resolver`
5. Select `suggesteFood` data source that was created in Step 1

![New Resolver](../images/create-suggested-food-resolver.png)

6. Save Resolver.

#### Step 3: Updating the graphql schema in your code:

Within `4_FRONTEND_APP/src/graphql/queries.js`, update the `suggestedFood` schema to return only category and type. Save the code change.

```Javascript
export const suggestedFood = `query SuggestedFood(
  $userid: String!
  $bmi: Float
  $calorie: Float
  $sugar: Float
) {
  suggestedFood(userid: $userid, bmi: $bmi, calorie: $calorie, sugar: $sugar) {
    category
    type
  }
}
`;
```

Start the application and should see the suggestions being returned

```bash
$ npm start
```

![New Resolver](../images/suggestions.png)


###  Build app for production

We will be using AWS Amplify to build, push and host our app on S3. Simply run within your Cloud9 terminal:

```
$ amplify add hosting
```

And pick 'PROD' as the environment and leave all other options at their default value. 

Once you're ready, run the `$ amplify publish` command. Amplify will then build the app using Webpack, upload the assests to the designated S3 Bucket and setup all the necessary configuration and permissions to host the app on that bucket. As a bonus we also get Cloudfront in front of the bucket to cache all the static assests (HTML, JavaScript, etc.) and make our app blazing fast!

You should see something similar to this message once done:

![Screenshot-9](../images/readme-9.png)

Congrats! The app is now live in production.

### Other Ideas:
- Login to app using Cognito's Federated Auth - Facebook
- Fine tune the gremlin query to provide personalized suggestions

[Proceed to next section - Closing and Cleanup](../6_CLEANUP/README.md)

[Back to home page](../README.md)