import { ref } from 'vue'
import { defineStore } from 'pinia'

import GenericThumbnail from '@/assets/img/generic.jpg'

export interface IMaterial {
  id: string
  shortId: string
  name: string
  workspace: string
  type: string
  thumbnail: string
  dateCreated: Date
  dateModified: Date
  versions: IMaterialVersion[]
}

export interface IMaterialVersion {
  isDefault: boolean
  draftVersion: number
  published: number
  dateCreated: Date
}

export const useMaterialsStore = defineStore('materials', () => {
  const materials = ref<IMaterial[]>([
    {
      id: '2aa86839-2bcf-4b67-af24-2d28c74626ce',
      shortId: '2d28c74626',
      name: 'leather_black',
      workspace: 'demo-assets',
      type: 'PBR',
      thumbnail: GenericThumbnail,
      dateCreated: new Date('2024-03-01T18:24:17'),
      dateModified: new Date('2024-04-03T14:21:09'),
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          published: 2,
          dateCreated: new Date('2024-03-19T08:29:34')
        }
      ]
    },
    {
      id: 'cf550443-20c7-4f70-b692-8c3a240b4558',
      shortId: '8c3a240b45',
      name: 'leather_tan',
      workspace: 'demo-assets',
      type: 'PBR',
      thumbnail: GenericThumbnail,
      dateCreated: new Date('2024-03-02T18:24:17'),
      dateModified: new Date('2024-04-04T14:21:09'),
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          published: 1,
          dateCreated: new Date('2024-02-13T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          published: 2,
          dateCreated: new Date('2024-03-20T08:29:34')
        }
      ]
    },
    {
      id: '516d5571-f5f6-42a4-9a24-0ee2d924d872',
      shortId: '0ee2d924d8',
      name: 'leather_onyx',
      workspace: 'demo-assets',
      type: 'PBR',
      thumbnail: GenericThumbnail,
      dateCreated: new Date('2024-03-03T18:24:17'),
      dateModified: new Date('2024-04-05T14:21:09'),
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          published: 1,
          dateCreated: new Date('2024-02-14T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          published: 2,
          dateCreated: new Date('2024-03-21T08:29:34')
        }
      ]
    }
  ])

  return { materials }
})
