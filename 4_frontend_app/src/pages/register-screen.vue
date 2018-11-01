<template>
  <f7-page no-toolbarr>
    <f7-navbar title="Register"></f7-navbar>
    <f7-block-title>Please enter your details below</f7-block-title>
    <f7-list no-hairlines-md>
    <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Name</f7-label>
        <f7-input :value="username" @input="username = $event.target.value" type="text" placeholder="Your name" info='First name should be enough' required validate clear-button></f7-input>
    </f7-list-item>

    <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>E-mail</f7-label>
        <f7-input :value="email" @input="email = $event.target.value" type="email" placeholder="Your e-mail" info="We'll need your real email for verification" required validate clear-button></f7-input>
    </f7-list-item>

    <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Password</f7-label>
        <f7-input :value="password" @input="password = $event.target.value" type="password" placeholder="Should be [details here]" info="wut?" required validate clear-button></f7-input>
    </f7-list-item>
    </f7-list>
    <div class="block block-strong row">
    <div class="col"><a class="button" @click="signUp" href="#">Sign Up</a></div>
    <div class="col"><a class="button" @click="$f7router.navigate('/login/')" href="#">Cancel</a></div>
    </div>    
  </f7-page>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  data() {
    return {
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    signUp () {
      const self = this

      // Show preloader 
      self.$f7.preloader.show();

      // Register new user in Cognito's User Pool 
      Auth.signUp({
        username: this.username,
        password: this.password,
        attributes: {
            email: this.email
        },
        validationData: []  //optional
        })
        .then(data => {          
          // Success! Hide preloader 
          self.$f7.preloader.hide()

          // ...And navigate to email verification page
          this.$f7router.navigate('/verify/' + this.email + '/' + this.username)
        })
        .catch(err => {
          console.log(err)

          // Hide spinner
          self.$f7.preloader.hide()

          // Create toast with error message
          if (!self.errorToasterMessage) {
            self.errorToasterMessage = self.$f7.toast.create({
              closeButton: true,
              text: err.code + ':' + err.message,
              closeTimeout: 12000,
              destroyOnClose: true
            })
          }
          // Open toast
          self.errorToasterMessage.open();
        })
      }
    }
} 
</script>