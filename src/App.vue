

<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
    <SiteFooter />
  </v-app>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import SiteFooter from './components/FooterComponent.vue';
</script>