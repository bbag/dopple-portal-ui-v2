import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IDomain {
  url: string
}

export const useDomainsStore = defineStore('domains', () => {
  const domains = ref<IDomain[]>([
    { url: 'https://www.mywebsite.com' },
    { url: 'https://www.example.net' },
    { url: 'http://localhost:1337' },
    { url: 'http://192.168.0.001:3000' }
  ])

  return { domains }
})
