<template>
  <v-footer color="primary" class="py-6 footer-responsive">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="text-center text-md-left mb-4 mb-md-0">
          <h4 class="text-h6 font-weight-bold text-white mb-2 footer-title">
            Polypièces Transmission
          </h4>
          <p class="text-caption text-white opacity-80 footer-subtitle">
            Spécialiste en solutions industrielles
          </p>
        </v-col>

        <v-col cols="12" md="4" class="text-center mb-4 mb-md-0">
          <h5 class="text-subtitle-1 font-weight-bold text-white mb-2 footer-section-title">
            Contact
          </h5>
          <div class="footer-contact-info">
            <p class="text-caption text-white opacity-80 mb-1">
              <v-icon size="small" class="me-1">mdi-map-marker</v-icon>
              <span class="contact-text">175, Bd Ibn Tachfine Walid, Casablanca</span>
            </p>
            <p class="text-caption text-white opacity-80 mb-1">
              <v-icon size="small" class="me-1">mdi-phone</v-icon>
              <span class="contact-text">05 22 24 75 61</span>
            </p>
            <p class="text-caption text-white opacity-80">
              <v-icon size="small" class="me-1">mdi-email</v-icon>
              <span class="contact-text">ste.ppta@gmail.com</span>
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="4" class="footer-nav-col">
          <h5 class="text-subtitle-1 font-weight-bold text-white mb-2 footer-section-title">
            Navigation
          </h5>
          <div class="footer-nav-btn-group">
            <v-btn to="/" variant="text" color="white" size="small" class="footer-nav-btn">
              Accueil
            </v-btn>
            <v-btn to="/about" variant="text" color="white" size="small" class="footer-nav-btn">
              À propos
            </v-btn>
            <v-btn to="/contact" variant="text" color="white" size="small" class="footer-nav-btn">
              Contact
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-4" color="white" opacity="0.3"></v-divider>

      <v-row>
        <v-col class="text-center">
          <p class="text-caption text-white opacity-80 mb-0 footer-copyright">
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

<style scoped>
.footer-responsive {
  transition: all 0.3s ease;
}

.footer-title {
  transition: font-size 0.3s ease;
}

.footer-subtitle {
  transition: font-size 0.3s ease;
}

.footer-section-title {
  transition: font-size 0.3s ease;
}

.footer-contact-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.footer-nav-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.footer-nav-btn-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-end;
}

@media (max-width: 960px) {
  .footer-nav-col {
    align-items: center !important;
    text-align: center !important;
  }

  .footer-nav-btn-group {
    align-items: center !important;
  }
}

.footer-nav-btn {
  transition: all 0.3s ease;
}

.contact-text {
  word-break: break-word;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .footer-contact-info {
    align-items: center;
  }

  .footer-nav {
    align-items: center;
  }
}

@media (max-width: 768px) {
  .footer-responsive {
    padding: 20px 0 !important;
  }

  .footer-title {
    font-size: 1.1rem !important;
  }

  .footer-section-title {
    font-size: 1rem !important;
  }

  .footer-subtitle {
    font-size: 0.8rem !important;
  }

  .contact-text {
    font-size: 0.75rem;
  }

  .footer-nav-btn {
    font-size: 0.8rem;
    padding: 4px 8px;
  }
}

@media (max-width: 600px) {
  .footer-responsive {
    padding: 16px 0 !important;
  }

  .footer-title {
    font-size: 1rem !important;
    margin-bottom: 8px !important;
  }

  .footer-section-title {
    font-size: 0.95rem !important;
    margin-bottom: 8px !important;
  }

  .footer-subtitle {
    font-size: 0.75rem !important;
  }

  .contact-text {
    font-size: 0.7rem;
  }

  .footer-nav-btn {
    font-size: 0.75rem;
    padding: 3px 6px;
    margin: 1px 0;
  }

  .footer-copyright {
    font-size: 0.7rem !important;
  }
}

@media (max-width: 480px) {
  .footer-responsive {
    padding: 14px 0 !important;
  }

  .footer-title {
    font-size: 0.95rem !important;
  }

  .footer-section-title {
    font-size: 0.9rem !important;
  }

  .footer-subtitle {
    font-size: 0.7rem !important;
  }

  .contact-text {
    font-size: 0.65rem;
    line-height: 1.3;
  }

  .footer-nav-btn {
    font-size: 0.7rem;
    padding: 2px 4px;
  }
}

@media (max-width: 360px) {
  .footer-responsive {
    padding: 12px 0 !important;
  }

  .footer-title {
    font-size: 0.9rem !important;
  }

  .footer-section-title {
    font-size: 0.85rem !important;
  }

  .contact-text {
    font-size: 0.6rem;
  }

  .footer-copyright {
    font-size: 0.65rem !important;
  }
}
</style>
