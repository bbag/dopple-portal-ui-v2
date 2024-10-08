import { defineStore } from 'pinia'
import PlaceholderAlbedo from '../assets/img/placeholder-albedo.png'
import PlaceholderAO from '../assets/img/placeholder-ao.png'
import PlaceholderNormal from '../assets/img/placeholder-normal.png'
import PlaceholderRoughness from '../assets/img/placeholder-roughness.png'

export interface ItemGeneric {
  id: string
  isHidden: boolean
  title: string
  canRename?: boolean
  notification?: string
}

export type HierarchyItem =
  | ItemGroup
  | ItemEnvironment
  | ItemMesh
  | ItemNode
  | ItemCamera
  | ItemGlobal
  | ItemTexture
  | ItemMaterial
  | ItemAnimation
  | ItemLight

export interface ItemGroup extends ItemGeneric {
  type: 'group'
  translation: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
  children: HierarchyItem[]
}

export interface ItemAnimation extends ItemGeneric {
  type: 'animation'
}

export interface ItemCamera extends ItemGeneric {
  type: 'camera'
  aspectRatio: number[]
  fov: number[]
  farDepthRange: number
  nearDepthRange: number
  translation: { x: number; y: number; z: number }
  target: { x: number; y: number; z: number }
  distanceMin: number
  distanceMax: number
  zoomMin: number
  zoomMax: number
  polarAngleMin: number
  polarAngleMax: number
  azimuthAngleMin: number
  azimuthAngleMax: number
  smoothTime: number
  draggingSmoothTime: number
  polarRotateSpeed: number
  azimuthRotateSpeed: number
  dollySpeed: number
  truckSpeed: number
  autoRotateSpeed: number
}

export interface ItemEnvironment extends ItemGeneric {
  type: 'environment'
}

export interface ItemGlobal extends ItemGeneric {
  type: 'global'
}

export interface ItemLight extends ItemGeneric {
  type: 'light'
}

export interface ItemMaterial extends ItemGeneric {
  type: 'material'
  baseColor: string
  emissiveColor: string
  doubleSided: boolean
  alphaCutoff: number
  alphaMode: 'Opaque' | 'Mask' | 'Blend'
  roughnessFactor: number
  metallicFactor: number
}

export interface ItemMesh extends ItemGeneric {
  type: 'mesh'
}

export interface ItemNode extends ItemGeneric {
  type: 'node'
}

export interface ItemTexture extends ItemGeneric {
  type: 'texture'
  file: string
  resolution: { w: number; h: number }
  preview: string
}

function randomId() {
  return Math.random().toString(16).substring(2, 14)
}

interface State {
  activeItem: HierarchyItem | null
  items: HierarchyItem[]
}

