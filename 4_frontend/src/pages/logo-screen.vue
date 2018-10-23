<template>
  <f7-page>
    <f7-block>
      <center><img src="static/aws-logo.svg" width=50% height=50%></center>
    </f7-block>

    <f7-block-title>Hi There!</f7-block-title>
    <f7-block strong>
      <p>Please wait while we verify your credentials...</p>
    </f7-block>

    <f7-block class="text-align-center">
      <f7-preloader :size="42"></f7-preloader>
    </f7-block>

  </f7-page>
</template>

<script>
import { Auth, Cache } from 'aws-amplify'

export default {
  mounted () {
    const self = this

    Auth.currentAuthenticatedUser()
    .then(user => {
      // Save user details in local storage
      localStorage['aws-calorie-tracker-userid'] = user.signInUserSession.idToken.payload.sub
      localStorage['aws-calorie-tracker-username'] = user.username
      

      this.$f7router.navigate('/home/')
    })
    .catch(err => {
      this.$f7router.navigate('/login/')
    })
  }
}
</script>