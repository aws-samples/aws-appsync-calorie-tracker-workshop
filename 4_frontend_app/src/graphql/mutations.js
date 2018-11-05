// eslint-disable
// this is an auto generated file. This will be overwritten

export const createActivity = `mutation CreateActivity($input: CreateActivityInput!) {
  createActivity(input: $input) {
    caloriesConsumed
    category
    creationDateTime
    id
    type
    userid
  }
}
`;
export const createActivityCategory = `mutation CreateActivityCategory($input: CreateActivityCategoryInput!) {
  createActivityCategory(input: $input) {
    category
    type
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const createUserAggregate = `mutation CreateUserAggregate($input: CreateUserAggregateInput!) {
  createUserAggregate(input: $input) {
    caloriesBurned
    caloriesConsumed
    date
    userid
  }
}
`;
export const deleteActivity = `mutation DeleteActivity($input: DeleteActivityInput!) {
  deleteActivity(input: $input) {
    caloriesConsumed
    category
    creationDateTime
    id
    type
    userid
  }
}
`;
export const deleteActivityCategory = `mutation DeleteActivityCategory($input: DeleteActivityCategoryInput!) {
  deleteActivityCategory(input: $input) {
    category
    type
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const deleteUserAggregate = `mutation DeleteUserAggregate($input: DeleteUserAggregateInput!) {
  deleteUserAggregate(input: $input) {
    caloriesBurned
    caloriesConsumed
    date
    userid
  }
}
`;
export const updateActivity = `mutation UpdateActivity($input: UpdateActivityInput!) {
  updateActivity(input: $input) {
    caloriesConsumed
    category
    creationDateTime
    id
    type
    userid
  }
}
`;
export const updateActivityCategory = `mutation UpdateActivityCategory($input: UpdateActivityCategoryInput!) {
  updateActivityCategory(input: $input) {
    category
    type
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const updateUserAggregate = `mutation UpdateUserAggregate($input: UpdateUserAggregateInput!) {
  updateUserAggregate(input: $input) {
    caloriesBurned
    caloriesConsumed
    date
    userid
  }
}
`;
