<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Back button -->
        <v-btn 
          to="/produits" 
          variant="text" 
          color="primary" 
          class="mb-6"
          prepend-icon="mdi-arrow-left"
        >
          Retour aux produits
        </v-btn>

        <!-- Product Detail Card -->
        <v-card elevation="4">
          <v-card-title class="text-h4 font-weight-bold pa-6" style="color: #142445;">
            Détail du Produit
          </v-card-title>
          
          <v-divider />
          
          <v-card-text class="pa-6">
            <div class="text-center mb-8">
              <v-icon size="80" color="primary" class="mb-4">mdi-package-variant</v-icon>
              <h2 class="text-h5 font-weight-bold mb-4">Produit Industriel</h2>
              <p class="text-body-1">
                Cette page affichera les détails spécifiques du produit sélectionné. 
                Vous pourrez y trouver les caractéristiques techniques, les dimensions, 
                les applications recommandées et les informations de commande.
              </p>
            </div>

            <!-- Product Info Sections -->
            <v-row>
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4 mb-4">
                  <h4 class="text-h6 font-weight-bold mb-3" style="color: #142445;">
                    <v-icon class="me-2">mdi-information</v-icon>
                    Caractéristiques
                  </h4>
                  <p class="text-body-2">
                    Les spécifications techniques détaillées seront affichées ici 
                    selon le produit sélectionné.
                  </p>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4 mb-4">
                  <h4 class="text-h6 font-weight-bold mb-3" style="color: #142445;">
                    <v-icon class="me-2">mdi-tools</v-icon>
                    Applications
                  </h4>
                  <p class="text-body-2">
                    Les domaines d'application et recommandations d'utilisation 
                    seront détaillés dans cette section.
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <!-- Contact Section -->
            <v-card color="grey-lighten-5" class="pa-6 mt-6">
              <div class="text-center">
                <h4 class="text-h6 font-weight-bold mb-4" style="color: #142445;">
                  Intéressé par ce produit ?
                </h4>
                <p class="text-body-1 mb-4">
                  Contactez-nous pour plus d'informations, un devis personnalisé ou pour passer commande.
                </p>
                <v-btn 
                  to="/contact" 
                  color="primary" 
                  size="large"
                  prepend-icon="mdi-phone"
                  class="font-weight-bold"
                >
                  Demander un devis
                </v-btn>
              </div>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
// Product ID would be available as route.params.id
console.log('Product ID:', route.params.id)
</script>
