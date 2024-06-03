import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IProject {
  id: string
  slug: string
  title: string
  workspace: string
  publishedProjectId: string | null
  assets: IAsset[]
  dateCreated: Date
  dateModified: Date
}

export interface IAsset {
  type: string
  title: string
  dateCreated: Date
  children?: IAsset[]
}

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<IProject[]>([
    {
      id: '6116c4c6-2a1f-437f-b2f6-f407023c89b8',
      slug: 'moto-v1',
      title: 'Arrow Motorcycle (v1)',
      workspace: 'demo-assets',
      dateCreated: new Date('2024-04-03T13:01:51'),
      dateModified: new Date('2024-04-23T13:01:51'),
      publishedProjectId: '1c43f733-457c-48ce-a5be-9c43aa5d296d',
      assets: [
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
      ]
    },
    {
      id: '71ef218c-b92b-43e0-9bb5-74cba61e1fb9',
      slug: 'moto-v2',
      title: 'Arrow Motorcycle (v2)',
      workspace: 'demo-assets',
      dateCreated: new Date('2024-04-28T08:44:18'),
      dateModified: new Date('2024-05-09T19:26:35'),
      publishedProjectId: null,
      assets: [
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
      ]
    },
    {
      id: 'a3c5d5a8-5f0f-4b7b-9b1b-5f0f1b7b9b1b',
      slug: 'leather-purse',
      title: 'Leather Purse (W.I.P.)',
      workspace: 'demo-assets',
      dateCreated: new Date('2024-03-02T16:12:47'),
      dateModified: new Date('2024-04-29T23:56:01'),
      publishedProjectId: '903da72b-eda9-42d1-911e-6f0570c9df26',
      assets: [
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
      ]
    },
    {
      id: '2b6f5e7f-6b0c-4d5c-9c2f-9e9f2b6f5e7f',
      slug: 'empty-test-project',
      title: 'Empty Test Project',
      workspace: 'demo-assets',
      dateCreated: new Date('2024-01-14T12:09:20'),
      dateModified: new Date('2024-05-02T11:43:15'),
      publishedProjectId: null,
      assets: []
    },
    {
      id: 'fa6d5e7f-6b0c-4d5c-9c2f-9e9f2b6f5e7f',
      slug: 'smeg',
      title: 'Smeg POC',
      workspace: 'demo-assets',
      dateCreated: new Date('2024-01-05T08:44:18'),
      dateModified: new Date('2024-03-09T19:26:35'),
      publishedProjectId: null,
      assets: [
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
      ]
    },
    {
      id: 'be29f0e2-5d11-2f8b-b87c-af3b217becb6',
      slug: 'sk8',
      title: 'Arrow Skateboard',
      workspace: 'demo-assets',
      dateCreated: new Date('2024-01-28T15:11:18'),
      dateModified: new Date('2024-01-29T11:09:53'),
      publishedProjectId: null,
      assets: [
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
      ]
    },
    {
      id: 'b29241d3-fcc2-4619-abc3-bc3fbb804650',
      slug: 'arrow-mixer',
      title: 'Arrow Mixer',
      workspace: 'demo-assets',
      dateCreated: new Date('2024-01-28T00:24:30'),
      dateModified: new Date('2024-01-09T01:21:59'),
      publishedProjectId: '1aad0a2c-52d7-4afe-9137-3f9c1db328bc',
      assets: [
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
      ]
    },
    {
      id: '28b5849a-c1c9-4b11-a673-df9b9f545ce5',
      slug: 'smarty-saddle',
      title: 'Smarty Saddles',
      workspace: 'demo-assets',
      dateCreated: new Date('2023-11-17T01:14:54'),
      dateModified: new Date('2023-12-04T09:17:21'),
      publishedProjectId: null,
      assets: [
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
      ]
    },
    {
      id: '17066b08-2b75-4f20-90ae-c58066ceff5b',
      slug: 'guitar',
      title: 'Guitar',
      workspace: 'demo-assets',
      dateCreated: new Date('2023-12-17T03:33:21'),
      dateModified: new Date('2024-03-10T09:29:20'),
      publishedProjectId: '19538769-4812-43e8-8392-55a76b469534',
      assets: [
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
      ]
    },
    {
      id: 'c3f1a803-ef0b-4b0c-9767-dbfe9d8472d7',
      slug: 'arrow-sofa',
      title: 'Sofa Demo',
      workspace: 'demo-assets',
      dateCreated: new Date('2024-02-10T15:00:52'),
      dateModified: new Date('2024-02-12T17:41:28'),
      publishedProjectId: '593b46c4-50c5-40ac-9cfb-c1eec09ef579',
      assets: [
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
      ]
    }
  ])

  return { projects }
})
