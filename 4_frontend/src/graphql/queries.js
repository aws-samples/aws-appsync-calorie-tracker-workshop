// eslint-disable
// this is an auto generated file. This will be overwritten

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
    caloriesConsumed
    caloriesTargetPerDay
    height
    id
    username
    weight
    bmi
  }
}
`;

export const getUserBmi = `query GetUser($id: ID!) {
  getUser(id: $id) {
    bmi
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
export const listActivitiesOrdered = `query ListActivitiesOrdered($userid: String!, $limit: Int, $nextToken: String) {
  listActivitiesOrdered(userid: $userid, limit: $limit, nextToken: $nextToken) {
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
      caloriesConsumed
      caloriesTargetPerDay
      height
      id
      username
      weight
      bmi
    }
    nextToken
  }
}
`;



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
