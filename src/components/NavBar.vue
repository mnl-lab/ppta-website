<template>
  <v-app-bar color="white" app elevation="2">
    <v-container class="d-flex align-center">
      <div class="d-flex align-center">
        <img 
          :src="logoImage" 
          alt="Polypièces Transmission Logo" 
          style="height: 70px; margin-right: 20px;"
        />
        <div class="d-none d-sm-block">
          <h3 class="text-h6 font-weight-bold" style="color: #142445;">
            Polypièces Transmission
          </h3>
        </div>
      </div>
      
      <v-spacer />
      
      <!-- Desktop Navigation -->
      <div class="d-none d-md-flex">
        <v-btn to="/" variant="text" class="mx-1" exact color="primary" size="large">
          <v-icon start>mdi-home</v-icon>
          Accueil
        </v-btn>
        <v-btn to="/about" variant="text" class="mx-1" color="primary" size="large">
          <v-icon start>mdi-information</v-icon>
          À propos
        </v-btn>
        <v-btn to="/contact" variant="text" class="mx-1" color="primary" size="large">
          <v-icon start>mdi-phone</v-icon>
          Contact
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup>
// Barre de navigation principale en français avec Vuetify
import logoImage from '@/assets/company-logo.png'
</script>
