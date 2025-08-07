<template>
  <div>
    <h1>home</h1>
    <div v-for="product in products" :key="product.id">
      <p>{{ product.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getProducts } from './composables/fetchAllProducts';

const products = ref([]);

const fetchProducts = async () => {
  products.value = await getProducts();
};


onMounted(() => {
  fetchProducts();
});
</script>