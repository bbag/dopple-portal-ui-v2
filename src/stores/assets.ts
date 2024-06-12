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
      title: 'Arrow Guitar Project',
      dateCreated: new Date('2024-04-28T08:44:18'),
      children: [
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
        },
        {
          type: 'folder',
          title: 'initial_assets',
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
    },
    {
      type: 'folder',
      title: 'leather-jacket (v1)',
      dateCreated: new Date('2024-04-28T08:44:18'),
      children: [
        {
          type: 'folder',
          title: 'jacket stuff',
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
                      title: 'Jacket_Liner_Albedo.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Liner_AO.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Liner_Normal.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Leather_Albedo.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Leather_AO.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Leather_Normal.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Decal_Amazon.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Decal_Heart.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Decal_Lucky.png',
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
                      title: 'Jacket_Liner_Albedo.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Liner_AO.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Liner_Normal.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Leather_Albedo.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Leather_AO.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Leather_Normal.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Decal_Amazon.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Decal_Heart.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Decal_Lucky.png',
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
                      title: 'Jacket_Liner_Albedo.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Liner_AO.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Liner_Normal.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Leather_Albedo.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Leather_AO.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Leather_Normal.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Decal_Amazon.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Decal_Heart.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    },
                    {
                      type: '.png',
                      title: 'Jacket_Decal_Lucky.png',
                      dateCreated: new Date('2024-04-28T08:44:18')
                    }
                  ]
                }
              ]
            },
            {
              type: '.bin',
              title: 'leather_jacket_v1.bin',
              dateCreated: new Date('2024-04-28T08:44:18')
            },
            {
              type: '.gltf',
              title: 'leather_jacket_v1.gltf',
              dateCreated: new Date('2024-04-28T08:44:18')
            }
          ]
        },
        {
          type: 'folder',
          title: 'temp',
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
        }
      ]
    },
    {
      type: 'folder',
      title: 'Luggage_Final_2024-06-12',
      dateCreated: new Date('2024-04-28T08:44:18'),
      children: [
        {
          type: 'folder',
          title: 'assets',
          dateCreated: new Date('2024-04-28T08:44:18'),
          children: [
            {
              type: 'folder',
              title: 'textures',
              dateCreated: new Date('2024-04-28T08:44:18'),
              children: [
                {
                  type: '.png',
                  title: 'Luggage_Body_Albedo.png',
                  dateCreated: new Date('2024-04-28T08:44:18')
                },
                {
                  type: '.png',
                  title: 'Luggage_Body_AO.png',
                  dateCreated: new Date('2024-04-28T08:44:18')
                },
                {
                  type: '.png',
                  title: 'Luggage_Body_Normal.png',
                  dateCreated: new Date('2024-04-28T08:44:18')
                },
                {
                  type: '.png',
                  title: 'Luggage_Interior_Albedo.png',
                  dateCreated: new Date('2024-04-28T08:44:18')
                },
                {
                  type: '.png',
                  title: 'Luggage_Interior_AO.png',
                  dateCreated: new Date('2024-04-28T08:44:18')
                },
                {
                  type: '.png',
                  title: 'Luggage_Interior_Normal.png',
                  dateCreated: new Date('2024-04-28T08:44:18')
                },
                {
                  type: '.png',
                  title: 'Luggage_Misc_ChargingPort.png',
                  dateCreated: new Date('2024-04-28T08:44:18')
                },
                {
                  type: '.png',
                  title: 'Luggage_Misc_Cubes.png',
                  dateCreated: new Date('2024-04-28T08:44:18')
                },
                {
                  type: '.png',
                  title: 'Luggage_Misc_ToiletryBag.png',
                  dateCreated: new Date('2024-04-28T08:44:18')
                }
              ]
            },
            {
              type: '.bin',
              title: 'luggage_v1.bin',
              dateCreated: new Date('2024-04-28T08:44:18')
            },
            {
              type: '.gltf',
              title: 'luggage_v1.gltf',
              dateCreated: new Date('2024-04-28T08:44:18')
            }
          ]
        },
        {
          type: 'folder',
          title: 'temp',
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
        }
      ]
    },
    {
      type: 'folder',
      title: 'Untitled Folder',
      dateCreated: new Date('2024-04-28T08:44:18'),
      children: [
        {
          type: 'folder',
          title: 'misc-stuff',
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
        },
        {
          type: 'folder',
          title: 'suzanne (the wonderful monkey head)',
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
        }
      ]
    }
  ])

  return { assets }
})
