import { createRouter, createWebHistory } from 'vue-router'
import { useNavHistoryStore } from '@/stores/navHistory'

import RootView from '../views/RootView.vue'
import NotFound from '../views/NotFound.vue'
import WorkspaceView from '../views/workspaces/WorkspaceView.vue'

import { useWorkspacesStore } from '@/stores/workspaces'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Workspaces',
      component: RootView
    },
    {
      path: '/w/:workspace',
      name: 'Workspace',
      component: WorkspaceView,
      children: [
        {
          path: '',
          name: 'Overview',
          component: () => import('@/views/workspaces/WorkspaceOverviewView.vue')
        },
        {
          path: 'files',
          name: 'Workspace Files',
          component: () => import('@/views/assets/AssetsView.vue')
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('@/views/products/ProductsRootView.vue'),
          children: [
            {
              path: '',
              name: 'Products List',
              component: () => import('@/views/products/ProductsListView.vue')
            },
            {
              path: ':name',
              name: 'Product',
              component: () => import('@/views/products/ProductView.vue'),
              children: [
                {
                  path: '',
                  name: 'Product Overview',
                  component: () => import('@/views/products/ProductOverviewView.vue')
                },
                // {
                //   path: 'hotspots',
                //   name: 'Hotspots',
                //   component: () => import('@/views/products/ProductHotspotsView.vue')
                // },
                // {
                //   path: 'cameras',
                //   name: 'Cameras',
                //   component: () => import('@/views/products/ProductCamerasView.vue')
                // },
                // {
                //   path: 'environment',
                //   name: 'Environment',
                //   component: () => import('@/views/products/ProductEnvironmentView.vue')
                // },
                {
                  path: 'preview',
                  name: 'Live Preview',
                  component: () => import('@/views/products/ProductLivePreviewView.vue')
                },
                {
                  path: 'configurability',
                  name: 'Configurability',
                  component: () => import('@/views/products/ProductConfigurabilityView.vue')
                },
                {
                  path: 'implementation',
                  name: 'Implementation',
                  component: () => import('@/views/products/ProductImplementationView.vue')
                }
              ]
            }
          ]
        },
        {
          path: 'projects',
          name: 'Projects',
          component: () => import('@/views/projects/ProjectsRootView.vue'),
          children: [
            {
              path: '',
              name: 'Projects Home',
              component: () => import('@/views/projects/ProjectsListView.vue')
            },
            {
              path: ':project',
              name: 'Project',
              component: () => import('@/views/projects/ProjectView.vue'),
              children: [
                {
                  path: '',
                  name: 'Project Overview',
                  component: () => import('@/views/projects/ProjectOverviewView.vue')
                }
                // {
                //   path: 'assets',
                //   name: 'Assets',
                //   component: () => import('@/views/projects/ProjectAssetsView.vue')
                // }
              ]
            }
          ]
        },
        {
          path: 'analytics',
          name: 'Analytics',
          component: () => import('@/views/analytics/AnalyticsView.vue'),
          children: [
            {
              path: '',
              name: 'Analytics Overview',
              component: () => import('@/views/analytics/AnalyticsRootView.vue')
            },
            {
              path: 'sessions',
              name: 'Session Analytics',
              meta: { breadcrumbName: 'Sessions' },
              component: () => import('@/views/analytics/AnalyticsSessionsView.vue')
            },
            {
              path: 'conversions',
              name: 'Conversion Analytics',
              meta: { breadcrumbName: 'Conversions' },
              component: () => import('@/views/analytics/AnalyticsConversionsView.vue')
            },
            {
              path: 'products',
              name: 'Product Analytics',
              meta: { breadcrumbName: 'Products' },
              component: () => import('@/views/analytics/AnalyticsProductsView.vue')
            },
            {
              path: 'configurations',
              name: 'Configuration Analytics',
              meta: { breadcrumbName: 'Configurations' },
              component: () => import('@/views/analytics/AnalyticsConfigurationsView.vue')
            },
            {
              path: 'preferences',
              name: 'Preference Analytics',
              meta: { breadcrumbName: 'Preferences' },
              component: () => import('@/views/analytics/AnalyticsPreferencesView.vue')
            },
            {
              path: 'hotspots',
              name: 'Hotspot Analytics',
              meta: { breadcrumbName: 'Hotspots' },
              component: () => import('@/views/analytics/AnalyticsHotspotsView.vue')
            },
            {
              path: 'custom-events',
              name: 'Custom Events',
              meta: { breadcrumbName: 'Custom Events' },
              component: () => import('@/views/analytics/AnalyticsCustomEventsView.vue')
            }
          ]
        },
        {
          path: 'editor',
          name: 'glTF Editor',
          meta: { hideSideNav: true },
          component: () => import('@/views/tools/GltfEditorView.vue'),
          children: [
            {
              path: '',
              name: 'glTF Editor Home',
              component: () => import('@/views/tools/GltfEditorRootView.vue')
            }
            // {
            //   path: ':shortId',
            //   name: 'Model (glTF Editor)',
            //   component: () => import('@/views/tools/GltfEditorModelView.vue')
            // }
          ]
        },
        {
          path: 'studio',
          name: 'Virtual Studio',
          component: () => import('@/views/tools/VirtualStudioView.vue'),
          children: [
            {
              path: '',
              name: 'Virtual Studio Home',
              component: () => import('@/views/tools/VirtualStudioRootView.vue')
            },
            {
              path: ':name',
              name: 'Product (Virtual Studio)',
              component: () => import('@/views/tools/VirtualStudioProductView.vue')
            }
          ]
        },
        {
          path: 'json-mapper',
          name: 'JSON Mapper',
          component: () => import('@/views/tools/JsonMapperView.vue'),
          children: [
            {
              path: '',
              name: 'JSON Mapper Home',
              component: () => import('@/views/tools/JsonMapperRootView.vue')
            }
          ]
        },
        {
          path: 'ui-builder',
          name: 'UI Builder',
          component: () => import('@/views/tools/UiBuilderView.vue'),
          children: [
            {
              path: '',
              name: 'UI Builder Home',
              component: () => import('@/views/tools/UiBuilderRootView.vue')
            },
            {
              path: ':name',
              name: 'Product (UI Builder)',
              component: () => import('@/views/tools/UiBuilderProductView.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/views/settings/AccountSettingsView.vue')
    },
    {
      path: '/domains',
      name: 'Domains',
      component: () => import('@/views/settings/DomainsView.vue')
    },
    {
      path: '/team',
      name: 'Team',
      component: () => import('@/views/settings/TeamView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

// Used for updating the currently-selected workspace in the side-nav
router.beforeEach((to, from, next) => {
  const workspacesStore = useWorkspacesStore()
  if (to.params.workspace) {
    if (typeof to.params.workspace === 'string') {
      workspacesStore.currentWorkspace = to.params.workspace
    } else {
      workspacesStore.currentWorkspace = to.params.workspace[0]
    }
  } else {
    workspacesStore.currentWorkspace = ''
  }
  next()
})

router.afterEach(() => {
  useNavHistoryStore().canGoBack = router.options.history.state.back ? true : false
  useNavHistoryStore().canGoForward = router.options.history.state.forward ? true : false
})

export default router
