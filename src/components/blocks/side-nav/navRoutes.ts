import type { RouteLocationNormalizedLoaded } from 'vue-router'

import {
  IconBox,
  IconBraces,
  IconChartDots,
  IconExternalLink,
  IconFile3d,
  IconFiles,
  IconFileCode,
  IconFolders,
  IconPackage,
  IconSlideshow
} from '@tabler/icons-vue'

import IconGltfEditor from '@/assets/icons/gltf-editor.svg'
import IconShoppingBag from '@/assets/icons/shopping-bag.svg'
import IconUiBuilder from '@/assets/icons/ui-builder.svg'
import IconWorkspaces from '@/assets/icons/workspaces.svg'

export interface IRouteCategory {
  title: string
  categoryDisplayFn?: (route: RouteLocationNormalizedLoaded) => boolean
  routes: IRoute[]
}

export interface IRoute {
  name: string
  path: string
  icon?: any
  routeDisplayFn?: (route: RouteLocationNormalizedLoaded) => boolean
  subroutesDisplayFn?: (route: RouteLocationNormalizedLoaded) => boolean
  subroutes?: IRoute[]
}

export const routes: IRouteCategory[] = [
  {
    title: '',
    routes: [
      // {
      //   name: 'Home',
      //   icon: IconHomeIcon,
      //   path: '/'
      // },
      {
        name: 'Workspaces',
        icon: IconWorkspaces,
        path: '/',
        subroutesDisplayFn: (route) =>
          typeof route.params === 'object' && 'workspace' in route.params ? true : false,
        subroutes: [
          {
            name: 'Workspace Overview',
            path: ''
          }
        ]
      }
    ]
  },
  {
    title: 'Library',
    categoryDisplayFn: (route) =>
      typeof route.params === 'object' && 'workspace' in route.params ? true : false,
    routes: [
      {
        name: 'Workspace Files',
        icon: IconFiles,
        path: 'files'
      },
      {
        name: 'Projects',
        icon: IconBox,
        path: 'projects'
      },
      {
        name: 'Products',
        icon: IconShoppingBag,
        path: 'products'
      }
      // {
      //   name: 'Models',
      //   icon: IconBox,
      //   path: 'models'
      // },
      // {
      //   name: 'Materials',
      //   icon: IconMaterialIcon,
      //   path: 'materials'
      // },
      // {
      //   name: 'Textures',
      //   icon: IconTextureIcon,
      //   path: 'textures'
      // }
    ]
  },
  {
    title: 'Tools',
    categoryDisplayFn: (route) =>
      typeof route.params === 'object' && 'workspace' in route.params ? true : false,
    routes: [
      {
        name: 'glTF Editor',
        icon: IconGltfEditor,
        path: 'editor'
      },
      {
        name: 'JSON Mapper',
        icon: IconBraces,
        path: 'json-mapper'
      },
      {
        name: 'Virtual Studio',
        icon: IconSlideshow,
        path: 'studio'
      },
      {
        name: 'UI Builder',
        icon: IconUiBuilder,
        path: 'ui-builder'
      }
    ]
  },
  // {
  //   title: 'Settings',
  //   routes: [
  //     {
  //       name: 'Domains',
  //       icon: IconWorld,
  //       path: '/domains'
  //     },
  //     {
  //       name: 'Team',
  //       icon: IconUsers,
  //       path: '/team'
  //     },
  //     {
  //       name: 'Account Settings',
  //       icon: IconSettings,
  //       path: '/settings'
  //     }
  //   ]
  // },
  {
    title: 'Insights',
    categoryDisplayFn: (route) =>
      typeof route.params === 'object' && 'workspace' in route.params ? true : false,
    routes: [
      {
        name: 'Analytics',
        icon: IconChartDots,
        path: 'analytics',
        subroutesDisplayFn: (route) => route.matched.some((m) => m.name === 'Analytics'),
        subroutes: [
          {
            name: 'Sessions',
            path: 'analytics/sessions'
          },
          {
            name: 'Conversions',
            path: 'analytics/conversions'
          },
          {
            name: 'Products',
            path: 'analytics/products'
          },
          {
            name: 'Configurations',
            path: 'analytics/configurations'
          },
          {
            name: 'Preferences',
            path: 'analytics/preferences'
          },
          {
            name: 'Hotspots',
            path: 'analytics/hotspots'
          },
          {
            name: 'All Events',
            path: 'analytics/all-events'
          }
        ]
      }
    ]
  },
  {
    title: 'Resources',
    routes: [
      { name: 'Documentation', icon: IconFileCode, path: 'https://docs.dopple.io' },
      { name: 'Dopple.io', icon: IconExternalLink, path: 'https://www.dopple.io' }
    ]
  }
]
