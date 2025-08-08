<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="6" class="rounded-lg">
          <v-card-title class="text-h4 font-weight-bold text-center py-6" style="background-color: #142445; color: white;">
            Contactez-nous
          </v-card-title>
          
          <v-divider />
          
          <v-row class="ma-0">
            <!-- Locations Maps -->
            <v-col cols="12" class="pa-6 mb-8">
              <v-card-subtitle class="text-h6 pa-0 mb-5 font-weight-medium">Nos localisations</v-card-subtitle>

              <div class="d-flex flex-column ga-6">
                <div>
                  <div class="text-subtitle-1 font-weight-medium mb-2">
                    24 Rue Andalous, Casablanca
                  </div>
                  <div class="map-container rounded-lg elevation-2">
                    <iframe
                      title="24 Rue Andalous, Casablanca"
                      width="100%"
                      height="100%"
                      style="border:0"
                      loading="lazy"
                      allowfullscreen
                      referrerpolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=24+Rue+Andalous,+Casablanca&output=embed"
                    ></iframe>
                  </div>
                </div>

                <div>
                  <div class="text-subtitle-1 font-weight-medium mb-2">
                    175, Bd Ibn Tachfine Walid, Casablanca
                  </div>
                  <div class="map-container rounded-lg elevation-2">
                    <iframe
                      title="175, Bd Ibn Tachfine Walid, Casablanca"
                      width="100%"
                      height="100%"
                      style="border:0"
                      loading="lazy"
                      allowfullscreen
                      referrerpolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=175,+Bd+Ibn+Tachfine+Walid,+Casablanca&output=embed"
                    ></iframe>
                  </div>
                </div>
              </div>
            </v-col>
            
            <!-- Contact Information with Background Image -->
            <v-col cols="12" class="pa-0 position-relative">
              <div 
                class="contact-background-image"
                :style="{ backgroundImage: `url(${backgroundImage})` }"
              ></div>
              <div class="pa-6" style="position: relative; z-index: 2; background: rgba(249, 249, 249, 0.9);">
                <v-card-subtitle class="text-h6 pa-0 mb-5 font-weight-medium">Nos coordonnées</v-card-subtitle>
              
              <v-list class="bg-transparent">
                <v-list-item class="px-0 mb-4">
                  <template v-slot:prepend>
                    <v-avatar color="primary" class="me-4">
                      <v-icon color="white">mdi-phone</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 mb-1">Appelez-nous</v-list-item-title>
                    <v-list-item-subtitle class="text-body-1">
                      <div class="d-flex flex-column ga-1">
                        <v-chip color="primary" variant="outlined" size="small">05 22 24 75 61</v-chip>
                        <v-chip color="primary" variant="outlined" size="small">06 61 27 55 00</v-chip>
                      </div>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                
                <v-list-item class="px-0 mb-4">
                  <template v-slot:prepend>
                    <v-avatar color="primary" class="me-4">
                      <v-icon color="white">mdi-email</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 mb-1">Écrivez-nous</v-list-item-title>
                    <v-list-item-subtitle class="text-body-1">
                      <v-chip color="primary" variant="tonal" size="large" prepend-icon="mdi-email">
                        ste.ppta@gmail.com
                      </v-chip>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import backgroundImage from '@/assets/contact-background.png'
</script>

<style scoped>
.contact-background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

.map-container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}
</style>
