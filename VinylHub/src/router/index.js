import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SongPlayBackView from '../views/SongPlayback.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'search',
      component: HomeView
    },
    {
      path: '/my-library',
      name: 'myLibrary',
      component: HomeView
    },
    {
      path: '/song/:songName/:artist',
      name: 'SongPlayBack',
      component: SongPlayBackView,
    },
  ]
})

export default router
