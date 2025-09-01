import { createRouter, createWebHistory } from 'vue-router'
import FeedView from '@/views/FeedView.vue'
import EditProfileView from '@/views/EditProfileView.vue'
import TopicView from '@/views/TopicView.vue'
import EditTopicView from '@/views/EditTopicView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'feed',
      component: FeedView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: TopicView,
    },
    {
      path: '/topic/create',
      name: 'create-topic',
      component: () => import('@/views/CreateTopicView.vue'),
    },
    {
      path: '/topic/:id/edit',
      name: 'edit-topic',
      component: EditTopicView,
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/profile',
      name: 'edit-profile',
      component: EditProfileView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/404/NotFoundView.vue'),
    },
  ],
})

export default router
