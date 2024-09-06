import { defineStore } from 'pinia'

export interface IHierarchyItem {
  type: THierarchyItemType
  title: string
  children?: IHierarchyItem[]
}

export type THierarchyItemType =
  | 'group'
  | 'environment'
  | 'mesh'
  | 'node'
  | 'camera'
  | 'global'
  | 'texture'
  | 'material'
  | 'animation'
  | 'light'

export const useHierarchyItemsStore = defineStore('hierarchyItems', {
  state: () => ({
    activeItem: null as IHierarchyItem | null,
    items: [
      {
        type: 'group',
        title: 'Global',
        children: [
          {
            type: 'group',
            title: 'Environments',
            children: [
              {
                type: 'environment',
                title: 'Chair-Environment'
              },
              {
                type: 'environment',
                title: 'Chair2-Environment'
              },
              {
                type: 'environment',
                title: 'Chair3-Environment'
              }
            ]
          },
          {
            type: 'camera',
            title: 'Editor Camera'
          }
        ]
      },
      {
        type: 'group',
        title: 'TheChair',
        children: [
          {
            type: 'group',
            title: 'Positioning',
            children: [
              {
                type: 'node',
                title: 'default'
              }
            ]
          },
          {
            type: 'group',
            title: 'Meshes',
            children: [
              {
                type: 'group',
                title: 'arms',
                children: [
                  {
                    type: 'mesh',
                    title: 'Mesh.007'
                  }
                ]
              },
              {
                type: 'group',
                title: 'back',
                children: [
                  {
                    type: 'group',
                    title: 'Group.005',
                    children: [
                      {
                        type: 'mesh',
                        title: 'back_carbon_fiber'
                      },
                      {
                        type: 'mesh',
                        title: 'back_circuit_ivory'
                      },
                      {
                        type: 'mesh',
                        title: 'back_circuit_onyx'
                      },
                      {
                        type: 'mesh',
                        title: 'back_grey_oak'
                      },
                      {
                        type: 'mesh',
                        title: 'back_ivory_oak'
                      },
                      {
                        type: 'mesh',
                        title: 'back_natural_oak'
                      },
                      {
                        type: 'mesh',
                        title: 'back_sierra_oak'
                      },
                      {
                        type: 'mesh',
                        title: 'back_standard_black'
                      },
                      {
                        type: 'mesh',
                        title: 'back_walnut'
                      }
                    ]
                  }
                ]
              },
              {
                type: 'group',
                title: 'base',
                children: [
                  {
                    type: 'group',
                    title: 'base_4_spoke',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Mesh.010'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'base_5_spoke',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Mesh.009'
                      }
                    ]
                  }
                ]
              },
              {
                type: 'group',
                title: 'chassis',
                children: [
                  {
                    type: 'mesh',
                    title: 'Mesh.017'
                  }
                ]
              },
              {
                type: 'group',
                title: 'cushions',
                children: [
                  {
                    type: 'group',
                    title: 'cushions_boucle',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Mesh.006'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'cushions_leather',
                    children: [
                      {
                        type: 'mesh',
                        title: 'RetopoFlow.014'
                      }
                    ]
                  }
                ]
              },
              {
                type: 'group',
                title: 'mat_library',
                children: [
                  {
                    type: 'group',
                    title: 'back_carbon_fiber',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'back_circuit_ivory',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.001'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'back_circuit_onyx',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.021'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'back_grey_oak',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.004'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'back_ivory_oak',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.008'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'back_natural_oak',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.009'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'back_sierra_oak',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.007'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'back_standard_black',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.010'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'back_walnut',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.020'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'chassis_quartz',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.018'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'cushions_boucle_dune',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.016'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'cushions_boucle_ivory',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.019'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'cushions_boucle_onyx',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.014'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'cushions_boucle_steel',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.015'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'cushions_leather_dune',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.002'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'cushions_leather_ivory',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.003'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'cushions_leather_onyx',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.005'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'cushions_leather_steel',
                    children: [
                      {
                        type: 'mesh',
                        title: 'Plane.006'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: 'group',
            title: 'Materials',
            children: [
              {
                type: 'material',
                title: 'back_circuit_ivory'
              },
              {
                type: 'material',
                title: 'back_circuit_onyx'
              },
              {
                type: 'material',
                title: 'back_grey_oak'
              },
              {
                type: 'material',
                title: 'back_natural_oak'
              },
              {
                type: 'material',
                title: 'cushions_boucle_onyx'
              },
              {
                type: 'material',
                title: 'cushions_leather_dune'
              }
            ]
          },
          {
            type: 'group',
            title: 'Textures',
            children: [
              {
                type: 'texture',
                title: 'Body_AO'
              },
              {
                type: 'texture',
                title: 'Body_Normal'
              },
              {
                type: 'texture',
                title: 'Body_Onyx_Albedo'
              },
              {
                type: 'texture',
                title: 'Body_Onyx_Metallic_Roughness'
              },
              {
                type: 'texture',
                title: 'Body_Quartz_Albedo'
              },
              {
                type: 'texture',
                title: 'Body_Quartz_Metallic_Roughness'
              },
              {
                type: 'texture',
                title: 'Cushions_Dune_Albedo'
              },
              {
                type: 'texture',
                title: 'Cushions_Ivory_Albedo'
              },
              {
                type: 'texture',
                title: 'Cushions_Leather_AO'
              },
              {
                type: 'texture',
                title: 'Cushions_Leather_Normal'
              },
              {
                type: 'texture',
                title: 'Cushions_Pink_Albedo'
              },
              {
                type: 'texture',
                title: 'Cushions_Steel_Albedo'
              }
            ]
          },
          {
            type: 'group',
            title: 'Cameras',
            children: [
              {
                type: 'camera',
                title: 'Camera.1723839127-Front'
              },
              {
                type: 'camera',
                title: 'Camera.1755031337-Back'
              }
            ]
          },
          {
            type: 'group',
            title: 'Animations',
            children: []
          }
        ]
      }
    ] as IHierarchyItem[]
  }),
  actions: {
    // increment() {
    //   this.count++
    // },
    // randomizeCounter() {
    //   this.count = Math.round(100 * Math.random())
    // }
  }
})
