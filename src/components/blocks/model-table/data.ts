import { h } from 'vue'

import { useModelsStore } from '@/stores/models'
const models = useModelsStore().models

import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircleCheck,
  IconCircle
} from '@tabler/icons-vue'

export const labels = [
  {
    value: 'client',
    label: 'Client'
  },
  {
    value: 'demo',
    label: 'Demo'
  }
]

export const favorites = [
  {
    value: true,
    label: 'Favorite',
    icon: h(IconCircleCheck, { class: 'text-emerald-600' })
  },
  {
    value: false,
    label: 'Non-Favorite',
    icon: h(IconCircle, { class: 'text-amber-500' })
  }
]

export const statuses = [
  {
    value: 'published',
    label: 'Published',
    icon: h(IconCircleCheck, { class: 'text-emerald-600' })
  },
  {
    value: 'draft',
    label: 'Draft',
    icon: h(IconCircle, { class: 'text-amber-500' })
  }
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: h(IconArrowDown)
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: h(IconArrowRight)
  },
  {
    label: 'High',
    value: 'high',
    icon: h(IconArrowUp)
  }
]

// export const workspaces = [
//   { label: 'crate-barrel-assets', value: 'crate-barrel-assets' },
//   { label: 'demo-assets', value: 'demo-assets' },
//   { label: 'rh-assets', value: 'rh-assets' }
// ]

export const workspaces = models
  .reduce(
    (acc, obj) => {
      if (!acc.some((item) => item.value === obj.workspace)) {
        acc.push({
          label: obj.workspace,
          value: obj.workspace
        })
      }
      return acc
    },
    [] as { label: string; value: string }[]
  )
  .sort((a, b) => a.label.localeCompare(b.label))
