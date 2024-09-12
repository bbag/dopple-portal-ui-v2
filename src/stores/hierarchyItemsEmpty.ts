import { defineStore } from 'pinia'

export interface ItemGeneric {
  id: string
  isHidden: boolean
  title: string
  canRename?: boolean
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

export const useHierarchyItemsEmptyStore = defineStore('hierarchyItemsEmpty', {
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
                title: 'default',
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
      }
    ]
  }),
  actions: {}
})
