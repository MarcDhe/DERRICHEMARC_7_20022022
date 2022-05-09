import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Accueil.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/createPost',
    name: 'CreatePost',
    component: () => import('../views/CreatePost.vue')
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import('../views/Profil.vue')
  },
  {
  path: '/post/:id',   // https://router.vuejs.org/guide/essentials/named-routes.html
  name: 'Post',
  component: () => import('../views/Post.vue')
  },
  {
  path:'/messaging',
  name: 'Messaging',
  component: () => import('../views/Messaging.vue')
  },
  {
    path:'/search/:value',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/:pathMatch(.*)*',  // SI PAS DE MATCH SUR LES ROUTEs => ERROR https://stackoverflow.com/questions/40193634/vue-router-redirect-on-page-not-found-404#:~:text=%40-,mani%27s,-response%20is%20now 
    name : 'Error',
    component: () => import('../views/Error.vue')
  },

]

const router = createRouter({ // mode history pour le lien URL sans #
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
