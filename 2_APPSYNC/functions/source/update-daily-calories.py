from __future__ import print_function
from botocore.vendored import requests
import os
import json
import boto3
import datetime

print('Loading function')

CFN_SUCCESS = "SUCCESS"
CFN_FAILED = "FAILED"
dynamodb = boto3.resource('dynamodb')
print('User aggregate table name = '+os.environ['USER_CAL_AGG_TABLE'])
user_aggregate_table = dynamodb.Table(os.environ['USER_CAL_AGG_TABLE'])
add_calorie_types = ['Drink', 'Food']
burn_calorie_types = ['Exercise']

# Handler function
def lambda_handler(event, context):
    print(str(event))

    responseData = {}
    if 'RequestType' in event:
        if event['RequestType'] == 'Delete':
            responseData['Data'] = 'Delete event'
            try:
                send_cfnresponse(event, context, CFN_SUCCESS, responseData)
            except Exception as inst:
                print(inst)
                send_cfnresponse(event, context, CFN_FAILED, responseData)
        
        elif event['RequestType'] == 'Create':
            responseData['Data'] = 'Create event'
            try:
                send_cfnresponse(event, context, CFN_SUCCESS, responseData)
            except Exception as inst:
                print(inst)
                send_cfnresponse(event, context, CFN_FAILED, responseData)
    else:
        for record in event['Records']:
            if record['eventName'] == "REMOVE":
                print("Delete item event found. Skipping record")
                return 'Delete event'
            else:
                print(json.dumps(record, indent=2))
                print("***")
                activity_details = get_activity_detaiils(record["dynamodb"])
                userid = activity_details[0]
                calories = activity_details[1]
                category = activity_details[2]
                
                # if all values are not none, then update user table
                if all([userid, calories, category]):
                    update_remaining_calories(userid, calories, category)
                
                return 'Successfully processed records.'

# Get user id, calories and activity category
def get_activity_detaiils(record):
    
    if 'NewImage' in record:
        if 'userid' in record['NewImage']:
            userid = record['NewImage']['userid']["S"]

    if 'NewImage' in record:
        if 'caloriesConsumed' in record['NewImage']:
            calorie = record['NewImage']['caloriesConsumed']["N"]
    
    if 'NewImage' in record:
        if 'category' in record['NewImage']:
            category = record['NewImage']['category']["S"]

    return (userid, calorie, category)

# Update remaining calories for the user
def update_remaining_calories(userid, calories, category):
    
    if category in add_calorie_types:
        increase_calories_consumed(userid, calories)
    elif category in burn_calorie_types:
        reduce_calories_consumed(userid, calories)
    else:
        print("Invalid category")
        
    return "Remaining calories updated successfully!"
    
# Increment calories consumed
def increase_calories_consumed(userid, calories):
    date = datetime.datetime.now().date().isoformat()
    
    response = user_aggregate_table.update_item(
        Key={'userid': userid, 'date': date}, 
        UpdateExpression="SET caloriesConsumed = if_not_exists(caloriesConsumed, :initial) + :val", 
        ExpressionAttributeValues={
            ":val": int(calories), 
            ":initial" : int("0")
        }, 
        ReturnValues="UPDATED_NEW"
    )
    
# Decrement calories consumed
def reduce_calories_consumed(userid, calories):
    date = datetime.datetime.now().date().isoformat()
    
    response = user_aggregate_table.update_item(
        Key={'userid': userid, 'date': date}, 
        UpdateExpression="set caloriesBurned = if_not_exists(caloriesBurned, :initial) + :val", 
        ExpressionAttributeValues={
            ":val": int(calories),
            ":initial" : int("0")
        }, 
        ReturnValues="UPDATED_NEW")

#  Copyright 2016 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
#  This file is licensed to you under the AWS Customer Agreement (the "License").
#  You may not use this file except in compliance with the License.
#  A copy of the License is located at http://aws.amazon.com/agreement/ .
#  This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied.
#  See the License for the specific language governing permissions and limitations under the License.
def send_cfnresponse(event, context, responseStatus, responseData, physicalResourceId=None, noEcho=False):
    responseUrl = event['ResponseURL']

    print(responseUrl)

    responseBody = {}
    responseBody['Status'] = responseStatus
    responseBody['Reason'] = 'See the details in CloudWatch Log Stream: ' + context.log_stream_name
    responseBody['PhysicalResourceId'] = physicalResourceId or context.log_stream_name
    responseBody['StackId'] = event['StackId']
    responseBody['RequestId'] = event['RequestId']
    responseBody['LogicalResourceId'] = event['LogicalResourceId']
    responseBody['NoEcho'] = noEcho
    responseBody['Data'] = responseData

    json_responseBody = json.dumps(responseBody)

    print("Response body:\n" + json_responseBody)

    headers = {
        'content-type' : '',
        'content-length' : str(len(json_responseBody))
    }

    try:
        response = requests.put(responseUrl,
                                data=json_responseBody,
                                headers=headers)
        print("Status code: " + response.reason)
    except Exception as e:
        print("send(..) failed executing requests.put(..): " + str(e))