import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomePage.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../pages/BlogPage.vue'),
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: () => import('../pages/BlogDetailPage.vue'),
    },
    {
      path: '/lab',
      name: 'lab',
      component: () => import('../pages/LabPage.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../pages/ProjectsPage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
