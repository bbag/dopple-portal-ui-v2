import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IClient {
  clientId: string
  orgName: string
  members: IMember[]
}

export interface IMember {
  name: string
  email: string
  role: string
  workspaces: string[]
  customPermissions: string[]
}
export type TRole = 'Admin' | 'Editor' | 'Viewer' | 'Custom'

export const roles: { title: TRole }[] = [
  { title: 'Admin' },
  { title: 'Editor' },
  { title: 'Viewer' },
  { title: 'Custom' }
]

export const permissions = [
  {
    text: 'View analytics for products',
    allowedRoles: ['Admin', 'Editor', 'Viewer']
  },
  {
    text: 'Add/edit/remove whitelisted domains',
    allowedRoles: ['Admin', 'Editor']
  },
  {
    text: 'Create/edit/delete products',
    allowedRoles: ['Admin', 'Editor']
  },
  {
    text: 'Add/remove team members',
    allowedRoles: ['Admin']
  },
  {
    text: 'Edit team member roles',
    allowedRoles: ['Admin']
  }
]

export const useClientStore = defineStore('client', () => {
  const client = ref<IClient>({
    clientId: 'a4cb7e75-86d6-4d5a-87a9-5d31ec035b74',
    orgName: 'Dopple',
    members: [
      {
        name: 'Amanda Admin',
        email: 'amanda@example.com',
        role: 'Admin',
        workspaces: [],
        customPermissions: []
      },
      {
        name: 'Adam Admin',
        email: 'adam@example.com',
        role: 'Admin',
        workspaces: [],
        customPermissions: []
      },
      {
        name: 'Webdev Wayne',
        email: 'wayne@example.com',
        role: 'Editor',
        workspaces: [],
        customPermissions: []
      },
      {
        name: 'Artie Artist',
        email: 'artie@example.com',
        role: 'Editor',
        workspaces: [],
        customPermissions: []
      },
      {
        name: 'Marketing Mary',
        email: 'mary@example.com',
        role: 'Viewer',
        workspaces: [],
        customPermissions: []
      },
      {
        name: 'Product Paul',
        email: 'paul@example.com',
        role: 'Editor',
        workspaces: [],
        customPermissions: []
      }
    ]
  })

  return { client }
})
