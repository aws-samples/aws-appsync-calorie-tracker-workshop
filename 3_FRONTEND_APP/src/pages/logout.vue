<template>
  <div id="logoff">
    <f7-page>
      <f7-block>
        <center><img src="static/logout-logo.svg" width=33% height=33%></center>
      </f7-block>

      <f7-block strong>
        <p><center>You are now logged out.</center></p>
      </f7-block>
      <f7-block>
        <f7-button @click="$f7router.navigate('/login/')">Back to Login</f7-button>
      </f7-block>
    </f7-page>
  </div>
</template>

<script>

</script>