<template>
  <v-footer color="primary" class="py-6">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="text-center text-md-left mb-4 mb-md-0">
          <h4 class="text-h6 font-weight-bold text-white mb-2">
            Polypièces Transmission
          </h4>
          <p class="text-caption text-white opacity-80">
            Spécialiste en solutions industrielles
          </p>
        </v-col>
        
        <v-col cols="12" md="4" class="text-center mb-4 mb-md-0">
          <h5 class="text-subtitle-1 font-weight-bold text-white mb-2">
            Contact
          </h5>
          <p class="text-caption text-white opacity-80 mb-1">
            <v-icon size="small" class="me-1">mdi-map-marker</v-icon>
            175, Bd Ibn Tachfine Walid, Casablanca
          </p>
          <p class="text-caption text-white opacity-80 mb-1">
            <v-icon size="small" class="me-1">mdi-phone</v-icon>
            05 22 24 75 61
          </p>
          <p class="text-caption text-white opacity-80">
            <v-icon size="small" class="me-1">mdi-email</v-icon>
            ste.ppta@gmail.com
          </p>
        </v-col>
        
        <v-col cols="12" md="4" class="text-center text-md-right">
          <h5 class="text-subtitle-1 font-weight-bold text-white mb-2">
            Navigation
          </h5>
          <div class="d-flex flex-column ga-1">
            <v-btn to="/" variant="text" color="white" size="small" class="justify-center justify-md-end">
              Accueil
            </v-btn>
            <v-btn to="/about" variant="text" color="white" size="small" class="justify-center justify-md-end">
              À propos
            </v-btn>
            <v-btn to="/contact" variant="text" color="white" size="small" class="justify-center justify-md-end">
              Contact
            </v-btn>
          </div>
        </v-col>
      </v-row>
      
      <v-divider class="my-4" color="white" opacity="0.3"></v-divider>
      
      <v-row>
        <v-col class="text-center">
          <p class="text-caption text-white opacity-80 mb-0">
            © 2025 Polypièces Transmission. Tous droits réservés.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
// Footer complet en français avec Vuetify
</script>
