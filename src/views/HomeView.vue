<template>

  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">Découvrez Nos Produits</h1>
        <p class="hero-subtitle">Explorez notre vaste collection à travers différentes catégories</p>
      </div>
    </section>

    <!-- Category Navigation -->
    <section class="category-nav">
      <div class="container">
        <div class="nav-tabs">
          <!-- Services Button -->
          <p :class="['nav-tab', 'services-tab', { active: currentView === 'services' }]" @click="selectServices">
            Services
          </p>

          <!-- Category Tabs -->
          <div class="category-tabs">
            <p v-for="category in categories" :key="category.id"
              :class="['category-tab', { active: selectedCategory?.id === category.id && currentView === 'categories' }]"
              @click="selectCategory(category)">
              {{ category.name }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Selected Category Content -->
    <section v-if="selectedCategory && currentView === 'categories'" class="category-content">
      <div class="container">
        <Transition name="fade" mode="out-in">
          <LoadingSpinner v-if="loading" message="Chargement des produits..." />
          <div v-else :key="selectedCategory.id" class="category-section">


            <!-- Subcategories with Products -->
            <div class="subcategories-list">
              <div v-for="subcategory in subcategoriesWithProducts" :key="subcategory.id" class="subcategory-section">
                <h3 class="subcategory-title">{{ subcategory.name }}</h3>
                <p class="subcategory-count">{{ subcategory.products.length }} produits</p>

                <!-- Products Grid -->
                <div v-if="subcategory.products.length > 0" class="products-grid">
                  <div v-for="product in subcategory.products" :key="product.id" class="product-card"
                    @click="openProductModal(product)">
                    <div class="product-image">
                      <img :src="getFirstImage(product.images) || '/placeholder-image.jpg'" :alt="product.name" />
                    </div>
                    <div class="product-info">
                      <h4 class="product-name">{{ product.name }}</h4>
                      <p class="product-description">{{ product.description }}</p>
                    </div>
                  </div>
                </div>

                <!-- No Products Message -->
                <div v-else class="no-products">
                  <p>Aucun produit disponible dans cette sous-catégorie</p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- Services Content -->
    <section v-if="currentView === 'services'" class="services-content">
      <div class="container">
        <h2 class="services-title">Nos Services</h2>

        <!-- Services Grid -->
        <div v-if="services.length > 0" class="services-grid">
          <div v-for="service in services" :key="service.id" class="service-card">
            <div class="service-image">
              <img :src="service.image_url || '/placeholder-image.jpg'" :alt="service.name" />
            </div>
            <div class="service-info">
              <h4 class="service-name">{{ service.name }}</h4>
            </div>
          </div>
        </div>

        <!-- No Services Message -->
        <div v-else class="no-services">
          <p>Aucun service disponible pour le moment</p>
        </div>
      </div>
    </section>

    <!-- Default state when no category is selected -->
    <section v-else-if="currentView === 'categories'" class="default-content">
      <div class="container">
        <div class="welcome-message">
          <h2>Bienvenue dans Notre Magasin</h2>
          <p>Sélectionnez une catégorie ci-dessus pour explorer nos produits</p>
        </div>
      </div>
    </section>

    <!-- Product Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <div class="modal-header">
          <h2 class="modal-title">{{ selectedProduct?.name }}</h2>
        </div>

        <div class="modal-body">
          <div class="modal-images">
            <div class="images-gallery-container">
              <button class="gallery-arrow gallery-arrow-left" @click="scrollGallery('left')" :disabled="!canScrollLeft"
                v-show="getProductImages(selectedProduct?.images).length > 1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>

              <div class="images-container" ref="imagesContainer" @scroll="updateScrollButtons">
                <div v-for="(imageUrl, index) in getProductImages(selectedProduct?.images)" :key="index"
                  class="modal-image">
                  <img :src="imageUrl" :alt="`${selectedProduct?.name} - Image ${index + 1}`" />
                </div>
              </div>

              <button class="gallery-arrow gallery-arrow-right" @click="scrollGallery('right')"
                :disabled="!canScrollRight" v-show="getProductImages(selectedProduct?.images).length > 1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div class="modal-description">
            <p v-if="selectedProduct?.description">{{ selectedProduct.description }}</p>
            <p v-else class="no-description">Aucune description disponible</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { fetchAllCategories } from '@/composables/fetchAllCategories';
import { fetchSubcategoryByCategory } from '@/composables/fetchSubcategoryByCategory';
import { fetchProductBySubcategory } from '@/composables/fetchProductBySubcategory';
import { fetchAllServices } from '@/composables/fetchAllServices';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const categories = ref([]);
const services = ref([]);
const loading = ref(true);
const subcategories = ref([]);
const subcategoriesWithProducts = ref([]);
const currentView = ref('categories'); // 'categories' or 'services'
const showModal = ref(false);
const selectedProduct = ref(null);
const imagesContainer = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);

