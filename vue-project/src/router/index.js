import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MonitorView from '../views/MonitorView.vue'
import RICView from '../views/RICView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: MonitorView
    },
    {
      path: '/ric',
      name: 'ric',
      component: RICView
    },
    {
      path: '/ricSubscription',
      name: 'ricSubscription',
      component: () => import('../views/RICSubscriptionView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestJsPlumb.vue')
    },
    {
      path: '/test2',
      name: 'test2',
      component: () => import('../views/TestJsPlumb2.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../views/TableExcel.vue')
    },
  ]
})

export default router
