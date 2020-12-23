'use strict';

const gremlin = require('gremlin');

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const P = gremlin.process.P;
const __ = gremlin.process.statics;
const dc = new DriverRemoteConnection(`wss://${process.env.NEPTUNE_ENDPOINT}:${process.env.NEPTUNE_PORT}/gremlin`);
const graph = new Graph();
const g = graph.traversal().withRemote(dc);

let gremlinData = [];


const suggestedFoods = async (BMI, CALORIE_COUNT, SUGAR) => {

// Ideally we want to the use the below query but this returns Map and we need to use Graphson serializer.
// Couldnt find any NodeJS library on this. Hence adding to the TODO list
  // return await g.V().has('person', 'bmi', P.lte(BMI)).
  //   out('has').as('category').
  //   out('eats').
  //   has('calorie', P.lt(CALORIE_COUNT)).
  //   has('sugar', P.lt(SUGAR)).as('type').
  //   select('category','type').by('name').by('name').dedup().toList()


  return await g.V().has('person', 'bmi', P.lte(BMI)).
    out('has').as('category').
    out('eats').
    has('calorie', P.lt(CALORIE_COUNT)).
    has('sugar', P.lt(SUGAR)).as('type').
    select('type').by('name').dedup().toList()
}

exports.handler = async (event, context) => {

  let gremlinData;
  let suggestion = []
  console.log(`raw inputs - ${JSON.stringify(event)}`);

  const BMI = parseFloat(event.bmi);
  const CALORIE_COUNT = parseFloat(event.calorie) || 400;
  const SUGAR = parseFloat(event.sugar) || 2

  console.log(`BMI - ${BMI}, CALORIE_COUNT - ${CALORIE_COUNT}`)

  try {
    gremlinData = await suggestedFoods(BMI, CALORIE_COUNT, SUGAR);

    for (let i in gremlinData) {

      if (gremlinData[i].toLowerCase().includes('coffee')) {
        suggestion.push({
          "category": "Breakfast",
          "type": gremlinData[i]
        })
      } else
        if (gremlinData[i].toLowerCase().includes('french')) {
          suggestion.push({
            "category": "Snack",
            "type": gremlinData[i]
          })
        } else
          if (gremlinData[i].toLowerCase().includes('sandwiches')) {
            suggestion.push({
              "category": "Lunch",
              "type": gremlinData[i]
            })
          } else
            if (gremlinData[i].toLowerCase().includes('rice')) {
              suggestion.push({
                "category": "Lunch",
                "type": gremlinData[i]
              })

            } else
              if (gremlinData[i].toLowerCase().includes('tortilla')) {
                suggestion.push({
                  "category": "Snack",
                  "type": gremlinData[i]
                })
              }

    }

  } catch (err) {
    console.error(`[ERROR] ${err.message}`)
    console.log(err)
    context.fail(err);

  }

  return suggestion;
}
