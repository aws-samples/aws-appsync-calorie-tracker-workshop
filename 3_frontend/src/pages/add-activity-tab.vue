<template>
  <div id="addActivity">
    <f7-block>
        <center><img src="static/appsync-logo.svg" width=33% height=33%></center>
    </f7-block>

    <f7-block-title>Add Activity</f7-block-title>
    <f7-list inline-labels no-hairlines-md>

      <f7-list-item title="Category" smart-select :smart-select-params="{openIn: 'popover'}">
        <select @change="selectCategory()" name="category" v-model="selectedCategory">
          <option v-for="item in categories" v-bind:value="item.category">{{item.category}}</option>
        </select>
      </f7-list-item>
      
      <f7-list-item title="Type" smart-select :smart-select-params="{openIn: 'popover'}" v-if="selectedCategory">
        <select @change="selectType()" name="type" v-model="selectedType">
          <option v-for="item in types" v-bind:value="item">{{item}}</option> 
        </select>
      </f7-list-item>

      <f7-list-item v-if="selectedType">
        <f7-input @change="addButtonDisabled = false" :value="calories" @input="calories = $event.target.value" type="text" placeholder="Calories" error-message="Only numbers please!" required validate pattern="[0-9]*"></f7-input>
      </f7-list-item>

    </f7-list>

    <f7-block>
      <f7-row>
        <f7-col>
          <f7-button @click="add()" :disabled='addButtonDisabled'>Add</f7-button>
        </f7-col>
        <f7-col>
          <f7-button @click="reset()">Reset</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    </f7-list>

    <f7-block-footer>
        <center>Powered by <f7-link href="https://aws.amazon.com/appsync/" external>AWS AppSync</f7-link></center>
    </f7-block-footer> 

  </div>
</template>

<script>
import { API, Cache, graphqlOperation } from 'aws-amplify'
import { ListActivityCategories } from '../graphql/queries'
import { CreateActivity } from '../graphql/mutations' 

export default {
  data () {
    return {
      categories: [],
      types: [],
      selectedCategory: '',
      selectedType: '',
      calories: null,
      addButtonDisabled: true
    }
  },
  async created() {
    try {
      const { data: { listActivityCategories: { items }} } = await API.graphql(graphqlOperation(ListActivityCategories))

      this.categories = items

    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    selectCategory() {
      // Reset selected type in case in old value is present  
      this.selectedType = ''

      this.types = this.categories.find(k => k.category === this.selectedCategory).type
    },
    selectType() {
      this.calories = null
    },
    reset() {
      this.selectedCategory = ''
      this.selectedType = ''
      this.calories = null
      this.addButtonDisabled = true
    },
    // Post new activity to DDB using a GraphQL Mutation
    async add() {
      // Display preloader
      this.$f7.dialog.preloader('Adding...')

      // Build input object. This should be posted as part of the GraphQL Mutation
      const activity = {
        input: {
          category: this.selectedCategory,
          type: this.selectedType, 
          caloriesConsumed: this.calories,
          userid: Cache.getItem('username')
        }
      }

      // Perform Mutation
      try {
        await API.graphql(graphqlOperation(CreateActivity, activity))
      } catch (err) {
        // Uh oh! Something went run.
        console.log('error:' + err)
      }

      // Success! Close preloader and reset input fields
      this.reset()
      this.$f7.dialog.close()
    }
  }
}
</script>