import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
    guestOnly?: boolean
    requiresOwner?: boolean
  }
}
