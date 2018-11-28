// Import Vue
import Vue from 'vue';

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import App Component
import App from './app'

// Init F7 Vue Plugin
Framework7.use(Framework7Vue)

// Init AWS AmplifyJS
import Amplify, * as AmplifyModules from 'aws-amplify'
import { Logger } from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue'
import aws_exports from './aws-exports'

var appSyncLogger = new Logger('AppSync', 'INFO')
var cognitoLogger = new Logger('Cognito', 'INFO')

Amplify.configure(aws_exports)

Vue.use(AmplifyPlugin, AmplifyModules)

// Init Amplify Logger Mixin
Vue.mixin({
  data: function() {
    return {
      get appSyncLogger() {
        return appSyncLogger
      },
      get cognitoLogger() {
        return cognitoLogger
      }
    }
  }
})

// Init App
new Vue({
  el: '#app',
  template: '<app/>',

  // Register App Component
  components: {
    app: App
  }
})
