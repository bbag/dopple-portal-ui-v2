import { ref } from 'vue'
import { defineStore } from 'pinia'

import GenericThumbnail from '@/assets/img/generic.jpg'

export interface IModel {
  id: string
  shortId: string
  name: string
  workspace: string
  status: 'draft' | 'published'
  thumbnail: string
  isFavorite: boolean
  dateCreated: Date
  dateModified: Date
  versions: IModelVersion[]
  materials: string[]
}

export interface IModelVersion {
  isDefault: boolean
  draftVersion: number
  publishedVersion: number
  createdBy: string
  dateCreated: Date
}

export const useModelsStore = defineStore('models', () => {
  const models = ref<IModel[]>([
    {
      id: 'e2f6385f-7809-426f-aac1-db603028d18e',
      shortId: 'db603028d1',
      name: 'export.gltf',
      workspace: 'demo-assets',
      status: 'published',
      thumbnail: GenericThumbnail,
      isFavorite: true,
      dateCreated: new Date('2024-04-03T14:21:09'),
      dateModified: new Date('2024-04-03T14:21:09'),
      versions: [
        {
          isDefault: true,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'Artie Artist',
          dateCreated: new Date('2024-04-03T14:21:09')
        }
      ],
      materials: ['2d28c74626', '8c3a240b45', '0ee2d924d8']
    },
    {
      id: '48bec761-860d-4d2f-8f78-05884754744d',
      shortId: '0588475474',
      name: 'chassis_final.gltf',
      workspace: 'demo-assets',
      status: 'published',
      thumbnail: GenericThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-02-21T12:41:30'),
      dateModified: new Date('2024-03-31T03:44:25'),
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'Artie Artist',
          dateCreated: new Date('2024-02-21T12:41:30')
        },
        {
          isDefault: false,
          draftVersion: 2,
          publishedVersion: 2,
          createdBy: 'Artie Artist',
          dateCreated: new Date('2024-02-22T17:29:34')
        },
        {
          isDefault: true,
          draftVersion: 3,
          publishedVersion: 3,
          createdBy: 'Product Paul',
          dateCreated: new Date('2024-02-25T09:01:43')
        }
      ],
      materials: ['2d28c74626', '8c3a240b45', '0ee2d924d8']
    },
    {
      id: 'b21a4428-4256-4c98-a9d2-1b40af0ae28f',
      shortId: '1b40af0ae2',
      name: 'example_model_01.gltf',
      workspace: 'demo-assets',
      status: 'published',
      thumbnail: GenericThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-01-01T23:00:19'),
      dateModified: new Date('2024-01-01T23:00:19'),
      versions: [
        {
          isDefault: true,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'Artie Artist',
          dateCreated: new Date('2024-01-01T23:00:19')
        }
      ],
      materials: ['2d28c74626', '8c3a240b45', '0ee2d924d8']
    },
    {
      id: '67e129ef-afbb-407e-8989-6ad4e576f65a',
      shortId: '6ad4e576f6',
      name: 'example_model_02.gltf',
      workspace: 'demo-assets',
      status: 'published',
      thumbnail: GenericThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-02-01T11:08:28'),
      dateModified: new Date('2024-02-22T12:55:25'),
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'Artie Artist',
          dateCreated: new Date('2024-02-01T11:08:28')
        },
        {
          isDefault: true,
          draftVersion: 2,
          publishedVersion: 2,
          createdBy: 'Marketing Mary',
          dateCreated: new Date('2024-02-22T12:55:25')
        }
      ],
      materials: ['2d28c74626', '8c3a240b45', '0ee2d924d8']
    }
  ])

  return { models }
})
