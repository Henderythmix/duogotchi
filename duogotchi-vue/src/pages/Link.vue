<script setup>
  import { ref } from 'vue';
  const pairData = ref(null);

  function link() {
    var linkid = document.getElementById("linkid").value;
    if (linkid == "")
      return alert("please enter a valid id");

    var linkRequest = new Request('http://localhost:3000/POST/linkPartner', {
      method: 'POST',
      body: JSON.stringify({
        partner: linkid,
        username: document.cookie.split("username=")[1].split(';')[0],
        accessToken: document.cookie.split("token=")[1].split(';')[0]
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    fetch(linkRequest).then(response => response.json())
    .then(data => {
      alert(data.message);
      getPair();
    });
  }

  function getPair() {
    var getPairRequest = new Request(`http://localhost:3000/GET/getPair?username=${document.cookie.split("username=")[1].split(';')[0]}&accessToken=${document.cookie.split("token=")[1].split(';')[0]}`);

    fetch(getPairRequest).then(response => response.json()).then(data => {
      pairData.value = data;
      console.log(data);
    })
  }

  function goToGame() {
    window.location.href = "/pet";
  }

  getPair();
</script>

<template>
  <div class="page-container">
    <div class = "title">duogotchi</div>
    <template v-if="pairData.partner == null">
      <div class="bodytext">link with user!</div>
      <div class = "bigplusSign">+</div>
      <div class = "partnerIdField">
        <label>enter partner’s id...</label>
        <input type="text" id="linkid" />
      </div>
      <div class = "requestButton">
        <button type ="submit" @click="link()">request!</button>
      </div>
    </template>
    
    <template v-else>
      <div class="bodytext">{{ pairData.partnerName }}</div>
      <div class = "fakeTamagotchi" @click="goToGame()"></div>
      <div class = "title">duogtochi</div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import '../stylefiles/fontfile.css';
@import '../stylefiles/link.css';
@import '../stylefiles/jersey15.css';

.page-container {
  background-color: #DDAFC3;
  width: 393px;
  height: 852px;
  position: absolute;
}
</style>