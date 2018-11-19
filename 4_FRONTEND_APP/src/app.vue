<template>
  <!-- App -->
  <f7-app :params="f7params">

    <!-- Left Panel -->
    <f7-panel left reveal theme-dark>
      <f7-view url="/panel-left/"></f7-view>
    </f7-panel>

    <!-- Main View -->
    <f7-view id="main-view" url="/" main></f7-view>

  </f7-app>
</template>

<script>
import { components } from 'aws-amplify-vue'

// Import Routes
import routes from './routes.js'

export default {
  components: {
    ...components
  },
  data() {
    return {
      // Framework7 parameters here
      f7params: {
        id: 'io.framework7.testapp', // App bundle ID
        name: 'Framework7', // App name
        theme: 'auto', // Automatic theme detection
        // App routes
        routes: routes,
      }
    }
  }
}
</script>
