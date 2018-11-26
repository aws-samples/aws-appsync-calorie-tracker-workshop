<template>
  <f7-page>
    <f7-navbar title="Options"></f7-navbar>
    <f7-block-title>Settings</f7-block-title>
    <f7-list>
      <f7-list-item link="/welcome/" title="Welcome Screen" view="#main-view" panel-close></f7-list-item>
      <f7-list-item @click="logout()" link="/logout" title="Logout" view="#main-view" panel-close></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
import { Auth } from 'aws-amplify'

export default {
  data () {
    return {
    }
  },
  methods: {
    logout() {
      // Delete user details from local storage
      localStorage.removeItem('aws-calorie-tracker-username')
      localStorage.removeItem('aws-calorie-tracker-userid')

      // Sign out via Cognito
      this.cognitoLogger('Sending sign out request')
      Auth.signOut()
      this.cognitoLogger('Done. You are now logged out.')
    }
  }
}
</script>