import { ref } from 'vue'
import { defineStore } from 'pinia'

import BikeThumbnail from '@/assets/img/bike.jpg'
import BoatThumbnail from '@/assets/img/boat.jpg'
import GenericThumbnail from '@/assets/img/generic.jpg'
import JacketThumbnail from '@/assets/img/jacket.jpg'
import LuggageThumbnail from '@/assets/img/luggage.jpg'
import MixerThumbnail from '@/assets/img/mixer.jpg'
import MotorcycleThumbnail from '@/assets/img/motorcycle.jpg'
import PurseThumbnail from '@/assets/img/purse.jpg'
import RingThumbnail from '@/assets/img/ring.jpg'
import SneakerThumbnail from '@/assets/img/sneaker.jpg'
import SofaThumbnail from '@/assets/img/sofa.jpg'

export interface IProduct {
  id: string
  title: string
  name: string
  workspace: string
  status: 'draft' | 'published'
  label: string
  description: string
  thumbnail: string
  isFavorite: boolean
  dateCreated: Date
  dateModified: Date
  models: string[]
  versions: IProductVersion[]
  cameras: ICamera[]
  hotspots: IHotspot[]
}

export interface IHotspot {
  id: string
  title: string
  position: { x: number; y: number; z: number }
}

export interface IProductVersion {
  isDefault: boolean
  draftVersion: number | null
  publishedVersion: number | null
  createdBy: string
  dateCreated: Date
}

