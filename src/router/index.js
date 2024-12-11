import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import App from '@/App.vue'
import BooksList from '@/components/BooksList.vue'
import AddBook from '@/components/AddBook.vue'
import AppCart from '@/components/AppCart.vue'
import AppMessages from '@/components/AppMessages.vue'
import AppAbout from '@/components/AppAbout.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BooksList,
    },
    {
      path: '/about',
      name: 'about',
      component: AppAbout,
    },
    {
      path: '/create',
      name: 'create',
      component: AddBook,
    },
    {
      path: '/cart',
      name: 'cart',
      component: AppCart,
    },
    {
      path: '/messages',
      name: 'messages',
      component: AppMessages,
    }
  ],
})

export default router
