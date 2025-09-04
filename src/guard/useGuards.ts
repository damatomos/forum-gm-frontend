import { useAuthStore } from '@/stores/auth'
import type {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'

export function useGuards(
  to: RouteLocationNormalizedGeneric,
  _from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated && to.meta.requiresAuth) {
    next({
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    })
  } else if (to.meta.guestOnly && isAuthenticated) {
    next({ name: 'feed' })
  } else {
    next()
  }
}
