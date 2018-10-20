'use strict';

const gremlin = require('gremlin');
const _uniqBy = require('lodash.uniqby');
const _groupBy = require('lodash.groupby');
const _foreach = require('lodash.foreach');

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const P = gremlin.process.P;
const __ = gremlin.process.statics;
const dc = new DriverRemoteConnection(`ws://${process.env.NEPTUNE_ENDPOINT}:${process.env.NEPTUNE_PORT}/gremlin`);
const graph = new Graph();
const g = graph.traversal().withRemote(dc);

const suggestedFoods = async(BMI,CALORIE_COUNT,SUGAR) => {
  return await g.V().has('person','bmi',P.lte(BMI)).
            out('has').id().as('category').
            out('eats').
            filter(__.values('calorie').is(P.lt(CALORIE_COUNT))).
            filter(__.values('sugar').is(P.lt(SUGAR))).values('name').as('type').
            select('category','type').dedup().toList();
}

exports.handler = async (event,context) => {

  let suggestions=[];
  console.log(`raw inputs - ${JSON.stringify(event)}`);

  const BMI = parseFloat(event.bmi);
  const CALORIE_COUNT = parseFloat(event.calorie)
  const SUGAR = parseFloat(event.sugar) || 2

  try {
    suggestions = await suggestedFoods(BMI,CALORIE_COUNT,SUGAR);

  } catch (err) {
    console.error(`[ERROR] ${err.message}`)
    console.log(JSON.stringify(err))
    context.fail(err);
    
  }  
  return suggestions;
  
}
