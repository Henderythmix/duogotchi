<script setup>
    function login() {
      let username = document.getElementById('username').value;
      let password = document.getElementById('password').value;
      
      let testRequest = new Request('http://localhost:3000/POST/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      fetch(testRequest).then(response => response.json())
      .then(data => {
        console.log(data);
        // store access token and username in cookies
        document.cookie = "token=" + data.accessToken;
        document.cookie = "username=" + username;

        // redirect to linker page
        window.location.href = "/linker";
      });
    }
</script>

<template>
  <div class="page-container">
    <div class = "mainscreenTitle" style="font-family: 'Jersey 15'">Welcome to Duogotchi!</div>
    <div class = "loginField">
      <label>Username:</label>
      <input type="text" id="username" class="login-input" />
    </div>
  
    <div class = "passwordField">
      <label>Password:</label>
      <input type="password" id="password" class="login-input" />
    </div>
  
    <div class = "loginButton">
      <button type ="submit" @click="login()">Login</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../stylefiles/fontfile.css';
@import '../stylefiles/jersey15.css';
@import '../stylefiles/login.css';

.page-container {
  background-color: #DDAFC3;
  width: 393px;
  height: 852px;
  position: absolute;
}
</style>