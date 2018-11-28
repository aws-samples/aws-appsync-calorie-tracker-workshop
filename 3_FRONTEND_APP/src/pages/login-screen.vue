<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <f7-login-screen-title>Hello!</f7-login-screen-title>
    <f7-block>
      <center><img src="static/cognito-logo.svg" width=50% height=50%></center>
    </f7-block>
    <f7-list form>
      <f7-list-item>
        <f7-label>Username</f7-label>
        <f7-input type="text" placeholder="Your username" @input="username = $event.target.value"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Password</f7-label>
        <f7-input type="password" placeholder="Your password" @input="password = $event.target.value"></f7-input>
      </f7-list-item>
    </f7-list>
    <f7-list>
      <f7-list-button @click="signIn">Sign In</f7-list-button>
      <f7-list-button @click="$f7router.navigate('/register/')">Register</f7-list-button>
      <f7-block-footer>Some text about login information.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</f7-block-footer>
    </f7-list>
  </f7-page>
</template>

<script>
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { getUserBmi } from '../graphql/queries'

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async redirectUser() {
      let bmi = null

      // Check if this user has a BMI value in DDB. If this value isn't present, redirect the
      // user to the Welcome Screen for him to enter his details and have the backend
      // calculate this value and store in DDB
      try {
        const { data: { getUser: { bmi }} } = await API.graphql(graphqlOperation(getUserBmi, {
          id: localStorage['aws-calorie-tracker-userid']
        }))

        this.$f7router.navigate('/home/')
      } catch (err) {
        // If BMI value is null, this is a first time user. Redirect to Welcome Screen.
        this.$f7router.navigate('/welcome/')
      }
    },
    signIn () {
      const self = this

      // Show spinner 
      self.$f7.preloader.show()

      // Send credentials to Cognito Endpoint
      this.cognitoLogger.info('Authenticating ' + this.username + ' with AWS Cognito')

      Auth.signIn(this.username, this.password)
        .then(user => {
          // Create toast message
          self.successToastMessage = self.$f7.toast.create({
            closeButton: true,
            text: 'Login Successful!' ,
            closeTimeout: 3000,
            destroyOnClose: true
          })

          this.cognitoLogger.info('Authentication Successful')

          // Save user details in local storage
          localStorage['aws-calorie-tracker-userid'] = user.signInUserSession.idToken.payload.sub
          localStorage['aws-calorie-tracker-username'] = user.username
          
          // Hide spinner
          self.$f7.preloader.hide()

          // Open toast
          self.successToastMessage.open()

          // Get BMI and decide where to redirect user to
          this.redirectUser()
        })
        .catch(err => {
          // Hide spinner
          self.$f7.preloader.hide()

          this.cognitoLogger.error('Error while authenticating: ' + JSON.stringify(err))

          // Create toast error message
          self.errorToastMessage = self.$f7.toast.create({
            closeButton: true,
            text: 'Error from Cognito: ' + JSON.stringify(err) ,
            closeTimeout: 3000,
            destroyOnClose: true
          })

          // Open toast message
          self.errorToastMessage.open()
        })
      }
    }
  }
</script>