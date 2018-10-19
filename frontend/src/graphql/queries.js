// this is an auto generated file. This will be overwritten
export const GetActivity = `
  query GetActivity($id: String!) {
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
export const GetActivityCategory = `
  query GetActivityCategory($category: String!) {
    getActivityCategory(category: $category) {
      category
      type
    }
  }
`;
export const GetUser = `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      caloriesConsumed
      caloriesTargetPerDay
      height
      id
      username
      weight
    }
  }
`;
export const GetUserAggregate = `
  query GetUserAggregate($date: String!, $userid: String!) {
    getUserAggregate(date: $date, userid: $userid) {
      caloriesBurned
      caloriesConsumed
      date
      userid
    }
  }
`;
export const ListActivities = `
  query ListActivities(
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
export const ListActivitiesOrdered = `
  query ListActivitiesOrdered(
    $userid: String!
    $limit: Int
    $nextToken: String
  ) {
    listActivitiesOrdered(
      userid: $userid
      limit: $limit
      nextToken: $nextToken
    ) {
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

export const ListActivityCategories = `
  query ListActivityCategories(
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

export const ListActivityCategoriesOnly = `
  query ListActivityCategories(
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

export const ListUserAggregates = `
  query ListUserAggregates(
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
export const ListUsers = `
  query ListUsers(
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
      }
      nextToken
    }
  }
`;