onMounted(async () => {
  categories.value = await fetchAllCategories();
  services.value = await fetchAllServices();
  loading.value = false;
});

const selectedCategory = ref(null);

const selectCategory = async (category) => {
  selectedCategory.value = category;
  currentView.value = 'categories';
  loading.value = true;

  // Fetch subcategories for the selected category
  subcategories.value = await fetchSubcategoryByCategory(category.id);

  // Fetch products for each subcategory
  subcategoriesWithProducts.value = await Promise.all(
    subcategories.value.map(async (subcategory) => {
      const products = await fetchProductBySubcategory(subcategory.id);
      return {
        ...subcategory,
        products: products
      };
    })
  );

  console.log("Selected category ID:", category.id);
  console.log("Subcategories with products:", subcategoriesWithProducts.value);
  loading.value = false;
};

const selectServices = () => {
  currentView.value = 'services';
  selectedCategory.value = null;
};

// Helper function to get the first image from the images JSON
const getFirstImage = (images) => {
  if (!images) return null;

  try {
    const imageObj = typeof images === 'string' ? JSON.parse(images) : images;
    const keys = Object.keys(imageObj);
    return keys.length > 0 ? imageObj[keys[0]] : null;
  } catch (error) {
    console.error('Error parsing images:', error);
    return null;
  }
};

// Helper function to get all images from the images JSON
const getProductImages = (images) => {
  if (!images) return [];

  try {
    const imageObj = typeof images === 'string' ? JSON.parse(images) : images;
    return Object.values(imageObj);
  } catch (error) {
    console.error('Error parsing images:', error);
    return [];
  }
};

// Modal functions
const openProductModal = async (product) => {
  selectedProduct.value = product;
  showModal.value = true;
  document.body.style.overflow = 'hidden';

  // Wait for the modal to render then update scroll buttons
  await nextTick();
  updateScrollButtons();
};

const closeModal = () => {
  showModal.value = false;
  selectedProduct.value = null;
  document.body.style.overflow = 'auto';
};

// Gallery scroll functions
const scrollGallery = (direction) => {
  if (!imagesContainer.value) return;

  const scrollAmount = 220; // Width of one image + gap
  const currentScroll = imagesContainer.value.scrollLeft;

  if (direction === 'left') {
    imagesContainer.value.scrollTo({
      left: currentScroll - scrollAmount,
      behavior: 'smooth'
    });
  } else {
    imagesContainer.value.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  }
};

const updateScrollButtons = () => {
  if (!imagesContainer.value) return;

  const container = imagesContainer.value;
  canScrollLeft.value = container.scrollLeft > 0;
  canScrollRight.value = container.scrollLeft < (container.scrollWidth - container.clientWidth);
};


</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, rgb(20, 36, 69) 0%, rgb(30, 46, 79) 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.category-nav {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-tabs {
  display: flex;
  align-items: center;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.services-tab {
  padding: 12px 24px;
  border: 2px solid #e2e8f0;
  background: white;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  text-transform: capitalize;
  flex-shrink: 0;
}

.services-tab:hover {
  border-color: rgb(20, 36, 69);
  transform: translateY(-2px);
}

.services-tab.active {
  background: rgb(20, 36, 69);
  color: white;
  border-color: rgb(20, 36, 69);
}

.category-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
}

.category-tab {
  padding: 12px 24px;
  border: 2px solid #e2e8f0;
  background: white;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  text-transform: capitalize;
}

.category-tab:hover {
  border-color: rgb(20, 36, 69);
  transform: translateY(-2px);
}

.category-tab.active {
  background: rgb(20, 36, 69);
  color: white;
  border-color: rgb(20, 36, 69);
}

.category-content {
  padding: 60px 0;
}

.services-content {
  padding: 60px 0;
}

.services-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(20, 36, 69);
  text-align: center;
  margin-bottom: 60px;
  text-transform: capitalize;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.service-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(20, 36, 69, 0.15);
}

.service-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
}

.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.service-card:hover .service-image img {
  transform: scale(1.05);
}

.service-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.service-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(20, 36, 69);
  text-transform: capitalize;
}

.no-services {
  text-align: center;
  padding: 40px;
  color: #64748b;
  font-style: italic;
}

.category-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(20, 36, 69);
  text-align: center;
  margin-bottom: 60px;
  text-transform: capitalize;
}

.subcategories {
  margin-bottom: 80px;
}

