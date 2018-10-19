// this is an auto generated file. This will be overwritten
export const CreateActivity = `
  mutation CreateActivity($input: CreateActivityInput!) {
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
export const CreateActivityCategory = `
  mutation CreateActivityCategory($input: CreateActivityCategoryInput!) {
    createActivityCategory(input: $input) {
      category
      type
    }
  }
`;
export const CreateUser = `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      caloriesConsumed
      caloriesTargetPerDay
      height
      id
      username
      weight
    }
  }
`;
export const CreateUserAggregate = `
  mutation CreateUserAggregate($input: CreateUserAggregateInput!) {
    createUserAggregate(input: $input) {
      caloriesBurned
      caloriesConsumed
      date
      userid
    }
  }
`;
export const DeleteActivity = `
  mutation DeleteActivity($input: DeleteActivityInput!) {
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
export const DeleteActivityCategory = `
  mutation DeleteActivityCategory($input: DeleteActivityCategoryInput!) {
    deleteActivityCategory(input: $input) {
      category
      type
    }
  }
`;
export const DeleteUser = `
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      caloriesConsumed
      caloriesTargetPerDay
      height
      id
      username
      weight
    }
  }
`;
export const DeleteUserAggregate = `
  mutation DeleteUserAggregate($input: DeleteUserAggregateInput!) {
    deleteUserAggregate(input: $input) {
      caloriesBurned
      caloriesConsumed
      date
      userid
    }
  }
`;
export const UpdateActivity = `
  mutation UpdateActivity($input: UpdateActivityInput!) {
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
export const UpdateActivityCategory = `
  mutation UpdateActivityCategory($input: UpdateActivityCategoryInput!) {
    updateActivityCategory(input: $input) {
      category
      type
    }
  }
`;
export const UpdateUser = `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      caloriesConsumed
      caloriesTargetPerDay
      height
      id
      username
      weight
    }
  }
`;
export const UpdateUserAggregate = `
  mutation UpdateUserAggregate($input: UpdateUserAggregateInput!) {
    updateUserAggregate(input: $input) {
      caloriesBurned
      caloriesConsumed
      date
      userid
    }
  }
`;
