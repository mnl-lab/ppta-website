<template>
    <div class="subcategory-view">
        <!-- Breadcrumb Navigation -->
        <section class="breadcrumb">
            <div class="container">
                <nav class="breadcrumb-nav">
                    <router-link to="/" class="breadcrumb-link">Home</router-link>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-category">{{ categoryName }}</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-current">{{ subcategoryName }}</span>
                </nav>
            </div>
        </section>

        <!-- Header -->
        <section class="header">
            <div class="container">
                <button class="back-btn" @click="goBack">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    Back to {{ categoryName }}
                </button>
                <h1 class="subcategory-title">{{ subcategoryName }}</h1>
                <p class="product-count">{{ filteredProducts.length }} products found</p>
            </div>
        </section>

        <!-- Products Grid -->
        <section class="products-section">
            <div class="container">
                <Transition name="fade">
                    <LoadingSpinner v-if="loading" message="Loading products..." />
                    <div v-else-if="filteredProducts.length === 0" class="empty-state">
                        <div class="empty-icon">📦</div>
                        <h3>No products found</h3>
                        <p>There are no products in this subcategory yet.</p>
                        <button class="btn btn-primary" @click="goBack">
                            Browse other categories
                        </button>
                    </div>
                    <div v-else class="products-grid">
                        <Transition-group name="grid" tag="div" class="grid-container">
                            <div v-for="product in filteredProducts" :key="product.id" class="product-card"
                                @click="openProductModal(product)">
                                <div class="product-image">
                                    <img :src="product.image_url || '/api/placeholder/400/400'" :alt="product.name"
                                        @error="handleImageError" />
                                    <div class="product-overlay">
                                        <span class="view-details">View Details</span>
                                    </div>
                                </div>
                                <div class="product-info">
                                    <h3 class="product-name">{{ product.name }}</h3>
                                    <div class="product-meta">
                                        <span class="product-category">{{ product.category }}</span>
                                    </div>
                                </div>
                            </div>
                        </Transition-group>
                    </div>
                </Transition>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProducts } from '../composables/fetchAllProducts'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const openProductModal = inject('openProductModal')

const products = ref([])
const loading = ref(true)

const categoryName = computed(() => route.params.categoryName)
const subcategoryName = computed(() => route.params.subcategoryName)

const filteredProducts = computed(() => {
    return products.value.filter(product =>
        product.category2 === subcategoryName.value
    )
})

const goBack = () => {
    router.push('/')
}

const handleImageError = (event) => {
    event.target.src = '/api/placeholder/400/400'
}

const loadProducts = async () => {
    loading.value = true
    try {
        products.value = await getProducts()
    } catch (error) {
        console.error('Error loading products:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadProducts()
})
</script>

<style scoped>
.breadcrumb {
    background: white;
    border-bottom: 1px solid #e2e8f0;
    padding: 16px 0;
}

.breadcrumb-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
}

.breadcrumb-link {
    color: rgb(20, 36, 69);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.breadcrumb-link:hover {
    color: rgb(30, 46, 79);
}

.breadcrumb-separator {
    color: #64748b;
}

.breadcrumb-category,
.breadcrumb-current {
    color: #64748b;
    text-transform: capitalize;
}

.breadcrumb-current {
    font-weight: 600;
    color: rgb(20, 36, 69);
}

.header {
    background: linear-gradient(135deg, rgb(20, 36, 69) 0%, rgb(30, 46, 79) 100%);
    color: white;
    padding: 60px 0;
}

.back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    margin-bottom: 30px;
}

.back-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-4px);
}

.subcategory-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 12px;
    text-transform: capitalize;
}

.product-count {
    font-size: 1.125rem;
    opacity: 0.9;
}

.products-section {
    padding: 60px 0;
    min-height: 60vh;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    text-align: center;
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: 20px;
}

.empty-state h3 {
    font-size: 1.5rem;
    color: rgb(20, 36, 69);
    margin-bottom: 12px;
}

.empty-state p {
    color: #64748b;
    margin-bottom: 30px;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
}

.product-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid #e2e8f0;
    position: relative;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(20, 36, 69, 0.15);
}

.product-image {
    position: relative;
    width: 100%;
    height: 250px;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
    transform: scale(1.1);
}

.product-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(20, 36, 69, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
    opacity: 1;
}

.view-details {
    color: white;
    font-weight: 600;
    font-size: 1rem;
    padding: 12px 24px;
    border: 2px solid white;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.product-card:hover .view-details {
    background: white;
    color: rgb(20, 36, 69);
}

.product-info {
    padding: 24px;
}

.product-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: rgb(20, 36, 69);
    margin-bottom: 12px;
    text-transform: capitalize;
    line-height: 1.3;
}

.product-meta {
    display: flex;
    align-items: center;
    gap: 12px;
}

.product-category {
    background: #f1f5f9;
    color: rgb(20, 36, 69);
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: capitalize;
}

.grid-enter-active,
.grid-leave-active {
    transition: all 0.3s ease;
}

.grid-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
}

.grid-leave-to {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
}

.grid-move {
    transition: transform 0.3s ease;
}

@media (max-width: 768px) {
    .subcategory-title {
        font-size: 2rem;
    }

    .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }

    .product-image {
        height: 200px;
    }

    .breadcrumb-nav {
        flex-wrap: wrap;
    }
}

@media (max-width: 480px) {
    .grid-container {
        grid-template-columns: 1fr;
    }
}
</style>
