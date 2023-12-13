import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import SongPlayBackView from '@/views/SongPlayback.vue'
import PlaylistView from '@/views/PlaylistView.vue'
import SignInSignUpView from '@/views/SignInSignUp.vue'
import UserProfileView from '@/views/UserProfile.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import ResultsGenre from '@/views/ResultsGenre.vue'
import MyLibrary from '@/views/MyLibrary.vue'
import FriendProfileView from '@/views/FriendProfile.vue'
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
      component: SearchView
    },
    {
      path: '/my-library',
      name: 'myLibrary',
      component: MyLibrary,
    },
    {
      path: '/songs/:songId',
      name: 'SongPlayBack',
      component: SongPlayBackView,
    },
    {
      path: '/playlist/:playlistId',
      name: 'Playlist',
      component: PlaylistView,
    },
    {
      path: '/login-register',
      name: 'login',
      component: SignInSignUpView,
    },
    {
      path: '/user/profile',
      name: 'profile',
      component: UserProfileView,
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: ForgotPasswordView,
    },
    {
      path: '/reset-password',
      name: 'reset',
      component: ResetPasswordView,
    },
    {
      path: '/results-genre/:genre',
      name: 'ResultsGenre',
      component: ResultsGenre,
    },
    {
      path: '/friend/:friendId',
      name: 'FriendProfile',
      component: FriendProfileView,
    },
  ]
})

export default router
