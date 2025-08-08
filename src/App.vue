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

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f8fafc;
  color: #1e293b;
  line-height: 1.6;
  scroll-behavior: smooth;
}

#app,
.v-application {
  min-height: 100vh;
  position: relative;
}

.primary-color {
  color: rgb(20, 36, 69);
}

.primary-bg {
  background-color: rgb(20, 36, 69);
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background-color: rgb(20, 36, 69);
  color: white;
}

.btn-primary:hover {
  background-color: rgb(30, 46, 79);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(20, 36, 69, 0.3);
}

.btn-secondary {
  background-color: #e2e8f0;
  color: rgb(20, 36, 69);
}

.btn-secondary:hover {
  background-color: #cbd5e1;
  transform: translateY(-2px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateY(20px);
}

.slide-leave-to {
  transform: translateY(-20px);
}

/* Additional smooth animations */
.bounce-enter-active {
  animation: bounce-in 0.6s ease-out;
}

.bounce-leave-active {
  animation: bounce-out 0.3s ease-in;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.3) translateY(100px);
    opacity: 0;
  }

  50% {
    transform: scale(1.05);
  }

  70% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(0.3) translateY(-100px);
    opacity: 0;
  }
}

/* Responsive utilities */
@media (max-width: 1200px) {
  .container {
    padding: 0 24px;
  }
}

@media (max-width: 960px) {
  .container {
    padding: 0 20px;
  }

  .btn {
    padding: 11px 22px;
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }

  .btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}

@media (max-width: 600px) {
  .container {
    padding: 0 14px;
  }

  .btn {
    padding: 9px 18px;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 12px;
  }

  .btn {
    padding: 8px 16px;
    font-size: 0.8rem;
  }
}

@media (max-width: 360px) {
  .container {
    padding: 0 10px;
  }

  .btn {
    padding: 7px 14px;
    font-size: 0.75rem;
  }
}

/* Touch-friendly interactions */
@media (hover: none) and (pointer: coarse) {
  .btn {
    min-height: 44px;
    /* iOS recommended touch target size */
  }

  .btn:hover {
    transform: none;
    /* Disable hover transforms on touch devices */
  }
}
</style>
