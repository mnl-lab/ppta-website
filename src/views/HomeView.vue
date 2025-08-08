<template>

  <div class="home">
    <!-- Hero Slideshow Section -->
    <section class="hero-slideshow">
      <div class="slideshow-container">
        <div class="slide" v-for="(image, index) in slideshowImages" :key="index"
          :class="{ active: currentSlide === index }" :style="{ backgroundImage: `url(${image})` }">
        </div>

        <!-- Navigation arrows -->
        <button class="slide-arrow slide-arrow-prev" @click="previousSlide" aria-label="Image précédente">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <button class="slide-arrow slide-arrow-next" @click="nextSlide" aria-label="Image suivante">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <!-- Slide indicators -->
        <div class="slide-indicators">
          <button v-for="(image, index) in slideshowImages" :key="index"
            :class="['slide-indicator', { active: currentSlide === index }]" @click="goToSlide(index)"
            :aria-label="`Aller à l'image ${index + 1}`">
          </button>
        </div>

        <!-- Overlay content -->
        <div class="slideshow-overlay">
          <div class="container">
            <h1 class="hero-title">Découvrez Nos Produits</h1>
            <p class="hero-subtitle">Explorez notre vaste collection à travers différentes catégories</p>
          </div>
        </div>
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
          <div v-for="service in services" :key="service.id" class="service-card" @click="openServiceModal(service)">
            <div class="service-image">
              <img :src="getFirstImage(service.images) || '/placeholder-image.jpg'" :alt="service.name" />
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
                  class="modal-image" @click="openZoom(imageUrl, selectedProduct?.name, index)">
                  <img :src="imageUrl" :alt="`${selectedProduct?.name} - Image ${index + 1}`" />
                  <div class="zoom-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" />
                      <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" />
                      <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" stroke-width="2" />
                      <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" stroke-width="2" />
                    </svg>
                  </div>
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

    <!-- Service Modal -->
    <div v-if="showServiceModal" class="modal-overlay" @click="closeServiceModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeServiceModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <div class="modal-header">
          <h2 class="modal-title">{{ selectedService?.name }}</h2>
        </div>

        <div class="modal-body">
          <div class="modal-images">
            <div class="images-gallery-container">
              <button class="gallery-arrow gallery-arrow-left" @click="scrollServiceGallery('left')"
                :disabled="!canScrollServiceLeft" v-show="getServiceImages(selectedService?.images).length > 1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>

              <div class="images-container" ref="serviceImagesContainer" @scroll="updateServiceScrollButtons">
                <div v-for="(imageUrl, index) in getServiceImages(selectedService?.images)" :key="index"
                  class="modal-image" @click="openZoom(imageUrl, selectedService?.name, index)">
                  <img :src="imageUrl" :alt="`${selectedService?.name} - Image ${index + 1}`" />
                  <div class="zoom-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" />
                      <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" />
                      <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" stroke-width="2" />
                      <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" stroke-width="2" />
                    </svg>
                  </div>
                </div>
              </div>

              <button class="gallery-arrow gallery-arrow-right" @click="scrollServiceGallery('right')"
                :disabled="!canScrollServiceRight" v-show="getServiceImages(selectedService?.images).length > 1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div class="modal-description">
            <p v-if="selectedService?.description">{{ selectedService.description }}</p>
            <p v-else class="no-description">Aucune description disponible</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Zoom Modal -->
    <div v-if="showZoom" class="zoom-modal-overlay" @click="closeZoom">
      <div class="zoom-modal-content" @click.stop>
        <button class="zoom-close" @click="closeZoom">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <!-- Navigation arrows for zoom modal -->
        <button v-if="zoomImages.length > 1" class="zoom-nav zoom-nav-left" @click="previousZoomImage"
          :disabled="currentZoomIndex <= 0">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <div class="zoom-image-container">
          <img :src="currentZoomImage" :alt="`${zoomItemName} - Image ${currentZoomIndex + 1}`" class="zoom-image" />
        </div>

        <button v-if="zoomImages.length > 1" class="zoom-nav zoom-nav-right" @click="nextZoomImage"
          :disabled="currentZoomIndex >= zoomImages.length - 1">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <!-- Image counter -->
        <div v-if="zoomImages.length > 1" class="zoom-counter">
          {{ currentZoomIndex + 1 }} / {{ zoomImages.length }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { fetchAllCategories } from '@/composables/fetchAllCategories';
import { fetchSubcategoryByCategory } from '@/composables/fetchSubcategoryByCategory';
import { fetchProductBySubcategory } from '@/composables/fetchProductBySubcategory';
import { fetchAllServices } from '@/composables/fetchAllServices';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

// Import slideshow images
import slide0 from '@/assets/slideshow/0.png';
import slide1 from '@/assets/slideshow/1.png';
import slide2 from '@/assets/slideshow/2.png';
import slide3 from '@/assets/slideshow/3.png';
import slide4 from '@/assets/slideshow/4.png';
import slide5 from '@/assets/slideshow/5.png';
import slide6 from '@/assets/slideshow/6.png';
import slide7 from '@/assets/slideshow/7.png';
import slide8 from '@/assets/slideshow/8.png';
import slide9 from '@/assets/slideshow/9.png';
import slide10 from '@/assets/slideshow/10.png';

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
const showServiceModal = ref(false);
const selectedService = ref(null);
const serviceImagesContainer = ref(null);
const canScrollServiceLeft = ref(false);
const canScrollServiceRight = ref(false);
const showZoom = ref(false);
const currentZoomImage = ref('');
const zoomImages = ref([]);
const currentZoomIndex = ref(0);
const zoomItemName = ref('');

// Slideshow data
const currentSlide = ref(0);
const slideshowImages = ref([
  slide0, slide1, slide2, slide3, slide4, slide5,
  slide6, slide7, slide8, slide9, slide10
]);
let slideshowInterval = null;

onMounted(async () => {
  categories.value = await fetchAllCategories();
  services.value = await fetchAllServices();
  loading.value = false;
  startSlideshow();
});

onUnmounted(() => {
  stopSlideshow();
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

// Slideshow methods
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slideshowImages.value.length;
};

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slideshowImages.value.length - 1 : currentSlide.value - 1;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const startSlideshow = () => {
  slideshowInterval = setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
};

const stopSlideshow = () => {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  }
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

// Helper function to get all images from the service images JSON
const getServiceImages = (images) => {
  if (!images) return [];

  try {
    const imageObj = typeof images === 'string' ? JSON.parse(images) : images;
    return Object.values(imageObj);
  } catch (error) {
    console.error('Error parsing service images:', error);
    return [];
  }
};

// Service Modal functions
const openServiceModal = async (service) => {
  selectedService.value = service;
  showServiceModal.value = true;
  document.body.style.overflow = 'hidden';

  // Wait for the modal to render then update scroll buttons
  await nextTick();
  updateServiceScrollButtons();
};

const closeServiceModal = () => {
  showServiceModal.value = false;
  selectedService.value = null;
  document.body.style.overflow = 'auto';
};

// Service Gallery scroll functions
const scrollServiceGallery = (direction) => {
  if (!serviceImagesContainer.value) return;

  const scrollAmount = 220; // Width of one image + gap
  const currentScroll = serviceImagesContainer.value.scrollLeft;

  if (direction === 'left') {
    serviceImagesContainer.value.scrollTo({
      left: currentScroll - scrollAmount,
      behavior: 'smooth'
    });
  } else {
    serviceImagesContainer.value.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  }
};

const updateServiceScrollButtons = () => {
  if (!serviceImagesContainer.value) return;

  const container = serviceImagesContainer.value;
  canScrollServiceLeft.value = container.scrollLeft > 0;
  canScrollServiceRight.value = container.scrollLeft < (container.scrollWidth - container.clientWidth);
};

// Zoom functionality
const openZoom = (imageUrl, itemName, index) => {
  // Determine if this is a product or service and get all images
  let allImages = [];
  if (selectedProduct.value) {
    allImages = getProductImages(selectedProduct.value.images);
    zoomItemName.value = selectedProduct.value.name;
  } else if (selectedService.value) {
    allImages = getServiceImages(selectedService.value.images);
    zoomItemName.value = selectedService.value.name;
  }

  zoomImages.value = allImages;
  currentZoomIndex.value = index;
  currentZoomImage.value = imageUrl;
  showZoom.value = true;
  document.body.style.overflow = 'hidden';
};

const closeZoom = () => {
  showZoom.value = false;
  currentZoomImage.value = '';
  zoomImages.value = [];
  currentZoomIndex.value = 0;
  zoomItemName.value = '';
  document.body.style.overflow = 'hidden'; // Keep modal scroll locked
};

const nextZoomImage = () => {
  if (currentZoomIndex.value < zoomImages.value.length - 1) {
    currentZoomIndex.value++;
    currentZoomImage.value = zoomImages.value[currentZoomIndex.value];
  }
};

const previousZoomImage = () => {
  if (currentZoomIndex.value > 0) {
    currentZoomIndex.value--;
    currentZoomImage.value = zoomImages.value[currentZoomIndex.value];
  }
};


</script>

<style scoped>
.hero-slideshow {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.slideshow-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.slide.active {
  opacity: 1;
}

.slideshow-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(20, 36, 69, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.slide-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  transition: all 0.3s ease;
  color: #1a202c;
}

.slide-arrow:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
}

.slide-arrow-prev {
  left: 20px;
}

.slide-arrow-next {
  right: 20px;
}

.slide-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 3;
}

.slide-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.7);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.slide-indicator.active {
  background: white;
  border-color: white;
}

