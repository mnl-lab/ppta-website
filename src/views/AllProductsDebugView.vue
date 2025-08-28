<template>
    <div>
        <h1>All Products (Debug Page)</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <ul>
                <li v-for="product in products" :key="product.id">
                    {{ product.name }}
                </li>
            </ul>
            <div v-if="products.length === 0">No products found.</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getProducts } from '../composables/fetchAllProducts';

const products = ref([]);
const loading = ref(true);

onMounted(async () => {
    try {
        products.value = await getProducts();
    } catch (e) {
        // Optionally handle error
        products.value = [];
    } finally {
        loading.value = false;
    }
});
</script>
