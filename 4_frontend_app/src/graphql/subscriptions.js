// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateActivity = `subscription OnCreateActivity(
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
export const onCreateActivityCategory = `subscription OnCreateActivityCategory($category: String, $type: String) {
  onCreateActivityCategory(category: $category, type: $type) {
    category
    type
  }
}
`;
export const onCreateUser = `subscription OnCreateUser(
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
export const onCreateUserAggregate = `subscription OnCreateUserAggregate(
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
export const onDeleteActivity = `subscription OnDeleteActivity {
  onDeleteActivity {
    caloriesConsumed
    category
    creationDateTime
    id
    type
    userid
  }
}
`;
export const onDeleteActivityCategory = `subscription OnDeleteActivityCategory($category: String, $type: String) {
  onDeleteActivityCategory(category: $category, type: $type) {
    category
    type
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser(
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
export const onDeleteUserAggregate = `subscription OnDeleteUserAggregate(
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
export const onUpdateActivity = `subscription OnUpdateActivity(
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
export const onUpdateActivityCategory = `subscription OnUpdateActivityCategory($category: String, $type: String) {
  onUpdateActivityCategory(category: $category, type: $type) {
    category
    type
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser(
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
export const onUpdateUserAggregate = `subscription OnUpdateUserAggregate(
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