.slide-indicator:hover {
  border-color: white;
  background: rgba(255, 255, 255, 0.5);
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
  color: white;
  text-align: center;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  color: white;
  text-align: center;
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

/* Responsive Design - Multiple Breakpoints */

/* Large desktops and up */
@media (min-width: 1400px) {
  .hero-slideshow {
    height: 600px;
  }

  .products-grid,
  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

/* Large tablets and small desktops */
@media (max-width: 1200px) {
  .hero-slideshow {
    height: 480px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .products-grid,
  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

/* Standard tablets */
@media (max-width: 960px) {
  .hero-slideshow {
    height: 450px;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .nav-tabs {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .category-tabs {
    justify-content: center;
    flex-wrap: wrap;
  }

  .category-tab,
  .services-tab {
    padding: 12px 20px;
    font-size: 0.95rem;
  }

  .products-grid,
  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
  }
}

/* Small tablets and large phones */
@media (max-width: 768px) {
  .hero-slideshow {
    height: 400px;
  }

  .hero-title {
    font-size: 2rem;
    padding: 0 20px;
    text-align: center;
  }

  .hero-subtitle {
    font-size: 1rem;
    padding: 0 20px;
    text-align: center;
  }

  .slide-arrow {
    width: 40px;
    height: 40px;
  }

  .slide-arrow-prev {
    left: 10px;
  }

  .slide-arrow-next {
    right: 10px;
  }

  .slide-indicators {
    bottom: 15px;
  }

  .slide-indicator {
    width: 10px;
    height: 10px;
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

/* Regular phones */
@media (max-width: 600px) {
  .hero-slideshow {
    height: 350px;
  }

  .hero-title {
    font-size: 1.75rem;
    padding: 0 15px;
  }

  .hero-subtitle {
    font-size: 0.95rem;
    padding: 0 15px;
  }

  .slide-arrow {
    width: 36px;
    height: 36px;
  }

  .slide-arrow-prev {
    left: 8px;
  }

  .slide-arrow-next {
    right: 8px;
  }

  .category-tab,
  .services-tab {
    padding: 10px 16px;
    font-size: 0.9rem;
  }

  .products-grid,
  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 14px;
  }

  .product-card,
  .service-card {
    min-height: 280px;
  }

  .product-name,
  .service-name {
    font-size: 1rem;
  }

  .product-description {
    font-size: 0.875rem;
    line-height: 1.4;
  }
}

/* Small phones */
@media (max-width: 480px) {
  .hero-slideshow {
    height: 300px;
  }

  .hero-title {
    font-size: 1.5rem;
    padding: 0 12px;
  }

  .hero-subtitle {
    font-size: 0.875rem;
    padding: 0 12px;
  }

  .slide-arrow {
    width: 32px;
    height: 32px;
  }

  .slide-arrow-prev {
    left: 6px;
  }

  .slide-arrow-next {
    right: 6px;
  }

  .slide-indicator {
    width: 8px;
    height: 8px;
  }

  .category-tab,
  .services-tab {
    padding: 8px 14px;
    font-size: 0.85rem;
  }

  .products-grid,
  .services-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .product-card,
  .service-card {
    min-height: 260px;
  }

  .subcategory-section {
    padding: 16px;
  }

  .subcategory-title {
    font-size: 1.3rem;
  }

  .category-title,
  .services-title {
    font-size: 1.75rem;
    text-align: center;
  }

  .product-card.horizontal {
    min-width: 200px;
  }
}

/* Very small phones */
@media (max-width: 360px) {
  .hero-slideshow {
    height: 280px;
  }

  .hero-title {
    font-size: 1.3rem;
    padding: 0 10px;
  }

  .hero-subtitle {
    font-size: 0.8rem;
    padding: 0 10px;
  }

  .slide-arrow {
    width: 28px;
    height: 28px;
  }

  .slide-arrow-prev {
    left: 4px;
  }

  .slide-arrow-next {
    right: 4px;
  }

  .category-tab,
  .services-tab {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  .product-card,
  .service-card {
    min-height: 240px;
  }

  .subcategory-section {
    padding: 12px;
  }

  .subcategory-title {
    font-size: 1.2rem;
  }

  .category-title,
  .services-title {
    font-size: 1.5rem;
  }
}

/* Landscape phones */
@media (max-width: 768px) and (orientation: landscape) {
  .hero-slideshow {
    height: 280px;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
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
  position: relative;
  cursor: zoom-in;
}

.zoom-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
}

.modal-image:hover .zoom-overlay {
  opacity: 1;
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

/* Zoom Modal Styles */
.zoom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  backdrop-filter: blur(8px);
}

.zoom-modal-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 95vw;
  max-height: 95vh;
}

.zoom-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2001;
  backdrop-filter: blur(10px);
  color: white;
}

.zoom-close:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

.zoom-image-container {
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.zoom-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  color: white;
}

.zoom-nav:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-50%) scale(1.1);
}

.zoom-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  transform: translateY(-50%);
}

.zoom-nav-left {
  left: 30px;
}

.zoom-nav-right {
  right: 30px;
}

.zoom-counter {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

@media (max-width: 960px) {
  .modal-overlay {
    padding: 8px;
  }

  .modal-content {
    max-height: 90vh;
    border-radius: 18px;
  }

  .modal-header {
    padding: 25px 25px 0 25px;
  }

  .modal-title {
    font-size: 1.7rem;
    padding-right: 55px;
  }

  .modal-body {
    padding: 18px 25px 25px 25px;
  }

  .modal-close {
    top: 18px;
    right: 18px;
    width: 38px;
    height: 38px;
  }

  .gallery-arrow {
    width: 38px;
    height: 38px;
  }

  .gallery-arrow-left {
    left: -19px;
  }

  .gallery-arrow-right {
    right: -19px;
  }

  .images-container {
    padding: 0 22px 16px 22px;
  }

  .modal-image {
    width: 180px;
    height: 180px;
  }

  .modal-description {
    padding: 22px;
  }
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

  /* Zoom modal mobile styles */
  .zoom-modal-overlay {
    padding: 10px;
  }

  .zoom-close {
    top: 15px;
    right: 15px;
    width: 44px;
    height: 44px;
  }

  .zoom-nav {
    width: 50px;
    height: 50px;
  }

  .zoom-nav-left {
    left: 15px;
  }

  .zoom-nav-right {
    right: 15px;
  }

  .zoom-counter {
    bottom: 20px;
    font-size: 0.8rem;
    padding: 6px 12px;
  }

  .zoom-image-container {
    max-width: 95%;
    max-height: 85%;
  }
}

@media (max-width: 600px) {
  .modal-overlay {
    padding: 6px;
  }

  .modal-content {
    border-radius: 14px;
  }

  .modal-header {
    padding: 16px 16px 0 16px;
  }

  .modal-title {
    font-size: 1.3rem;
    padding-right: 45px;
  }

  .modal-body {
    padding: 12px 16px 16px 16px;
  }

  .modal-close {
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
  }

  .gallery-arrow {
    width: 32px;
    height: 32px;
  }

  .gallery-arrow-left {
    left: -16px;
  }

  .gallery-arrow-right {
    right: -16px;
  }

  .images-container {
    padding: 0 18px 14px 18px;
    gap: 12px;
  }

  .modal-image {
    width: 130px;
    height: 130px;
  }

  .modal-description {
    padding: 16px;
    font-size: 0.9rem;
  }

  .zoom-modal-overlay {
    padding: 6px;
  }

  .zoom-close {
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
  }

  .zoom-nav {
    width: 44px;
    height: 44px;
  }

  .zoom-nav-left {
    left: 10px;
  }

  .zoom-nav-right {
    right: 10px;
  }

  .zoom-counter {
    bottom: 15px;
    font-size: 0.75rem;
    padding: 5px 10px;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 4px;
  }

  .modal-content {
    border-radius: 12px;
  }

  .modal-header {
    padding: 14px 14px 0 14px;
  }

  .modal-title {
    font-size: 1.2rem;
    padding-right: 40px;
    line-height: 1.3;
  }

  .modal-body {
    padding: 10px 14px 14px 14px;
  }

  .modal-close {
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
  }

  .gallery-arrow {
    width: 30px;
    height: 30px;
  }

  .gallery-arrow-left {
    left: -15px;
  }

  .gallery-arrow-right {
    right: -15px;
  }

  .images-container {
    padding: 0 16px 12px 16px;
    gap: 10px;
  }

  .modal-image {
    width: 110px;
    height: 110px;
  }

  .modal-description {
    padding: 14px;
    font-size: 0.85rem;
  }

  .zoom-close {
    top: 8px;
    right: 8px;
    width: 36px;
    height: 36px;
  }

  .zoom-nav {
    width: 40px;
    height: 40px;
  }

  .zoom-nav-left {
    left: 8px;
  }

  .zoom-nav-right {
    right: 8px;
  }

  .zoom-counter {
    bottom: 12px;
    font-size: 0.7rem;
    padding: 4px 8px;
  }
}

@media (max-width: 360px) {
  .modal-content {
    border-radius: 10px;
  }

  .modal-header {
    padding: 12px 12px 0 12px;
  }

  .modal-title {
    font-size: 1.1rem;
    padding-right: 35px;
  }

  .modal-body {
    padding: 8px 12px 12px 12px;
  }

  .modal-close {
    width: 28px;
    height: 28px;
  }

  .gallery-arrow {
    width: 28px;
    height: 28px;
  }

  .gallery-arrow-left {
    left: -14px;
  }

  .gallery-arrow-right {
    right: -14px;
  }

  .images-container {
    padding: 0 14px 10px 14px;
    gap: 8px;
  }

  .modal-image {
    width: 100px;
    height: 100px;
  }

  .modal-description {
    padding: 12px;
    font-size: 0.8rem;
  }

  .zoom-counter {
    bottom: 10px;
    font-size: 0.65rem;
    padding: 3px 6px;
  }
}
</style>
