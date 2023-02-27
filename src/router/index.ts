import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AccountsPage from '@/views/accounts/AccountsPage.vue'
import HistoryPage from '@/views/history/HistoryPage.vue'
import CategoriesPage from '@/views/categories/CategoriesPage.vue'
import GoalsPage from '@/views/goals/GoalsPage.vue'
import ObligationsPage from '@/views/obligations/ObligationsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: AccountsPage,
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: AccountsPage,
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryPage,
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesPage,
  },
  {
    path: '/goals',
    name: 'goals',
    component: GoalsPage,
  },
  {
    path: '/obligations',
    name: 'obligations',
    component: ObligationsPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