.subcategories-list {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.subcategory-section {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.subcategory-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: rgb(20, 36, 69);
  margin-bottom: 8px;
  text-transform: capitalize;
}

.subcategory-count {
  color: #64748b;
  font-size: 1rem;
  margin-bottom: 30px;
  font-weight: 500;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.no-products {
  text-align: center;
  padding: 40px;
  color: #64748b;
  font-style: italic;
}

.subcategories-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(20, 36, 69);
  margin-bottom: 30px;
}

.subcategory-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.subcategory-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.subcategory-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(20, 36, 69, 0.15);
  border-color: rgb(20, 36, 69);
}

.subcategory-card h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(20, 36, 69);
  margin-bottom: 8px;
  text-transform: capitalize;
}

.subcategory-count {
  color: #64748b;
  font-size: 0.875rem;
}

.featured-products {
  margin-bottom: 40px;
}

.featured-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(20, 36, 69);
  margin-bottom: 30px;
}

.products-scroll {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
  scroll-behavior: smooth;
}

.products-scroll::-webkit-scrollbar {
  height: 8px;
}

.products-scroll::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.products-scroll::-webkit-scrollbar-thumb {
  background: rgb(20, 36, 69);
  border-radius: 4px;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.product-card.horizontal {
  min-width: 280px;
  flex-shrink: 0;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(20, 36, 69, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(20, 36, 69);
  margin-bottom: 8px;
  text-transform: capitalize;
}

.product-description {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
  flex: 1;
}

.product-subcategory {
  color: #64748b;
  font-size: 0.875rem;
  text-transform: capitalize;
}

.default-content {
  padding: 120px 0;
  text-align: center;
}

.welcome-message h2 {
  font-size: 2rem;
  color: rgb(20, 36, 69);
  margin-bottom: 16px;
}

.welcome-message p {
  color: #64748b;
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .nav-tabs {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .services-tab {
    text-align: center;
  }

  .category-tabs {
    justify-content: center;
  }

  .category-title,
  .services-title {
    font-size: 2rem;
  }

  .subcategory-section {
    padding: 24px;
  }

  .subcategory-title {
    font-size: 1.5rem;
  }

  .products-grid,
  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }

  .subcategories-list {
    gap: 40px;
  }

  .product-card.horizontal {
    min-width: 250px;
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1001;
  backdrop-filter: blur(10px);
}

.modal-close:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

.modal-close svg {
  color: rgb(20, 36, 69);
}

.modal-header {
  padding: 30px 30px 0 30px;
}

.modal-title {
  font-size: 2rem;
  font-weight: 700;
  color: rgb(20, 36, 69);
  margin: 0;
  text-transform: capitalize;
  line-height: 1.2;
  padding-right: 60px;
}

.modal-body {
  padding: 20px 30px 30px 30px;
}

.modal-images {
  margin-bottom: 30px;
}

.images-gallery-container {
  position: relative;
  display: flex;
  align-items: center;
}

.gallery-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #e2e8f0;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.gallery-arrow:hover:not(:disabled) {
  background: white;
  border-color: rgb(20, 36, 69);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 20px rgba(20, 36, 69, 0.2);
}

.gallery-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: translateY(-50%);
}

.gallery-arrow svg {
  color: rgb(20, 36, 69);
  transition: color 0.3s ease;
}

.gallery-arrow-left {
  left: -22px;
}

.gallery-arrow-right {
  right: -22px;
}

.images-container {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 0 24px 16px 24px;
  scroll-behavior: smooth;
  scrollbar-width: thin;
}

.images-container::-webkit-scrollbar {
  height: 8px;
}

.images-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.images-container::-webkit-scrollbar-thumb {
  background: rgb(20, 36, 69);
  border-radius: 4px;
}

.modal-image {
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.modal-image:hover {
  transform: scale(1.05);
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-description {
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid rgb(20, 36, 69);
}

.modal-description p {
  margin: 0;
  line-height: 1.6;
  color: #374151;
  font-size: 1rem;
}

.no-description {
  color: #9ca3af !important;
  font-style: italic;
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }

  .modal-content {
    max-height: 95vh;
    border-radius: 16px;
  }

  .modal-header {
    padding: 20px 20px 0 20px;
  }

  .modal-title {
    font-size: 1.5rem;
    padding-right: 50px;
  }

  .modal-body {
    padding: 15px 20px 20px 20px;
  }

  .modal-close {
    top: 15px;
    right: 15px;
    width: 36px;
    height: 36px;
  }

  .gallery-arrow {
    width: 36px;
    height: 36px;
  }

  .gallery-arrow-left {
    left: -18px;
  }

  .gallery-arrow-right {
    right: -18px;
  }

  .images-container {
    padding: 0 20px 16px 20px;
  }

  .modal-image {
    width: 150px;
    height: 150px;
  }

  .modal-description {
    padding: 20px;
  }
}
</style>
