import { ref } from 'vue'
import { defineStore } from 'pinia'

import GenericThumbnail from '@/assets/img/generic.jpg'

export interface ITexture {
  id: string
  shortId: string
  name: string
  workspace: string
  type: string
  resolution: { w: number; h: number }
  thumbnail: string
  dateCreated: Date
  dateModified: Date
  versions: ITextureVersion[]
}

export interface ITextureVersion {
  isDefault: boolean
  draftVersion: number
  published: number
  dateCreated: Date
}

export const useTexturesStore = defineStore('textures', () => {
  const textures = ref<ITexture[]>([
    {
      id: '7a0271e9-7ee3-40cf-9f64-43e9937bb0fb',
      shortId: '43e9937bb0',
      name: 'leather_albedo',
      workspace: 'demo-assets',
      type: 'PNG',
      resolution: { w: 2048, h: 2048 },
      thumbnail: GenericThumbnail,
      dateCreated: new Date('2024-03-01T18:24:17'),
      dateModified: new Date('2024-04-03T14:21:09'),
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ]
    },
    {
      id: 'bf3db6a7-b7e9-443f-9e6d-e8407ab49e21',
      shortId: 'e8407ab49e',
      name: 'leather_bump',
      workspace: 'demo-assets',
      type: 'PNG',
      resolution: { w: 2048, h: 2048 },
      thumbnail: GenericThumbnail,
      dateCreated: new Date('2024-03-01T18:24:17'),
      dateModified: new Date('2024-04-03T14:21:09'),
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ]
    },
    {
      id: '08ff75bc-2935-4894-830f-1e06388e01dd',
      shortId: '1e06388e01',
      name: 'leather_ao',
      workspace: 'demo-assets',
      type: 'PNG',
      resolution: { w: 1024, h: 1024 },
      thumbnail: GenericThumbnail,
      dateCreated: new Date('2024-03-01T18:24:17'),
      dateModified: new Date('2024-04-03T14:21:09'),
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ]
    },
    {
      id: 'c7718051-dfe9-421a-9024-cd4e6c1b95bb',
      shortId: 'cd4e6c1b95',
      name: 'chassis_albedo',
      workspace: 'demo-assets',
      type: 'PNG',
      resolution: { w: 2048, h: 2048 },
      thumbnail: GenericThumbnail,
      dateCreated: new Date('2024-03-01T18:24:17'),
      dateModified: new Date('2024-04-03T14:21:09'),
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ]
    },
    {
      id: '3260d57d-7952-4c08-8256-78b261a20386',
      shortId: '78b261a203',
      name: 'chassis_bump',
      workspace: 'demo-assets',
      type: 'PNG',
      resolution: { w: 2048, h: 2048 },
      thumbnail: GenericThumbnail,
      dateCreated: new Date('2024-03-01T18:24:17'),
      dateModified: new Date('2024-04-03T14:21:09'),
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ]
    },
    {
      id: '3b077162-e394-48de-8eae-e6bb811fc14e',
      shortId: 'e6bb811fc1',
      name: 'chassis_metallic',
      workspace: 'demo-assets',
      type: 'PNG',
      resolution: { w: 1024, h: 1024 },
      thumbnail: GenericThumbnail,
      dateCreated: new Date('2024-03-01T18:24:17'),
      dateModified: new Date('2024-04-03T14:21:09'),
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ]
    },
    {
      id: '2d6718de-de1b-4611-bdf4-0265624cc576',
      shortId: '0265624cc5',
      name: 'chassis_ao',
      workspace: 'demo-assets',
      type: 'PNG',
      resolution: { w: 1024, h: 1024 },
      thumbnail: GenericThumbnail,
      dateCreated: new Date('2024-03-01T18:24:17'),
      dateModified: new Date('2024-04-03T14:21:09'),
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ]
    }
  ])

  return { textures }
})