export interface ICamera {
  name: string
  id: string
  zoom: {
    min: number | string | undefined
    max: number | string | undefined
    val: number
  }
  hAngle: {
    min: number | string | undefined
    max: number | string | undefined
    val: number
  }
  vAngle: {
    min: number | string | undefined
    max: number | string | undefined
    val: number
  }
  target: { x: number; y: number; z: number }
  clipDistance: { far: number | string | undefined; near: number | string | undefined }
  sensitivity: {
    pan: number | string | undefined
    rotate: number | string | undefined
    zoom: number | string | undefined
  }
  limitRadiusUsingBounds: boolean
  precision: { pinch: number | string | undefined; wheel: number | string | undefined }
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<IProduct[]>([
    {
      id: '1c43f733-457c-48ce-a5be-9c43aa5d296d',
      title: 'Motorcycle',
      name: 'arrow_motorcycle',
      workspace: 'demo-assets',
      status: 'published',
      label: 'demo',
      description: 'Vroom vroom I go zoom zoom.',
      thumbnail: MotorcycleThumbnail,
      isFavorite: true,
      dateCreated: new Date('2024-04-03T13:01:51'),
      dateModified: new Date('2024-04-23T13:01:51'),
      models: ['0wRtfJqUrw', 'bIEoS3Ad9g'],
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'Product Paul',
          dateCreated: new Date('2024-02-12T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          publishedVersion: null,
          createdBy: 'Webdev Wayne',
          dateCreated: new Date('2024-03-19T08:29:34')
        },
        {
          isDefault: true,
          draftVersion: 3,
          publishedVersion: 2,
          createdBy: 'Marketing Mary',
          dateCreated: new Date('2024-04-23T02:54:40')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: '5f67d5f6-e66e-404e-874c-ee2b6cd257dc',
          zoom: { min: 0.05, val: 2.5, max: 5.5 },
          hAngle: { min: '', val: 45, max: '' },
          vAngle: { min: 0, val: 98, max: 178 },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        },
        {
          name: 'front_view',
          id: 'ce25883e-1648-4864-9569-69624e77c6bc',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        },
        {
          name: 'side_view',
          id: '57bed3bc-988f-42fa-9cac-afcae730d2e4',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        },
        {
          name: 'top_view',
          id: 'f6ad2659-8a9b-4b41-b156-24b3638da6f9',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: [
        { id: 'motor', title: 'Motor', position: { x: 0.479, y: 0.584, z: 0 } },
        { id: 'suspension', title: 'Suspension', position: { x: 0.611, y: 0.482, z: 0.5 } },
        { id: 'handlebars', title: 'Handlebars', position: { x: 0.469, y: 0.258, z: 1 } },
        { id: 'tire_front', title: 'Front Tire', position: { x: 0.767, y: 0.603, z: 1.5 } },
        { id: 'tire_rear', title: 'Rear Tire', position: { x: 0.241, y: 0.626, z: 2 } }
      ]
    },
    {
      id: '903da72b-eda9-42d1-911e-6f0570c9df26',
      title: 'Purse',
      name: 'arrow_purse',
      workspace: 'demo-assets',
      status: 'published',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: PurseThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-04-02T12:08:59'),
      dateModified: new Date('2024-04-04T11:51:38'),
      models: ['7fC431d8dB'],
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'H.M. “Howlin’ Mad” Murdock',
          dateCreated: new Date('2024-02-12T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          publishedVersion: 2,
          createdBy: 'John “Hannibal” Smith',
          dateCreated: new Date('2024-03-19T08:29:34')
        },
        {
          isDefault: false,
          draftVersion: 3,
          publishedVersion: 3,
          createdBy: 'Templeton “Faceman” Peck',
          dateCreated: new Date('2024-03-21T12:54:40')
        },
        {
          isDefault: true,
          draftVersion: 4,
          publishedVersion: 4,
          createdBy: 'H.M. “Howlin’ Mad” Murdock',
          dateCreated: new Date('2024-03-21T12:57:51')
        },
        {
          isDefault: false,
          draftVersion: 5,
          publishedVersion: null,
          createdBy: 'B. A. Baracus',
          dateCreated: new Date('2024-03-26T20:03:27')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: '96ed3e12-db70-4fbb-9947-211bf4a2a443',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: '1000d50a-1940-42e7-9f0c-4dfbcf322f76',
      title: 'Leather Jacket',
      name: 'leather_jacket',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: JacketThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-03-29T20:03:27'),
      dateModified: new Date('2024-03-29T20:03:27'),
      models: ['F0601aA92d'],
      versions: [
        {
          isDefault: true,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'T-Pain',
          dateCreated: new Date('2024-02-12T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          publishedVersion: 2,
          createdBy: 'Ice-T',
          dateCreated: new Date('2024-03-19T08:29:34')
        },
        {
          isDefault: false,
          draftVersion: 3,
          publishedVersion: 3,
          createdBy: 'Mr. T',
          dateCreated: new Date('2024-03-20T00:15:47')
        },
        {
          isDefault: false,
          draftVersion: 4,
          publishedVersion: 4,
          createdBy: 'Mr. T',
          dateCreated: new Date('2024-03-21T12:54:40')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: 'ad87c7a4-3a3b-4748-9b49-16b606675b67',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: 'dd79a89b-c610-4254-9809-755dd0824629',
      title: 'Boat',
      name: 'arrow_boat',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: BoatThumbnail,
      isFavorite: true,
      dateCreated: new Date('2024-03-29T18:40:03'),
      dateModified: new Date('2024-03-29T18:40:03'),
      models: [],
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'Hulk Hogan',
          dateCreated: new Date('2024-02-12T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          publishedVersion: 2,
          createdBy: 'Rhea Ripley',
          dateCreated: new Date('2024-03-19T08:29:34')
        },
        {
          isDefault: false,
          draftVersion: 3,
          publishedVersion: null,
          createdBy: 'Randy Orton',
          dateCreated: new Date('2024-03-21T12:54:40')
        },
        {
          isDefault: false,
          draftVersion: 4,
          publishedVersion: 3,
          createdBy: 'Stone Cold Steve Austin',
          dateCreated: new Date('2024-03-21T12:57:51')
        },
        {
          isDefault: false,
          draftVersion: 5,
          publishedVersion: null,
          createdBy: 'Triple H',
          dateCreated: new Date('2024-03-26T20:03:27')
        },
        {
          isDefault: false,
          draftVersion: 6,
          publishedVersion: null,
          createdBy: 'The Undertaker',
          dateCreated: new Date('2024-03-31T02:10:05')
        },
        {
          isDefault: true,
          draftVersion: 7,
          publishedVersion: 4,
          createdBy: 'Macho Man Randy Savage',
          dateCreated: new Date('2024-04-03T11:56:22')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: '56009829-b29b-4022-a943-459beae2f5e6',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: '642773f1-4e99-4354-8504-ee85b597a173',
      title: 'Restoration Hardware - Couch',
      name: 'rh-couch',
      workspace: 'rh-assets',
      status: 'published',
      label: 'client',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: GenericThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-03-26T08:27:31'),
      dateModified: new Date('2024-03-26T08:27:31'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'T-Pain',
          dateCreated: new Date('2024-02-12T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          publishedVersion: 2,
          createdBy: 'Ice-T',
          dateCreated: new Date('2024-03-19T08:29:34')
        },
        {
          isDefault: false,
          draftVersion: 3,
          publishedVersion: 3,
          createdBy: 'Mr. T',
          dateCreated: new Date('2024-03-20T00:15:47')
        },
        {
          isDefault: false,
          draftVersion: 4,
          publishedVersion: 4,
          createdBy: 'Mr. T',
          dateCreated: new Date('2024-03-21T12:54:40')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: '288c232b-82df-41f8-8e89-da5da77278bc',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: '669b3f4c-3adf-49fd-ab12-dac0ab182539',
      title: 'Crate & Barrel Table',
      name: 'crate-barrel-demo',
      workspace: 'crate-barrel-assets',
      status: 'published',
      label: 'client',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: GenericThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-03-12T17:16:44'),
      dateModified: new Date('2024-03-12T17:16:44'),
      models: [],
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'Spider-Woman',
          dateCreated: new Date('2024-02-27T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          publishedVersion: null,
          createdBy: 'Jean Grey',
          dateCreated: new Date('2024-03-21T08:29:34')
        },
        {
          isDefault: true,
          draftVersion: 3,
          publishedVersion: 2,
          createdBy: 'Wonder Woman',
          dateCreated: new Date('2024-04-10T12:54:40')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: 'eb29f80e-a3a2-4c2c-89e5-6658c09c1756',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: '0105f181-c92f-4e67-a7e6-06fe8ac43921',
      title: 'Bike',
      name: 'arrow_bicycle_mvp',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: BikeThumbnail,
      isFavorite: true,
      dateCreated: new Date('2024-03-07T23:58:21'),
      dateModified: new Date('2024-03-07T23:58:21'),
      models: [],
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'Squilliam Fancyson',
          dateCreated: new Date('2024-02-12T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          publishedVersion: null,
          createdBy: 'The Hash-slinging Slasher',
          dateCreated: new Date('2024-03-19T08:29:34')
        },
        {
          isDefault: true,
          draftVersion: 3,
          publishedVersion: 2,
          createdBy: 'Smitty Werbenjägermanjensen (he was #1)',
          dateCreated: new Date('2024-03-21T02:54:40')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: '4844dc42-88b3-4504-a8e4-9fad6564f3ad',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: '7eaabb1c-fa7b-48d7-94aa-9629c19164bb',
      title: 'Luggage',
      name: 'arrow_luggage',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: LuggageThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-02-14T12:34:56'),
      dateModified: new Date('2024-02-14T12:34:56'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'T-Pain',
          dateCreated: new Date('2024-02-12T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          publishedVersion: 2,
          createdBy: 'Ice-T',
          dateCreated: new Date('2024-03-19T08:29:34')
        },
        {
          isDefault: false,
          draftVersion: 3,
          publishedVersion: 3,
          createdBy: 'Mr. T',
          dateCreated: new Date('2024-03-20T00:15:47')
        },
        {
          isDefault: false,
          draftVersion: 4,
          publishedVersion: 4,
          createdBy: 'Mr. T',
          dateCreated: new Date('2024-03-21T12:54:40')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: 'a1c9c3db-c683-4c1d-8f90-457643b76cfc',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: '1aad0a2c-52d7-4afe-9137-3f9c1db328bc',
      title: 'Mixer',
      name: 'arrow_mixer',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: MixerThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-02-12T09:36:50'),
      dateModified: new Date('2024-02-12T09:36:50'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'John Doe',
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: 'f3e183e4-fe8c-428e-8427-7a25a6e4c13c',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: '593b46c4-50c5-40ac-9cfb-c1eec09ef579',
      title: 'Sofa',
      name: 'arrow_sofa',
      workspace: 'test-workspace',
      status: 'draft',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: SofaThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-02-09T20:05:15'),
      dateModified: new Date('2024-02-09T20:05:15'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'John Doe',
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: '73a4bd13-2e76-4bd5-b025-1fe63e01cc94',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: 'e3d1b823-d95a-42b8-9830-c6071f257fc7',
      title: 'Sneaker',
      name: 'arrow_sneaker',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: SneakerThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-01-30T13:02:45'),
      dateModified: new Date('2024-01-30T13:02:45'),
      models: [],
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'Hulk Hogan',
          dateCreated: new Date('2024-02-12T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          publishedVersion: 2,
          createdBy: 'Rhea Ripley',
          dateCreated: new Date('2024-03-19T08:29:34')
        },
        {
          isDefault: false,
          draftVersion: 3,
          publishedVersion: null,
          createdBy: 'Randy Orton',
          dateCreated: new Date('2024-03-21T12:54:40')
        },
        {
          isDefault: false,
          draftVersion: 4,
          publishedVersion: 3,
          createdBy: 'Stone Cold Steve Austin',
          dateCreated: new Date('2024-03-21T12:57:51')
        },
        {
          isDefault: false,
          draftVersion: 5,
          publishedVersion: null,
          createdBy: 'Triple H',
          dateCreated: new Date('2024-03-26T20:03:27')
        },
        {
          isDefault: false,
          draftVersion: 6,
          publishedVersion: null,
          createdBy: 'The Undertaker',
          dateCreated: new Date('2024-03-31T02:10:05')
        },
        {
          isDefault: true,
          draftVersion: 7,
          publishedVersion: 4,
          createdBy: 'Macho Man Randy Savage',
          dateCreated: new Date('2024-04-03T11:56:22')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: '6a0f6f74-5e1b-44c1-970e-0be9980cf087',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: '8b25b00c-62f0-45b2-b2a1-429b1a190921',
      title: 'Ring',
      name: 'arrow_ring',
      workspace: 'test-workspace',
      status: 'published',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: RingThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-01-30T13:01:51'),
      dateModified: new Date('2024-01-30T13:01:51'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'T-Pain',
          dateCreated: new Date('2024-02-12T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          publishedVersion: 2,
          createdBy: 'Ice-T',
          dateCreated: new Date('2024-03-19T08:29:34')
        },
        {
          isDefault: false,
          draftVersion: 3,
          publishedVersion: 3,
          createdBy: 'Mr. T',
          dateCreated: new Date('2024-03-20T00:15:47')
        },
        {
          isDefault: false,
          draftVersion: 4,
          publishedVersion: 4,
          createdBy: 'Mr. T',
          dateCreated: new Date('2024-03-21T12:54:40')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: 'a55b2718-abd5-48ce-a219-e5d32a21ae2b',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: '19538769-4812-43e8-8392-55a76b469534',
      title: 'Guitar',
      name: 'arrow_guitar',
      workspace: 'test-workspace',
      status: 'draft',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: GenericThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-01-30T12:58:19'),
      dateModified: new Date('2024-01-30T12:58:19'),
      models: [],
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'Spider-Woman',
          dateCreated: new Date('2024-02-27T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          publishedVersion: null,
          createdBy: 'Jean Grey',
          dateCreated: new Date('2024-03-21T08:29:34')
        },
        {
          isDefault: true,
          draftVersion: 3,
          publishedVersion: 2,
          createdBy: 'Wonder Woman',
          dateCreated: new Date('2024-04-10T12:54:40')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: '770a2b98-c24c-419d-98ea-df015aed3c90',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: '26910000-d7d3-4f7f-97e8-aac3328c1225',
      title: 'Power Saw',
      name: 'arrow_saw',
      workspace: 'test-workspace',
      status: 'draft',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: GenericThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-01-29T17:04:30'),
      dateModified: new Date('2024-01-29T17:04:30'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'John Doe',
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: 'd5ca8506-a495-4cdd-bfe5-5bfe3a3ce5c0',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: '6d70fe4f-b9db-4685-b88c-6e3020df38d4',
      title: 'Watch',
      name: 'arrow_watch',
      workspace: 'demo-assets',
      status: 'published',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: GenericThumbnail,
      isFavorite: false,
      dateCreated: new Date('2024-01-11T11:22:33'),
      dateModified: new Date('2024-01-11T11:22:33'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'John Doe',
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: 'f4cd72b1-5ed7-489d-aa4e-1f4844ca09e8',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: '7a48f86c-e07e-47b9-a8f3-2664de1d6451',
      title: 'Helmet',
      name: 'arrow_helmet',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: GenericThumbnail,
      isFavorite: false,
      dateCreated: new Date('2023-12-25T07:30:31'),
      dateModified: new Date('2023-12-25T07:30:31'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'John Doe',
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: '4ef20152-8b3e-462a-ab28-ee84517b8ae4',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: '39017d41-7b70-4292-9aa4-5647aafae2ce',
      title: 'Chair',
      name: 'arrow_chair',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: GenericThumbnail,
      isFavorite: false,
      dateCreated: new Date('2023-12-04T14:53:00'),
      dateModified: new Date('2023-12-04T14:53:00'),
      models: [],
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'Hulk Hogan',
          dateCreated: new Date('2024-02-12T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          publishedVersion: 2,
          createdBy: 'Rhea Ripley',
          dateCreated: new Date('2024-03-19T08:29:34')
        },
        {
          isDefault: false,
          draftVersion: 3,
          publishedVersion: null,
          createdBy: 'Randy Orton',
          dateCreated: new Date('2024-03-21T12:54:40')
        },
        {
          isDefault: false,
          draftVersion: 4,
          publishedVersion: 3,
          createdBy: 'Stone Cold Steve Austin',
          dateCreated: new Date('2024-03-21T12:57:51')
        },
        {
          isDefault: false,
          draftVersion: 5,
          publishedVersion: null,
          createdBy: 'Triple H',
          dateCreated: new Date('2024-03-26T20:03:27')
        },
        {
          isDefault: false,
          draftVersion: 6,
          publishedVersion: null,
          createdBy: 'The Undertaker',
          dateCreated: new Date('2024-03-31T02:10:05')
        },
        {
          isDefault: true,
          draftVersion: 7,
          publishedVersion: 4,
          createdBy: 'Macho Man Randy Savage',
          dateCreated: new Date('2024-04-03T11:56:22')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: '09c17ae1-d4fb-4343-953d-5ffb2620814d',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    },
    {
      id: 'e3f9b709-fb13-4b24-b075-d47b617665c2',
      title: 'Golf Caddy',
      name: 'golf_caddy',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ducimus consequuntur, ratione, dolores praesentium atque nulla inventore, dolore aspernatur doloribus illo eligendi qui pariatur.',
      thumbnail: GenericThumbnail,
      isFavorite: false,
      dateCreated: new Date('2023-11-27T14:01:28'),
      dateModified: new Date('2023-11-27T14:01:28'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftVersion: 1,
          publishedVersion: 1,
          createdBy: 'John Doe',
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      cameras: [
        {
          name: 'default_camera',
          id: '489ac835-bc2f-430e-b370-f00c4a521f8f',
          zoom: { min: '', val: 2.5, max: '' },
          hAngle: { min: '', val: 0, max: '' },
          vAngle: { min: '', val: 0, max: '' },
          target: { x: 0, y: 0, z: 0 },
          clipDistance: { far: 2250.5, near: 0.01 },
          sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
          limitRadiusUsingBounds: false,
          precision: { pinch: 88.9, wheel: 88.9 }
        }
      ],
      hotspots: []
    }
  ])

  function getProductTitle(name: string | string[], workspace: string | string[]) {
    const product = products.value.find((p) => p.name === name && p.workspace === workspace)
    return product?.title
  }

  return { getProductTitle, products }
})
