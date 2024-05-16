import { ref } from 'vue'
import { defineStore } from 'pinia'

export type TTestRole = 'Admin' | 'Editor' | 'Viewer'

/** This is just for testing how different roles will see a different UX/UI across the platform */
export const useTestRolesStore = defineStore('testRoles', () => {
  const testRoles: TTestRole[] = [ 'Admin', 'Editor', 'Viewer' ]
  const currentTestRole = ref<TTestRole>('Admin')
  return { currentTestRole, testRoles }
})
