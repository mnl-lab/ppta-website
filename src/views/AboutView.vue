<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <!-- Content Section (Left) -->
      <v-col cols="12" md="6" class="pa-8">
        <div class="about-content">
          <h1 class="text-h3 font-weight-bold mb-6" style="color: #142445;">
            Présentation de la Société PPTA
          </h1>

          <!-- (Video moved to right image section) -->

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
            <v-btn to="/contact" color="primary" size="large" class="mt-4" prepend-icon="mdi-phone">
              Contactez-nous
            </v-btn>
          </div>
        </div>
      </v-col>

      <!-- Image Section (Right) -->
      <v-col cols="12" md="6" class="pa-0 about-media-col">
        <div class="about-image-section" :style="{ backgroundImage: `url(${backgroundImage})` }"></div>
        <div class="about-video-box">
          <div id="about-video-player" class="about-video-iframe" aria-label="Présentation PPTA"></div>
          <div v-if="showUnmuteHint" class="unmute-hint" @click="activateSound">
            <v-icon size="36" class="me-2">mdi-volume-high</v-icon>
            Activer le son
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Page À propos avec contenu détaillé de PPTA
import { onMounted, ref } from 'vue'
import backgroundImage from '@/assets/contact-background.png'

const showUnmuteHint = ref(true)
let ytPlayer = null

function loadYouTubeApi() {
  if (window.YT && window.YT.Player) {
    initPlayer()
    return
  }
  const tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  document.head.appendChild(tag)
  window.onYouTubeIframeAPIReady = () => initPlayer()
}

function initPlayer() {
  ytPlayer = new window.YT.Player('about-video-player', {
    videoId: 'YFTtGxDACw8',
    playerVars: {
      autoplay: 1,
      controls: 0,
      playsinline: 1,
      modestbranding: 1,
      rel: 0,
      loop: 1,
      playlist: 'YFTtGxDACw8'
    },
    events: {
      onReady: (e) => {
        try {
          e.target.unMute()
          e.target.setVolume(100)
          e.target.playVideo()
          // If browser allowed sound autoplay, hide hint.
          setTimeout(() => { if (e.target.isMuted && !e.target.isMuted()) showUnmuteHint.value = false }, 800)
        } catch (err) {
          // Will likely need user gesture; keep hint visible.
          console.warn('Autoplay with sound blocked:', err)
        }
      },
      onStateChange: (ev) => {
        if (ev.data === window.YT.PlayerState.PLAYING) {
          // If actually playing with sound unmuted hide hint
          try {
            if (!ytPlayer.isMuted()) showUnmuteHint.value = false
          } catch (err) {
            // ignore
          }
        }
      }
    }
  })
}

function activateSound() {
  if (ytPlayer) {
    try {
      ytPlayer.unMute()
      ytPlayer.setVolume(100)
      ytPlayer.playVideo()
      showUnmuteHint.value = false
    } catch (err) {
      console.warn('Unable to activate sound yet', err)
    }
  }
}

onMounted(() => {
  loadYouTubeApi()
})
</script>

<style scoped>
.about-image-section {
  height: 100vh;
  min-height: 800px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.about-media-col {
  position: relative;
  overflow: hidden;
}

.about-video-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50%;
  /* occupy about half of the image section height */
  width: 80%;
  max-width: 820px;
  min-height: 260px;
  background: #000;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 12px 40px -8px rgba(0, 0, 0, 0.45);
  border: 2px solid rgba(255, 255, 255, 0.25);
}

.about-video-box::after {
  /* subtle gradient overlay for readability */
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg, rgba(20, 36, 69, 0.50) 0%, rgba(20, 36, 69, 0.15) 55%, rgba(20, 36, 69, 0.05) 100%);
  pointer-events: none;
}

.about-video-iframe {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 0;
}

.unmute-hint {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(20, 36, 69, 0.85);
  color: #fff;
  padding: 10px 18px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: background .25s ease, transform .25s ease;
  box-shadow: 0 4px 18px -4px rgba(0, 0, 0, 0.45);
}

.unmute-hint:hover {
  background: rgba(20, 36, 69, 0.95);
  transform: translateX(-50%) translateY(-2px);
}

.about-video-box:hover {
  box-shadow: 0 16px 48px -6px rgba(0, 0, 0, 0.55);
}

@media (max-width: 1200px) {
  .about-image-section {
    height: 90vh;
    min-height: 700px;
  }

  .about-video-box {
    width: 85%;
    height: 45%;
  }
}

@media (max-width: 960px) {
  .about-image-section {
    height: 400px;
    min-height: 400px;
  }

  .about-video-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 55%;
    border-radius: 14px;
  }

  .unmute-hint {
    font-size: 0.85rem;
    padding: 8px 16px;
  }
}

@media (max-width: 768px) {
  .about-video-box {
    width: 95%;
    height: 60%;
    border-radius: 12px;
  }

  .unmute-hint {
    font-size: 0.8rem;
    padding: 7px 14px;
    bottom: 10px;
  }
}

@media (max-width: 600px) {
  .about-image-section {
    height: 350px;
    min-height: 350px;
  }

  .about-video-box {
    width: 92%;
    height: 65%;
    border-radius: 10px;
  }

  .unmute-hint {
    font-size: 0.75rem;
    padding: 6px 12px;
    bottom: 8px;
  }
}

@media (max-width: 480px) {
  .about-image-section {
    height: 300px;
    min-height: 300px;
  }

  .about-video-box {
    width: 90%;
    height: 70%;
    border-radius: 8px;
  }

  .unmute-hint {
    font-size: 0.7rem;
    padding: 5px 10px;
    bottom: 6px;
  }
}

@media (max-width: 360px) {
  .about-image-section {
    height: 280px;
    min-height: 280px;
  }

  .about-video-box {
    width: 88%;
    height: 75%;
  }
}
</style>