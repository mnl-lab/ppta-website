<template>
  <v-app-bar color="white" app elevation="2" class="navbar-responsive">
    <v-container class="d-flex align-center">
      <div class="d-flex align-center">
        <img :src="logoImage" alt="Polypièces Transmission Logo" class="logo-img" />
        <div class="d-none d-sm-block">
          <h3 class="font-weight-bold logo-text">
            PPTA
          </h3>
        </div>
      </div>

      <v-spacer />

      <!-- Desktop Navigation -->
      <div class="d-none d-md-flex">
        <v-btn to="/" variant="text" class="nav-btn" exact color="primary" size="large">
          <v-icon start>mdi-home</v-icon>
          Accueil
        </v-btn>
        <v-btn to="/about" variant="text" class="nav-btn" color="primary" size="large">
          <v-icon start>mdi-information</v-icon>
          À propos
        </v-btn>
        <v-btn to="/contact" variant="text" class="nav-btn" color="primary" size="large">
          <v-icon start>mdi-phone</v-icon>
          Contact
        </v-btn>
      </div>

      <!-- Mobile Menu Button -->
      <v-btn class="d-md-none" icon variant="text" color="primary" @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" location="right" temporary class="mobile-drawer">
    <v-list>
      <v-list-item prepend-icon="mdi-home" title="Accueil" to="/" @click="drawer = false"></v-list-item>

      <v-list-item prepend-icon="mdi-information" title="À propos" to="/about" @click="drawer = false"></v-list-item>

      <v-list-item prepend-icon="mdi-phone" title="Contact" to="/contact" @click="drawer = false"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
// Barre de navigation principale en français avec Vuetify
import { ref } from 'vue'
import logoImage from '@/assets/company-logo.png'

const drawer = ref(false)
</script>

<style scoped>
.navbar-responsive {
  transition: all 0.3s ease;
}

.logo-img {
  height: 70px;
  margin-right: 20px;
  transition: height 0.3s ease;
}

.logo-text {
  color: #4DA6FF;
  font-size: xx-large;
  transition: font-size 0.3s ease;
}

.nav-btn {
  margin: 0 4px;
  transition: all 0.3s ease;
}

.mobile-drawer {
  z-index: 9999;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .logo-img {
    height: 50px;
    margin-right: 12px;
  }

  .logo-text {
    font-size: x-large;
  }
}

@media (max-width: 480px) {
  .logo-img {
    height: 40px;
    margin-right: 8px;
  }

  .logo-text {
    font-size: large;
  }
}

@media (max-width: 360px) {
  .logo-img {
    height: 35px;
    margin-right: 6px;
  }
}
</style>
