import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref([
    {
      id: '6116c4c6-2a1f-437f-b2f6-f407023c89b8',
      slug: 'example-project',
      title: 'Example Project',
      workspace: 'demo-assets',
      assets: [
        {
          type: 'folder',
          title: 'Models',
          children: [
            {
              type: 'folder',
              title: 'animations',
              children: [
                { type: '.png', title: 'baseColor_1.png' },
                { type: '.bin', title: 'Mesh.001.bin' },
                { type: '.bin', title: 'Mesh.028.bin' },
                { type: '.bin', title: 'Mesh.272.bin' },
                { type: '.bin', title: 'Mesh.387.bin' },
                { type: '.gltf', title: 'model.gltf' },
                { type: '.png', title: 'normal_1.png' },
                { type: '.png', title: 'occlusion_1.png' }
              ]
            },
            {
              type: 'folder',
              title: 'guitar',
              children: [
                {
                  type: 'folder',
                  title: 'textures',
                  children: [
                    {
                      type: 'folder',
                      title: 'final_desktop',
                      children: [
                        { type: '.png', title: 'Guitar_Body_Albedo.png' },
                        { type: '.png', title: 'Guitar_Body_AO.png' },
                        { type: '.png', title: 'Guitar_Body_Normal.png' },
                        { type: '.png', title: 'Guitar_Body_Roughness.png' },
                        { type: '.png', title: 'Guitar_Neck_Albedo.png' },
                        { type: '.png', title: 'Guitar_Neck_AO.png' },
                        { type: '.png', title: 'Guitar_Neck_Normal.png' },
                        { type: '.png', title: 'Guitar_Neck_Roughness.png' },
                        { type: '.png', title: 'Guitar_Neck_Metallic.png' }
                      ]
                    },
                    {
                      type: 'folder',
                      title: 'final_mobile',
                      children: [
                        { type: '.png', title: 'Guitar_Body_Albedo.png' },
                        { type: '.png', title: 'Guitar_Body_AO.png' },
                        { type: '.png', title: 'Guitar_Body_Normal.png' },
                        { type: '.png', title: 'Guitar_Body_Roughness.png' },
                        { type: '.png', title: 'Guitar_Neck_Albedo.png' },
                        { type: '.png', title: 'Guitar_Neck_AO.png' },
                        { type: '.png', title: 'Guitar_Neck_Metallic.png' },
                        { type: '.png', title: 'Guitar_Neck_Normal.png' },
                        { type: '.png', title: 'Guitar_Neck_Roughness.png' }
                      ]
                    },
                    {
                      type: 'folder',
                      title: 'initial',
                      children: [
                        { type: '.png', title: 'Guitar_Body_Albedo.png' },
                        { type: '.png', title: 'Guitar_Body_AO.png' },
                        { type: '.png', title: 'Guitar_Body_Normal.png' },
                        { type: '.png', title: 'Guitar_Body_Roughness.png' },
                        { type: '.png', title: 'Guitar_Neck_Albedo.png' },
                        { type: '.png', title: 'Guitar_Neck_AO.png' },
                        { type: '.png', title: 'Guitar_Neck_Metallic.png' },
                        { type: '.png', title: 'Guitar_Neck_Normal.png' },
                        { type: '.png', title: 'Guitar_Neck_Roughness.png' }
                      ]
                    }
                  ]
                },
                { type: '.bin', title: 'arrow_guitar.bin' },
                { type: '.gltf', title: 'arrow_guitar.gltf' }
              ]
            }
          ]
        },
        {
          type: 'folder',
          title: 'Environments',
          children: [
            { type: '', title: '.DS_Store' },
            { type: '.hdr', title: 'default.hdr' },
            { type: '.hdr', title: 'spot1Lux.hdr' },
            { type: '.hdr', title: 'spruit_sunrise_1k.hdr' },
            { type: '.hdr', title: 'sunrise.hdr' }
          ]
        }
      ]
    },
    {
      id: '71ef218c-b92b-43e0-9bb5-74cba61e1fb9',
      slug: 'example-2',
      title: 'Another Example (v2)',
      workspace: 'demo-assets'
    }
  ])

  return { projects }
})
