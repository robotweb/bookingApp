import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isLoading: false,
    isAnyPopoverOpen: false,
    errors: null,
    notifications: []
  }),

  actions: {
    setLoading(status: boolean) {
      this.isLoading = status
    },
    setPopoverState(isOpen: boolean) {
      this.isAnyPopoverOpen = isOpen
    },
    setError(error: any) {
      this.errors = error
    },
    clearError() {
      this.errors = null
    },
    clearNotifications() {
      this.notifications = []
    }
  },

  getters: {
    hasErrors: (state) => !!state.errors,
    latestNotification: (state) => state.notifications[state.notifications.length - 1]
  }
}) 