<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <!-- Content Section (Left) -->
      <v-col cols="12" md="6" class="pa-8">
        <div class="about-content">
          <h1 class="text-h3 font-weight-bold mb-6" style="color: #142445;">
            Présentation de la Société PPTA
          </h1>
          
          <div class="mb-6">
            <p class="text-body-1 mb-4 text-justify">
              Depuis sa création, la société <strong>PPTA</strong> fixe son objectif essentiellement à 
              réserver le grand soin à ses clients en leur accordant le maximum de satisfaction et 
              en leur assurant des conditions particulièrement avantageuses et réellement 
              adaptées à leurs besoins :
            </p>
            
            <v-list class="bg-transparent mb-6">
              <v-list-item class="px-0">
                <template v-slot:prepend>
                  <v-icon color="primary" class="me-3">mdi-check-circle</v-icon>
                </template>
                <v-list-item-title>Un prix compétitif et étudié</v-list-item-title>
              </v-list-item>
              <v-list-item class="px-0">
                <template v-slot:prepend>
                  <v-icon color="primary" class="me-3">mdi-check-circle</v-icon>
                </template>
                <v-list-item-title>Un suivi régulier et rigoureux de leurs commandes</v-list-item-title>
              </v-list-item>
              <v-list-item class="px-0">
                <template v-slot:prepend>
                  <v-icon color="primary" class="me-3">mdi-check-circle</v-icon>
                </template>
                <v-list-item-title>Une livraison rapide et garantie</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>

          <!-- Product Categories -->
          <div class="mb-6">
            <h2 class="text-h5 font-weight-bold mb-4" style="color: #142445;">
              Nos Domaines d'Expertise
            </h2>
            
            <!-- Caoutchouc Industriel -->
            <v-expansion-panels class="mb-4">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>Caoutchouc Industriel</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="text-body-2">
                    <li>Bande transporteuse noire et PVC</li>
                    <li>Tous types de revêtements différentes largeurs</li>
                    <li>Bande PVC alimentaire et industrielle</li>
                    <li>Agrafe pour bande transporteuse</li>
                    <li>Fabrication des articles en caoutchouc</li>
                    <li>Tuyaux flexible haute et basse pression</li>
                    <li>Travaux de réparation et jonctionnement</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <!-- Transmission Mécanique -->
            <v-expansion-panels class="mb-4">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>Transmission Mécanique</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="text-body-2">
                    <li>Chaînes de transmission et de manutention</li>
                    <li>Chaînes Agricoles</li>
                    <li>Pignons à chaîne, Poulies, Paliers</li>
                    <li>Accouplements et Flectors</li>
                    <li>Roulements pour convoyeur</li>
                    <li>Moteur électrique, moto réducteur</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>

          <div class="mt-8">
            <p class="text-body-1 text-justify">
              Nous espérons que notre démarche sera favorablement accueillie et 
              permettra une prise de contact dans un proche avenir.
            </p>
            <v-btn 
              to="/contact" 
              color="primary" 
              size="large" 
              class="mt-4"
              prepend-icon="mdi-phone"
            >
              Contactez-nous
            </v-btn>
          </div>
        </div>
      </v-col>
      
      <!-- Image Section (Right) -->
      <v-col cols="12" md="6" class="pa-0">
        <div 
          class="about-image-section"
          :style="{ backgroundImage: `url(${backgroundImage})` }"
        ></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Page À propos avec contenu détaillé de PPTA
import backgroundImage from '@/assets/contact-background.png'
</script>

<style scoped>
.about-image-section {
  height: 100vh;
  min-height: 800px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media (max-width: 960px) {
  .about-image-section {
    height: 400px;
    min-height: 400px;
  }
}
</style>