'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

//Create a Translator object, which comes from the DocumentClient
var dynamodbTranslator = dynamodb.getTranslator();

//It needs a SDK 'shape'. The individual Items in the Stream record
//are themselves the same Item shape as we see in a getItem response
var ItemShape = dynamodb.service.api.operations.getItem.output.members.Item;


exports.handler = async (event, context) => {

    try {
        for (let record of event.Records) {
            console.log(`RAW record - ${JSON.stringify(event)}`)
            record.dynamodb.NewImage = dynamodbTranslator.translateOutput(record.dynamodb.NewImage, ItemShape);

            if (record.eventName === "INSERT" && !record.dynamodb.NewImage.bmi) {                
                let weight = parseFloat(record.dynamodb.NewImage.weight);
                let height = parseFloat(record.dynamodb.NewImage.height);

                var params = {
                    TableName: "caltrack_user_table" || process.env.CALTRACK_USER_TABLE,
                    Key: {
                        "id": record.dynamodb.NewImage.id
                    },
                    UpdateExpression: "set bmi= :d",
                    ExpressionAttributeValues: {
                        ":d": weight*10000/(height*height)  // weight should be in kg and height should be in cm
                    },
                    ReturnValues: "UPDATED_NEW"
                };

                // adds BMI to the new created user
                let updateUserBMI = await dynamodb.update(params).promise();
                console.log(updateUserBMI);   
                
            }

            // TODO
            // add an vertex in Amazon Neptune for the new user

        }

    } catch (err) {
        console.error(`[ERROR] ${err.message}`)
        console.log(JSON.stringify(err))
        context.fail(err);
    }

}