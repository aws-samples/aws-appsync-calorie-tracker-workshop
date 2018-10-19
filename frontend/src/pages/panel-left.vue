<template>
  <f7-page>
    <f7-navbar v-bind:title="username.toUpperCase()"></f7-navbar>
    <f7-block-title>Settings</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/logout/" title="Logout" view="#main-view" panel-close></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
import { Auth, Cache } from 'aws-amplify'

export default {
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    this.username = Cache.getItem('username')
  }
}
</script>