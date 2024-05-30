import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { useProjectsStore } from '@/stores/projects'

export interface IWorkspace {
  id: string
  name: string
  dateCreated: Date
  dateModified: Date
  productCount: number
  projectCount: number
}

function getProductCount(workspace: string) {
  return useProductsStore().products.filter((p) => p.workspace === workspace).length || 0
}

function getProjectCount(workspace: string) {
  return useProjectsStore().projects.filter((p) => p.workspace === workspace).length || 0
}

export const useWorkspacesStore = defineStore('workspaces', () => {
  const currentWorkspace = ref<string>('')

  const workspaces = computed<IWorkspace[]>(() => [
    {
      id: '51a2139a-c82c-4c5c-b4e5-8eb394a7924e',
      name: 'crate-barrel-assets',
      dateCreated: new Date('2024-01-22T07:26:51'),
      dateModified: new Date('2024-03-29T08:16:47'),
      productCount: getProductCount('crate-barrel-assets'),
      projectCount: getProjectCount('crate-barrel-assets')
    },
    {
      id: '6a1e57ff-17be-4575-90f6-fc58d6813d28',
      name: 'demo-assets',
      dateCreated: new Date('2023-11-09T11:12:41'),
      dateModified: new Date('2024-04-21T12:52:09'),
      productCount: getProductCount('demo-assets'),
      projectCount: getProjectCount('demo-assets')
    },
    {
      id: '76b9d11c-0c9e-4e08-90ba-ae80abe46a65',
      name: 'rh-assets',
      dateCreated: new Date('2024-01-02T10:06:08'),
      dateModified: new Date('2024-03-28T15:39:20'),
      productCount: getProductCount('rh-assets'),
      projectCount: getProjectCount('rh-assets')
    },
    {
      id: '610f0586-756e-407a-a802-d0dcc3954388',
      name: 'test-workspace',
      dateCreated: new Date('2024-03-19T07:30:15'),
      dateModified: new Date('2024-04-14T09:22:53'),
      productCount: getProductCount('test-workspace'),
      projectCount: getProjectCount('test-workspace')
    },
    {
      id: 'a525b3d5-8547-4fb3-b14e-b1d6885ce401',
      name: 'empty-workspace',
      dateCreated: new Date('2024-04-01T09:28:59'),
      dateModified: new Date('2024-04-09T11:04:11'),
      productCount: getProductCount('empty-workspace'),
      projectCount: getProjectCount('empty-workspace')
    }
  ])

  function addNewWorkspace(name: string) {
    workspaces.value.push({
      id: crypto.randomUUID(),
      name: name || 'new-workspace',
      dateCreated: new Date(),
      dateModified: new Date(),
      productCount: getProductCount(name ? name : 'new-workspace'),
      projectCount: getProjectCount(name ? name : 'new-workspace')
    })
  }

  return { addNewWorkspace, currentWorkspace, workspaces }
})
