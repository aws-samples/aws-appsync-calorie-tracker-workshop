// this is an auto generated file. This will be overwritten
export const OnCreateActivity = `
  subscription OnCreateActivity(
    $caloriesConsumed: Int
    $id: String
    $userid: String
  ) {
    onCreateActivity(
      caloriesConsumed: $caloriesConsumed
      id: $id
      userid: $userid
    ) {
      caloriesConsumed
      category
      creationDateTime
      id
      type
      userid
    }
  }
`;
export const OnCreateActivityCategory = `
  subscription OnCreateActivityCategory($category: String, $type: String) {
    onCreateActivityCategory(category: $category, type: $type) {
      category
      type
    }
  }
`;
export const OnCreateUser = `
  subscription OnCreateUser(
    $caloriesTargetPerDay: Int
    $height: Float
    $id: ID
    $username: String
    $weight: Float
  ) {
    onCreateUser(
      caloriesTargetPerDay: $caloriesTargetPerDay
      height: $height
      id: $id
      username: $username
      weight: $weight
    ) {
      caloriesConsumed
      caloriesTargetPerDay
      height
      id
      username
      weight
    }
  }
`;
export const OnCreateUserAggregate = `
  subscription OnCreateUserAggregate(
    $caloriesBurned: Int
    $caloriesConsumed: Int
    $date: String
    $userid: String
  ) {
    onCreateUserAggregate(
      caloriesBurned: $caloriesBurned
      caloriesConsumed: $caloriesConsumed
      date: $date
      userid: $userid
    ) {
      caloriesBurned
      caloriesConsumed
      date
      userid
    }
  }
`;
export const OnDeleteActivity = `
  subscription OnDeleteActivity(
    $caloriesConsumed: Int
    $id: String
    $userid: String
  ) {
    onDeleteActivity(
      caloriesConsumed: $caloriesConsumed
      id: $id
      userid: $userid
    ) {
      caloriesConsumed
      category
      creationDateTime
      id
      type
      userid
    }
  }
`;
export const OnDeleteActivityCategory = `
  subscription OnDeleteActivityCategory($category: String, $type: String) {
    onDeleteActivityCategory(category: $category, type: $type) {
      category
      type
    }
  }
`;
export const OnDeleteUser = `
  subscription OnDeleteUser(
    $caloriesTargetPerDay: Int
    $height: Float
    $id: ID
    $username: String
    $weight: Float
  ) {
    onDeleteUser(
      caloriesTargetPerDay: $caloriesTargetPerDay
      height: $height
      id: $id
      username: $username
      weight: $weight
    ) {
      caloriesConsumed
      caloriesTargetPerDay
      height
      id
      username
      weight
    }
  }
`;
export const OnDeleteUserAggregate = `
  subscription OnDeleteUserAggregate(
    $caloriesBurned: Int
    $caloriesConsumed: Int
    $date: String
    $userid: String
  ) {
    onDeleteUserAggregate(
      caloriesBurned: $caloriesBurned
      caloriesConsumed: $caloriesConsumed
      date: $date
      userid: $userid
    ) {
      caloriesBurned
      caloriesConsumed
      date
      userid
    }
  }
`;
export const OnUpdateActivity = `
  subscription OnUpdateActivity(
    $caloriesConsumed: Int
    $id: String
    $userid: String
  ) {
    onUpdateActivity(
      caloriesConsumed: $caloriesConsumed
      id: $id
      userid: $userid
    ) {
      caloriesConsumed
      category
      creationDateTime
      id
      type
      userid
    }
  }
`;
export const OnUpdateActivityCategory = `
  subscription OnUpdateActivityCategory($category: String, $type: String) {
    onUpdateActivityCategory(category: $category, type: $type) {
      category
      type
    }
  }
`;
export const OnUpdateUser = `
  subscription OnUpdateUser(
    $caloriesTargetPerDay: Int
    $height: Float
    $id: ID
    $username: String
    $weight: Float
  ) {
    onUpdateUser(
      caloriesTargetPerDay: $caloriesTargetPerDay
      height: $height
      id: $id
      username: $username
      weight: $weight
    ) {
      caloriesConsumed
      caloriesTargetPerDay
      height
      id
      username
      weight
    }
  }
`;
export const OnUpdateUserAggregate = `
  subscription OnUpdateUserAggregate(
    $caloriesBurned: Int
    $caloriesConsumed: Int
    $date: String
    $userid: String
  ) {
    onUpdateUserAggregate(
      caloriesBurned: $caloriesBurned
      caloriesConsumed: $caloriesConsumed
      date: $date
      userid: $userid
    ) {
      caloriesBurned
      caloriesConsumed
      date
      userid
    }
  }
`;
