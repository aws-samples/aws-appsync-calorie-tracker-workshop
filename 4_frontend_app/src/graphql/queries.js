// eslint-disable
// this is an auto generated file. This will be overwritten

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

export const getUserBmi = `query getUser($id: String!) {
  getUser(id: $id) {
    bmi
  }
}`

export const getActivity = `query GetActivity($id: String!) {
  getActivity(id: $id) {
    caloriesConsumed
    category
    creationDateTime
    id
    type
    userid
  }
}
`;
export const getActivityCategory = `query GetActivityCategory($category: String!) {
  getActivityCategory(category: $category) {
    category
    type
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    bmi
    caloriesConsumed
    caloriesTargetPerDay
    height
    id
    username
    weight
  }
}
`;
export const getUserAggregate = `query GetUserAggregate($date: String!, $userid: String!) {
  getUserAggregate(date: $date, userid: $userid) {
    caloriesBurned
    caloriesConsumed
    date
    userid
  }
}
`;
export const listActivities = `query ListActivities(
  $filter: TableActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  listActivities(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      caloriesConsumed
      category
      creationDateTime
      id
      type
      userid
    }
    nextToken
  }
}
`;
export const listActivitiesOrdered = `query ListActivitiesOrdered($limit: Int, $nextToken: String, $userid: String!) {
  listActivitiesOrdered(limit: $limit, nextToken: $nextToken, userid: $userid) {
    items {
      caloriesConsumed
      category
      creationDateTime
      id
      type
      userid
    }
    nextToken
  }
}
`;
export const listActivityCategories = `query ListActivityCategories(
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
      type
    }
    nextToken
  }
}
`;
export const listUserAggregates = `query ListUserAggregates(
  $filter: TableUserAggregateFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserAggregates(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      caloriesBurned
      caloriesConsumed
      date
      userid
    }
    nextToken
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: TableUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      bmi
      caloriesConsumed
      caloriesTargetPerDay
      height
      id
      username
      weight
    }
    nextToken
  }
}
`;
export const suggestedFood = `query SuggestedFood(
  $bmi: Float
  $calorie: Float
  $sugar: Float
  $userid: String!
) {
  suggestedFood(bmi: $bmi, calorie: $calorie, sugar: $sugar, userid: $userid) {
    caloriesConsumed
    category
    creationDateTime
    id
    type
    userid
  }
}
`;
