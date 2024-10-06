<script setup>
import { ref } from 'vue';
import Login from './pages/Login.vue';
import Link from './pages/Link.vue';
import Game from './pages/Game.vue';

const currentPage = ref(window.location.pathname == "/" ? '/home' : window.location.pathname);

</script>

<template>
  <div v-if="currentPage === '/home'">
    <Login />
  </div>
  <div v-if="currentPage === '/linker'">
    <Link />
  </div>
  <div v-if="currentPage === '/pet'">
    <Game />
  </div>
  <div v-else>
    <div>test</div>
  </div>
</template>

<style scoped>
@import './stylefiles/jersey15.css';
</style>
