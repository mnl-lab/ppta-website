<template>
    <Transition name="modal">
        <div class="modal-overlay" @click="$emit('close')">
            <div class="modal-content" @click.stop>
                <button class="close-btn" @click="$emit('close')">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>

                <div class="product-image">
                    <img :src="product.image_url || '/api/placeholder/400/400'" :alt="product.name"
                        @error="handleImageError" />
                </div>

                <div class="product-info">
                    <h2 class="product-name">{{ product.name }}</h2>
                    <div class="product-categories">
                        <span v-if="product.category" class="category-tag">{{ product.category }}</span>
                        <span v-if="product.category2" class="subcategory-tag">{{ product.category2 }}</span>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
defineProps({
    product: {
        type: Object,
        required: true
    }
})

defineEmits(['close'])

const handleImageError = (event) => {
    event.target.src = '/api/placeholder/400/400'
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
}

.modal-content {
    background: white;
    border-radius: 16px;
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    animation: modalSlideIn 0.3s ease-out;
}

.close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
}

.close-btn:hover {
    background: white;
    transform: scale(1.1);
}

.product-image {
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-radius: 16px 16px 0 0;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.product-info {
    padding: 24px;
}

.product-name {
    font-size: 1.75rem;
    font-weight: 700;
    color: rgb(20, 36, 69);
    margin-bottom: 16px;
    line-height: 1.3;
}

.product-categories {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.category-tag,
.subcategory-tag {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: capitalize;
}

.category-tag {
    background-color: rgb(20, 36, 69);
    color: white;
}

.subcategory-tag {
    background-color: #e2e8f0;
    color: rgb(20, 36, 69);
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@media (max-width: 768px) {
    .modal-content {
        margin: 10px;
        max-width: calc(100% - 20px);
    }

    .product-name {
        font-size: 1.5rem;
    }

    .product-image {
        height: 250px;
    }
}
</style>