export const useHierarchyItemsStore = defineStore('hierarchyItems', {
  state: (): State => ({
    activeItem: null as HierarchyItem | null,
    items: [
      {
        type: 'group',
        id: randomId(),
        title: 'Global',
        isHidden: false,
        canRename: false,
        translation: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        children: [
          {
            type: 'group',
            id: randomId(),
            title: 'Environments',
            isHidden: false,
            translation: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            children: [
              {
                type: 'environment',
                id: randomId(),
                title: 'Chair-Environment',
                isHidden: true
              },
              {
                type: 'environment',
                id: randomId(),
                title: 'Chair2-Environment',
                isHidden: true
              },
              {
                type: 'environment',
                id: randomId(),
                title: 'Chair3-Environment',
                isHidden: false
              }
            ]
          },
          {
            type: 'camera',
            id: randomId(),
            title: 'Editor Camera',
            isHidden: false,
            aspectRatio: [1.537],
            fov: [65],
            farDepthRange: 250,
            nearDepthRange: 0.01,
            translation: { x: 0, y: 1.6, z: 3 },
            target: { x: 0, y: 0, z: 0 },
            distanceMin: 0,
            distanceMax: 0,
            zoomMin: 0.05,
            zoomMax: 0,
            polarAngleMin: 0,
            polarAngleMax: 3.141,
            azimuthAngleMin: 0,
            azimuthAngleMax: 0,
            smoothTime: 0.25,
            draggingSmoothTime: 0.125,
            azimuthRotateSpeed: 1,
            polarRotateSpeed: 1,
            dollySpeed: 1,
            truckSpeed: 2,
            autoRotateSpeed: 0
          }
        ]
      },
      {
        type: 'group',
        id: randomId(),
        title: 'TheChair',
        isHidden: false,
        translation: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        children: [
          {
            type: 'group',
            id: randomId(),
            title: 'Positioning',
            isHidden: false,
            translation: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            children: [
              {
                type: 'node',
                id: randomId(),
                title: 'default',
                isHidden: false
              }
            ]
          },
          {
            type: 'group',
            id: randomId(),
            title: 'Nodes',
            isHidden: false,
            translation: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            children: [
              {
                type: 'group',
                id: randomId(),
                title: 'arms',
                isHidden: false,
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                children: [
                  {
                    type: 'mesh',
                    id: randomId(),
                    title: 'Mesh.007',
                    isHidden: false
                  }
                ]
              },
              {
                type: 'group',
                id: randomId(),
                title: 'back',
                isHidden: false,
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                children: [
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'Group.005',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'back_carbon_fiber',
                        isHidden: false
                      },
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'back_circuit_ivory',
                        isHidden: false
                      },
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'back_circuit_onyx',
                        isHidden: false
                      },
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'back_grey_oak',
                        isHidden: false
                      },
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'back_ivory_oak',
                        isHidden: false
                      },
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'back_natural_oak',
                        isHidden: false
                      },
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'back_sierra_oak',
                        isHidden: false
                      },
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'back_standard_black',
                        isHidden: false
                      },
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'back_walnut',
                        isHidden: false
                      }
                    ]
                  }
                ]
              },
              {
                type: 'group',
                id: randomId(),
                title: 'base',
                isHidden: false,
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                children: [
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'base_4_spoke',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Mesh.010',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'base_5_spoke',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Mesh.009',
                        isHidden: false
                      }
                    ]
                  }
                ]
              },
              {
                type: 'group',
                id: randomId(),
                title: 'chassis',
                isHidden: false,
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                children: [
                  {
                    type: 'mesh',
                    id: randomId(),
                    title: 'Mesh.017',
                    isHidden: false
                  }
                ]
              },
              {
                type: 'group',
                id: randomId(),
                title: 'cushions',
                isHidden: true,
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                children: [
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'cushions_boucle',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Mesh.006',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'cushions_leather',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'RetopoFlow.014',
                        isHidden: false
                      }
                    ]
                  }
                ]
              },
              {
                type: 'group',
                id: randomId(),
                title: 'mat_library',
                isHidden: false,
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                children: [
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'back_carbon_fiber',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'back_circuit_ivory',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.001',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'back_circuit_onyx',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.021',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'back_grey_oak',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.004',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'back_ivory_oak',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.008',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'back_natural_oak',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.009',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'back_sierra_oak',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.007',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'back_standard_black',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.010',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'back_walnut',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.020',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'chassis_quartz',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.018',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'cushions_boucle_dune',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.016',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'cushions_boucle_ivory',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.019',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'cushions_boucle_onyx',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.014',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'cushions_boucle_steel',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.015',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'cushions_leather_dune',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.002',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'cushions_leather_ivory',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.003',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'cushions_leather_onyx',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.005',
                        isHidden: false
                      }
                    ]
                  },
                  {
                    type: 'group',
                    id: randomId(),
                    title: 'cushions_leather_steel',
                    isHidden: false,
                    translation: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                    children: [
                      {
                        type: 'mesh',
                        id: randomId(),
                        title: 'Plane.006',
                        isHidden: false
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: 'group',
            id: randomId(),
            title: 'Materials',
            isHidden: false,
            translation: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            children: [
              {
                type: 'material',
                id: randomId(),
                title: 'back_circuit_ivory',
                isHidden: false,
                baseColor: '#FEFEFE',
                emissiveColor: '#000000',
                doubleSided: true,
                alphaCutoff: 0.5,
                alphaMode: 'Opaque',
                roughnessFactor: 1,
                metallicFactor: 1
              },
              {
                type: 'material',
                id: randomId(),
                title: 'back_circuit_onyx',
                isHidden: false,
                baseColor: '#FEFEFE',
                emissiveColor: '#000000',
                doubleSided: true,
                alphaCutoff: 0.5,
                alphaMode: 'Opaque',
                roughnessFactor: 1,
                metallicFactor: 1
              },
              {
                type: 'material',
                id: randomId(),
                title: 'back_grey_oak',
                isHidden: false,
                baseColor: '#FEFEFE',
                emissiveColor: '#000000',
                doubleSided: true,
                alphaCutoff: 0.5,
                alphaMode: 'Opaque',
                roughnessFactor: 1,
                metallicFactor: 1
              },
              {
                type: 'material',
                id: randomId(),
                title: 'back_natural_oak',
                isHidden: false,
                baseColor: '#FEFEFE',
                emissiveColor: '#000000',
                doubleSided: true,
                alphaCutoff: 0.5,
                alphaMode: 'Opaque',
                roughnessFactor: 1,
                metallicFactor: 1
              },
              {
                type: 'material',
                id: randomId(),
                title: 'cushions_boucle_onyx',
                isHidden: false,
                baseColor: '#FEFEFE',
                emissiveColor: '#000000',
                doubleSided: true,
                alphaCutoff: 0.5,
                alphaMode: 'Opaque',
                roughnessFactor: 1,
                metallicFactor: 1
              },
              {
                type: 'material',
                id: randomId(),
                title: 'cushions_leather_dune',
                isHidden: false,
                baseColor: '#FEFEFE',
                emissiveColor: '#000000',
                doubleSided: true,
                alphaCutoff: 0.5,
                alphaMode: 'Opaque',
                roughnessFactor: 1,
                metallicFactor: 1
              }
            ]
          },
          {
            type: 'group',
            id: randomId(),
            title: 'Textures',
            isHidden: false,
            translation: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            children: [
              {
                type: 'texture',
                id: randomId(),
                title: 'Body_AO',
                isHidden: false,
                file: 'body_ao.png',
                resolution: { w: 1024, h: 1024 },
                preview: PlaceholderAO
              },
              {
                type: 'texture',
                id: randomId(),
                title: 'Body_Normal',
                isHidden: false,
                file: 'body_normal.png',
                resolution: { w: 4096, h: 4096 },
                preview: PlaceholderNormal,
                notification: 'file-missing'
              },
              {
                type: 'texture',
                id: randomId(),
                title: 'Body_Onyx_Albedo',
                isHidden: false,
                file: 'body_onyx_albedo.png',
                resolution: { w: 2048, h: 2048 },
                preview: PlaceholderAlbedo
              },
              {
                type: 'texture',
                id: randomId(),
                title: 'Body_Onyx_Metallic_Roughness',
                isHidden: false,
                file: 'body_onyx_metallic_roughness.png',
                resolution: { w: 1024, h: 1024 },
                preview: PlaceholderRoughness
              },
              {
                type: 'texture',
                id: randomId(),
                title: 'Body_Quartz_Albedo',
                isHidden: false,
                file: 'body_quartz_albedo.png',
                resolution: { w: 2048, h: 2048 },
                preview: PlaceholderAlbedo
              },
              {
                type: 'texture',
                id: randomId(),
                title: 'Body_Quartz_Metallic_Roughness',
                isHidden: false,
                file: 'body_quartz_metallic_roughness.png',
                resolution: { w: 1024, h: 1024 },
                preview: PlaceholderRoughness
              },
              {
                type: 'texture',
                id: randomId(),
                title: 'Cushions_Dune_Albedo',
                isHidden: false,
                file: 'cushions_dune_albedo.png',
                resolution: { w: 2048, h: 2048 },
                preview: PlaceholderAlbedo
              },
              {
                type: 'texture',
                id: randomId(),
                title: 'Cushions_Ivory_Albedo',
                isHidden: false,
                file: 'cushions_ivory_albedo.png',
                resolution: { w: 2048, h: 2048 },
                preview: PlaceholderAlbedo
              },
              {
                type: 'texture',
                id: randomId(),
                title: 'Cushions_Leather_AO',
                isHidden: false,
                file: 'cushions_leather_ao.png',
                resolution: { w: 1024, h: 1024 },
                preview: PlaceholderAO
              },
              {
                type: 'texture',
                id: randomId(),
                title: 'Cushions_Leather_Normal',
                isHidden: false,
                file: 'cushions_leather_normal.png',
                resolution: { w: 4096, h: 4096 },
                preview: PlaceholderNormal
              },
              {
                type: 'texture',
                id: randomId(),
                title: 'Cushions_Pink_Albedo',
                isHidden: false,
                file: 'cushions_pink_albedo.png',
                resolution: { w: 2048, h: 2048 },
                preview: PlaceholderAlbedo
              },
              {
                type: 'texture',
                id: randomId(),
                title: 'Cushions_Steel_Albedo',
                isHidden: false,
                file: 'cushions_steel_albedo.png',
                resolution: { w: 2048, h: 2048 },
                preview: PlaceholderAlbedo
              }
            ]
          },
          {
            type: 'group',
            id: randomId(),
            title: 'Cameras',
            isHidden: false,
            translation: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            children: [
              {
                type: 'camera',
                id: randomId(),
                title: 'Camera.1723839127-Front',
                isHidden: false,
                aspectRatio: [1.537],
                fov: [65],
                farDepthRange: 250,
                nearDepthRange: 0.01,
                translation: { x: 0, y: 1.6, z: 3 },
                target: { x: 0, y: 0, z: 0 },
                distanceMin: 0,
                distanceMax: 0,
                zoomMin: 0.05,
                zoomMax: 0,
                polarAngleMin: 0,
                polarAngleMax: 3.141,
                azimuthAngleMin: 0,
                azimuthAngleMax: 0,
                smoothTime: 0.25,
                draggingSmoothTime: 0.125,
                azimuthRotateSpeed: 1,
                polarRotateSpeed: 1,
                dollySpeed: 1,
                truckSpeed: 2,
                autoRotateSpeed: 0
              },
              {
                type: 'camera',
                id: randomId(),
                title: 'Camera.1755031337-Back',
                isHidden: false,
                aspectRatio: [1.537],
                fov: [65],
                farDepthRange: 250,
                nearDepthRange: 0.01,
                translation: { x: 0, y: 1.6, z: 3 },
                target: { x: 0, y: 0, z: 0 },
                distanceMin: 0,
                distanceMax: 0,
                zoomMin: 0.05,
                zoomMax: 0,
                polarAngleMin: 0,
                polarAngleMax: 3.141,
                azimuthAngleMin: 0,
                azimuthAngleMax: 0,
                smoothTime: 0.25,
                draggingSmoothTime: 0.125,
                azimuthRotateSpeed: 1,
                polarRotateSpeed: 1,
                dollySpeed: 1,
                truckSpeed: 2,
                autoRotateSpeed: 0
              }
            ]
          },
          {
            type: 'group',
            id: randomId(),
            title: 'Animations',
            isHidden: false,
            translation: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            children: []
          }
        ]
      }
    ]
  }),
  actions: {}
})
