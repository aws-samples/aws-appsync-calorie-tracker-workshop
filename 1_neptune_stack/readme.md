# Deploying Food Suggestions

Copy the `datasets`, `functions`, and `templates` directory into an S3 bucket.

Launch the follwing CFN template. Use one of the following AWS region 

   - us-east-1 / US East (N. Virginia) Region
   - us-east-2 / US East (Ohio) Region
   - us-west-2 / US West (Oregon) Region
   - eu-west-1 / EU (Ireland) Region

The above template will create a Neptune DB cluster within a VPC, suggestion lambda function (vpc enabled) and an EC2 client with gremlin enabled.

------
## Creating Amazon S3 VPC Endpoint

Before loading the above datasets from S3, we need to create a Amazon S3 VPC Endpoints 

1. Sign in to the AWS Management Console and open the Amazon VPC console at https://console.aws.amazon.com/vpc/.

2. In the left navigation pane, choose Endpoints.

3. Choose Create Endpoint.

4. Choose the Service Name `com.amazonaws.region.s3`.

> Note:
>   Please make sure the console region is correct.

5. Choose the VPC that contains your Neptune DB instance.

6. Select the check box next to the route tables that are associated with the subnets related to your cluster. If you only have one route table, you must select that box.

7. Under `Policy`, copy the following

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": "*"
        }
    ]
}

```

8. Choose Create Endpoint.

----------
## Loading the given food dataset into Amazon Neptune

The datasets that needs to be loaded into Amazon Neptune are available in datasets folder

`Vertex.csv` contains userId, demographics information about the user such as weight (kg), height (cm) and their BMI. 

`food_edges.txt` contains the gremlin queries that creates the edges/relationships between the vertices.

Step 1: SSH into the EC2 client and type the following:

```
curl -X POST \
    -H 'Content-Type: application/json' \
    http://your-neptune-endpoint:8182/loader -d '
    { 
      "source" : "s3://your-s3-bucket/vertex.csv, 
      "iamRoleArn" : "arn:aws:iam::account-id:role/role-name",
      "format" : "csv", 
      "region" : "<region>", 
      "failOnError" : "FALSE"
    }'
```

> Replace the neptune loader endpoint, source S3 and IAM Role ARN. Get all these values from CFN outputs.

You can check the status of your load with the following command:

```
curl http://your-neptune-endpoint:8182/loader?loadId=[loadId value]
```

Step 2: Next, copy and paste the following

```
cd apache-tinkerpop-gremlin-console-3.3.2
bin/gremlin.sh
:remote connect tinkerpop.server conf/neptune-remote.yaml
:remote console
```

Step 3: Copy and paste all the queries from `food_edges.txt` into the gremlin console

Test the following queries:

Prints all the Vertices
```
g.V().count()
```

Returns the list of users whose BMI < 24

```
g.V().has('BMI',lte(24)) 
```

----
## Testing the FoodSuggestor lambda function

- Click test
- Enter a new event name. Leave the rest as default and click `create`
- Test the lambda function which should return a list of recommended food based on the given BMI (under Environment variables).

[Proceed to next section - Amazon AppSync](../2_appsync_stack/README.md)

[Back to home page](../README.md)
