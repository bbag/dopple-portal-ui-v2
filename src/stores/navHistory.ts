import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavHistoryStore = defineStore('navHistory', () => {
  const canGoBack = ref(false)
  const canGoForward = ref(false)

  return { canGoBack, canGoForward }
})
