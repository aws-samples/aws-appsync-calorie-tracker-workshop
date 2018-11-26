<template>
<f7-page>
	<f7-navbar title="Almost There!" back-link="Back"></f7-navbar>
	<f7-block>
    <p>An email with your verification code has been sent to {{ email }}</p>
	  </f7-block>
	<f7-list>
		<f7-list-item>
			<f7-input :value="code" @input="code = $event.target.value" type="password" placeholder="Verification Code" error-message="Only numbers please!" required validate pattern="[0-9]*" auto-focus=true></f7-input>
		</f7-list-item>
		<f7-block>
			<f7-row>
				<f7-col>
					<f7-button @click="verify()">Verify</f7-button>
				</f7-col>
			</f7-row>
		</f7-block>
	</f7-list>
</f7-page>
    
</template>

<script>
import { Auth, Cache } from 'aws-amplify'

export default {
	props: {
		username: String,
		email: String
	},
  data() {
    return {
			code: ''
    }
  },
	methods: {
		verify () {
      const self = this

      // Show spinner 
      self.$f7.preloader.show()

			// Verify user via Cognito's confirmSignUp function
			this.cognitoLogger.info('Verifying ' + this.username + ' with AWS Cognito Endpoint')

			Auth.confirmSignUp(this.username, this.code)
			.then(data => {
				console.log(data)
				// SUCCESS!

				// Hide spinner
				self.$f7.preloader.hide()

				// Create toast message
				if (!self.successToastMessage) {
					self.successToastMessage = self.$f7.toast.create({
						closeButton: true,
						text: 'Registration Successful! Please login.' ,
						closeTimeout: 5000,
						destroyOnClose: true
					})
				}
				// Open toast
				self.successToastMessage.open()

				// Navigate to home/welcome page
				this.$f7router.navigate('/login/')
			})
			.catch(err => {
				// Show error toast message if verification failed

				// Hide spinner
				self.$f7.preloader.hide()

				// Create toast message
				if (!self.errorToastMessage) {
					self.errorToastMessage = self.$f7.toast.create({
						closeButton: true,
						text: err.code + ':' + err.message,
						closeTimeout: 12000,
						destroyOnClose: true
					})
				}
				// Open toast
				self.errorToastMessage.open()

				// Reset code input field
				self.code = ''
			})
		}
	}
}
</script>