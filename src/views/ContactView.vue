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
            <!-- Contact Form -->
            <v-col cols="12" md="6" class="pa-6">
              <v-card-subtitle class="text-h6 pa-0 mb-5 font-weight-medium">Envoyez-nous un message</v-card-subtitle>
              <v-form @submit.prevent="submitForm">
                <v-text-field
                  v-model="form.nom"
                  label="Nom complet"
                  variant="outlined"
                  required
                  class="mb-4"
                  prepend-inner-icon="mdi-account"
                  density="compact"
                />
                
                <v-text-field
                  v-model="form.email"
                  label="Adresse email"
                  variant="outlined"
                  type="email"
                  required
                  class="mb-4"
                  prepend-inner-icon="mdi-email"
                  density="compact"
                />
                
                <v-text-field
                  v-model="form.telephone"
                  label="Téléphone (optionnel)"
                  variant="outlined"
                  class="mb-4"
                  prepend-inner-icon="mdi-phone"
                  density="compact"
                />
                
                <v-textarea
                  v-model="form.message"
                  label="Votre message"
                  variant="outlined"
                  rows="4"
                  required
                  class="mb-5"
                  prepend-inner-icon="mdi-message-text"
                />
                
                <v-btn
                  type="submit"
                  color="primary"
                  size="large"
                  block
                  :loading="isSubmitting"
                  prepend-icon="mdi-send"
                  class="font-weight-bold"
                >
                  Envoyer le message
                </v-btn>
              </v-form>
            </v-col>
            
            <!-- Contact Information with Background Image -->
            <v-col cols="12" md="6" class="pa-0 position-relative">
              <div 
                class="contact-background-image"
                :style="{ backgroundImage: `url(${backgroundImage})` }"
              ></div>
              <div class="pa-6" style="position: relative; z-index: 2; background: rgba(249, 249, 249, 0.9); height: 100%;">
                <v-card-subtitle class="text-h6 pa-0 mb-5 font-weight-medium">Nos coordonnées</v-card-subtitle>
              
              <v-list class="bg-transparent">
                <v-list-item class="px-0 mb-4">
                  <template v-slot:prepend>
                    <v-avatar color="primary" class="me-4">
                      <v-icon color="white">mdi-map-marker</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 mb-1">Notre adresse</v-list-item-title>
                    <v-list-item-subtitle class="text-body-1">
                      175, Bd Ibn Tachfine Walid<br>
                      Quartier de la gare<br>
                      Casablanca, Maroc
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                
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
import { ref } from 'vue'
import backgroundImage from '@/assets/contact-background.png'

// Form data
const form = ref({
  nom: '',
  email: '',
  telephone: '',
  message: ''
})

const isSubmitting = ref(false)

// Form submission handler
const submitForm = async () => {
  // Basic validation
  if (!form.value.nom || !form.value.email || !form.value.message) {
    alert('Veuillez remplir tous les champs obligatoires.')
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    alert('Veuillez entrer une adresse email valide.')
    return
  }

  isSubmitting.value = true
  
  // Simulate form submission
  try {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', form.value)
    
    // Reset form after successful submission
    form.value = {
      nom: '',
      email: '',
      telephone: '',
      message: ''
    }
    
    // You could show a success message here
    alert('Message envoyé avec succès! Nous vous répondrons dans les plus brefs délais.')
    
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Erreur lors de l\'envoi du message. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
  }
}
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
</style>
