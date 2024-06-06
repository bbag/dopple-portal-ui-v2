import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IAsset {
  type: string
  title: string
  dateCreated: Date
  children?: IAsset[]
}

export const useAssetsStore = defineStore('assets', () => {
  const assets = ref<IAsset[]>([
    {
      type: 'folder',
      title: 'Models',
      dateCreated: new Date('2024-04-28T08:44:18'),
      children: [
        {
          type: 'folder',
          title: 'animations',
          dateCreated: new Date('2024-04-28T08:44:18'),
          children: [
            {
              type: '.png',
              title: 'baseColor_1.png',
              dateCreated: new Date('2024-04-28T08:44:18')
            },
            {
              type: '.bin',
              title: 'Mesh.001.bin',
              dateCreated: new Date('2024-04-28T08:44:18')
            },
            {
              type: '.bin',
              title: 'Mesh.028.bin',
              dateCreated: new Date('2024-04-28T08:44:18')
            },
            {
              type: '.bin',
              title: 'Mesh.272.bin',
              dateCreated: new Date('2024-04-28T08:44:18')
            },
            {
              type: '.bin',
              title: 'Mesh.387.bin',
              dateCreated: new Date('2024-04-28T08:44:18')
            },
            {
              type: '.gltf',
              title: 'model.gltf',
              dateCreated: new Date('2024-04-28T08:44:18')
            },
            {
              type: '.png',
              title: 'normal_1.png',
              dateCreated: new Date('2024-04-28T08:44:18')
            },
            {
              type: '.png',
              title: 'occlusion_1.png',
              dateCreated: new Date('2024-04-28T08:44:18')
            }
          ]
        },
        {
          type: 'folder',
          title: 'guitar',
          dateCreated: new Date('2024-04-28T08:44:18'),
          children: [
            {
              type: 'folder',
              title: 'textures',
              dateCreated: new Date('2024-04-28T08:44:18'),
              children: [
                {
                  type: 'folder',
                  title: 'final_desktop',
                  dateCreated: new Date('2024-04-28T08:44:18'),
                  children: [
                    {
                      type: '.png',
                      title: 'Guitar_Body_Albedo.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Body_AO.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Body_Normal.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Body_Roughness.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_Albedo.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_AO.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_Normal.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_Roughness.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_Metallic.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    }
                  ]
                },
                {
                  type: 'folder',
                  title: 'final_mobile',
                  dateCreated: new Date('2024-04-28T08:44:18'),
                  children: [
                    {
                      type: '.png',
                      title: 'Guitar_Body_Albedo.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Body_AO.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Body_Normal.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Body_Roughness.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_Albedo.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_AO.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_Metallic.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_Normal.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_Roughness.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    }
                  ]
                },
                {
                  type: 'folder',
                  title: 'initial',
                  dateCreated: new Date('2024-04-28T08:44:18'),
                  children: [
                    {
                      type: '.png',
                      title: 'Guitar_Body_Albedo.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Body_AO.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Body_Normal.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Body_Roughness.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_Albedo.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_AO.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_Metallic.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_Normal.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Guitar_Neck_Roughness.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    }
                  ]
                }
              ]
            },
            {
              type: '.bin',
              title: 'arrow_guitar.bin',
              dateCreated: new Date('2024-04-28T08:44:18')
            },
            {
              type: '.gltf',
              title: 'arrow_guitar.gltf',
              dateCreated: new Date('2024-04-28T08:44:18')
            }
          ]
        }
      ]
    },
    {
      type: 'folder',
      title: 'Environments',
      dateCreated: new Date('2024-04-28T08:44:18'),
      children: [
        { type: '', title: '.DS_Store', dateCreated: new Date('2024-04-28T08:44:18') },
        { type: '.hdr', title: 'default.hdr', dateCreated: new Date('2024-04-28T08:44:18') },
        { type: '.hdr', title: 'spot1Lux.hdr', dateCreated: new Date('2024-04-28T08:44:18') },
        {
          type: '.hdr',
          title: 'spruit_sunrise_1k.hdr',
          dateCreated: new Date('2024-04-28T08:44:18')
        },
        { type: '.hdr', title: 'sunrise.hdr', dateCreated: new Date('2024-04-28T08:44:18') }
      ]
    }
  ])

  return { assets }
})
