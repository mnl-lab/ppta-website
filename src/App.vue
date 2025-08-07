<template>
  <div id="app">
    <router-view />
    <!-- Product Modal -->
    <ProductModal v-if="showModal" :product="selectedProduct" @close="closeModal" />
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import ProductModal from './components/ProductModal.vue'

const showModal = ref(false)
const selectedProduct = ref(null)

const openProductModal = (product) => {
  selectedProduct.value = product
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedProduct.value = null
}

// Provide modal functions to child components
provide('openProductModal', openProductModal)
provide('closeModal', closeModal)
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

#app {
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
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }

  .btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 12px;
  }
}
</style>