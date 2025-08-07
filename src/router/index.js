import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/category/:categoryName/subcategory/:subcategoryName',
    name: 'subcategory',
    component: () => import('../views/SubcategoryView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/produits',
    name: 'produits',
    component: () => import('../views/ProduitsView.vue')
  },
  {
    path: '/produits/:id',
    name: 'produit-detail',
    component: () => import('../views/ProduitDetailView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
