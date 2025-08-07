<template>
    <div class="loading-container">
        <div class="loading-spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
        </div>
        <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
</template>

<script setup>
defineProps({
    message: {
        type: String,
        default: 'Loading...'
    }
})
</script>

<style scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
}

.loading-spinner {
    position: relative;
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
}

.spinner-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-radius: 50%;
    animation: spin 1.5s linear infinite;
}

.spinner-ring:nth-child(1) {
    border-top-color: rgb(20, 36, 69);
    animation-delay: 0s;
}

.spinner-ring:nth-child(2) {
    border-right-color: rgb(20, 36, 69);
    animation-delay: 0.3s;
    transform: scale(0.8);
}

.spinner-ring:nth-child(3) {
    border-bottom-color: rgb(20, 36, 69);
    animation-delay: 0.6s;
    transform: scale(0.6);
}

.loading-message {
    color: #64748b;
    font-size: 1rem;
    font-weight: 500;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
