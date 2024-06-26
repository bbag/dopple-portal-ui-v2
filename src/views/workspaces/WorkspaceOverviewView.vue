<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

// Workspace
const workspace = useRoute().params.workspace

// Projects
import { useProjectsStore } from '@/stores/projects'
const projects = computed(() =>
  useProjectsStore().projects.filter((project) => project.workspace === workspace)
)
const projectsDisplayCount = 7
const recentProjects = projects.value
  .sort((a, b) => b.dateModified.getTime() - a.dateModified.getTime())
  .slice(0, projectsDisplayCount)

// Products
import { useProductsStore } from '@/stores/products'
const products = computed(() =>
  useProductsStore().products.filter((product) => product.workspace === workspace)
)
const productsDisplayCount = 3
const recentProducts = products.value
  .sort((a, b) => b.dateModified.getTime() - a.dateModified.getTime())
  .slice(0, productsDisplayCount)

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import DummyAnalytics from '@/components/blocks/dummy-analytics/DummyAnalytics.vue'

import {
  IconArrowNarrowRight,
  IconFolders,
  IconChartDots,
  IconCircleCheck,
  IconSettings,
  IconSlideshow
} from '@tabler/icons-vue'
import IconGltfEditor from '@/assets/icons/gltf-editor.svg'
import IconShoppingBag from '@/assets/icons/shopping-bag.svg'
import IconUiBuilder from '@/assets/icons/ui-builder.svg'
import { useWorkspacesStore } from '@/stores/workspaces'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
})

const toolsTable = [
  {
    icon: IconGltfEditor,
    title: 'glTF Editor',
    href: `/w/${workspace}/editor`,
    description: 'Edit and preview models and environments.'
  },
  {
    icon: IconSlideshow,
    title: 'Virtual Studio',
    href: `/w/${workspace}/studio`,
    description: 'Capture images of product configurations.'
  },
  {
    icon: IconUiBuilder,
    title: 'UI Builder',
    href: `/w/${workspace}/ui-builder`,
    description: 'Design configurator UIs for your products.'
  }
]

const workspaceNameField = ref('')

onMounted(() => {
  workspaceNameField.value = useWorkspacesStore().currentWorkspace || ''
})
</script>

<template>
  <div class="p-8 max-w-[104rem] mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">
        Workspace:
        <span class="font-mono bg-slate-500/10 px-3 py-1 rounded-lg ml-1 text-foreground/80">
          {{ workspace }}
        </span>
      </h1>
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="ghost" size="icon-sm">
            <IconSettings class="w-6 h-6 text-muted-foreground" />
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit workspace</DialogTitle>
            <DialogDescription>
              Make changes to your workspace here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <Label for="name"> Name </Label>
            <Input id="name" v-model="workspaceNameField" />
          </div>
          <DialogFooter>
            <Button variant="destructive" class="mr-auto"> Delete workspace </Button>
            <Button variant="ghost"> Cancel </Button>
            <Button type="submit"> Save changes </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <div
      class="grid gap-4 auto-rows-auto grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[minmax(0,3fr),minmax(0,2fr)] grid-flow-row-dense"
    >
      <Card class="flex flex-col col-span-1 xl:row-span-2 xl:col-span-2 2xl:col-span-1">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Projects
            <IconFolders class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
          <CardDescription>{{ projects.length }} total</CardDescription>
        </CardHeader>
        <CardContent class="flex-grow">
          <Table v-if="recentProjects.length">
            <TableHeader>
              <TableRow>
                <TableHead class="w-full">Name</TableHead>
                <TableHead class="whitespace-nowrap">Last Modified</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="row in recentProjects" :key="row.title">
                <TableCell class="py-2 whitespace-nowrap font-medium">
                  <RouterLink :to="`/w/${workspace}/projects/${row.slug}`">
                    {{ row.title }}
                  </RouterLink>
                </TableCell>
                <TableCell class="py-2 whitespace-nowrap">
                  {{ dateFormatter.format(row.dateModified) }}
                </TableCell>
                <TableCell class="py-2">
                  <IconCircleCheck
                    v-if="row.publishedProjectId"
                    class="w-5 h-5 mx-auto text-green-500 dark:text-green-400"
                  />
                </TableCell>
                <TableCell class="py-2 flex items-center justify-end gap-2">
                  <RouterLink
                    :to="`/w/${workspace}/projects/${row.slug}`"
                    :class="buttonVariants({ variant: 'outline', size: 'sm' })"
                  >
                    View
                  </RouterLink>
                  <RouterLink
                    :to="`/w/${workspace}/editor`"
                    :class="buttonVariants({ variant: 'outline', size: 'sm' })"
                  >
                    <IconGltfEditor class="w-5 h-5 mr-2 text-muted-foreground" />
                    Open in Editor
                  </RouterLink>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div
            v-else
            class="text-sm text-slate-500 flex items-center justify-center h-full flex-col gap-4 border border-dashed p-8 rounded-lg"
          >
            <p class="text-center text-pretty">No projects yet. It’s time to get started!</p>
            <Button variant="outline" size="sm">Create New Project</Button>
          </div>
          <p
            v-if="projects.length > projectsDisplayCount"
            class="text-sm text-slate-500 italic pt-2 px-4 border-t"
          >
            + {{ projects.length - projectsDisplayCount }} more
          </p>
        </CardContent>
        <CardFooter v-if="projects.length" class="justify-end">
          <RouterLink
            :to="`/w/${$route.params.workspace}/projects`"
            :class="buttonVariants({ variant: 'default' })"
          >
            View All Projects
            <IconArrowNarrowRight class="w-6 h-6 ml-2" />
          </RouterLink>
        </CardFooter>
      </Card>
      <Card class="flex flex-col col-span-1 row-span-1">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Products
            <IconShoppingBag class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent class="flex-grow">
          <Table v-if="recentProducts.length">
            <TableHeader>
              <TableRow>
                <TableHead class="whitespace-nowrap h-10">Product Title</TableHead>
                <TableHead class="w-full h-10">Name</TableHead>
                <TableHead class="h-10">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="product in recentProducts" :key="product.name">
                <TableCell class="whitespace-nowrap font-medium py-2">
                  {{ product.title }}
                </TableCell>
                <TableCell class="font-mono w-full py-2">{{ product.name }}</TableCell>
                <TableCell class="py-2 text-center">
                  <RouterLink
                    :to="`/w/${product.workspace}/products/${product.name}`"
                    :class="buttonVariants({ variant: 'outline', size: 'xs' })"
                  >
                    View
                  </RouterLink>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div
            v-else
            class="text-sm text-slate-500 flex items-center justify-center h-full flex-col gap-4 border border-dashed p-8 rounded-lg"
          >
            <p class="text-center text-pretty">
              No products yet! Products will appear here once a project is published.
            </p>
            <Button variant="outline" size="sm">View Projects</Button>
          </div>
          <p
            v-if="products.length > productsDisplayCount"
            class="text-sm text-slate-500 italic pt-2 px-4 border-t"
          >
            + {{ products.length - productsDisplayCount }} more
          </p>
        </CardContent>
        <CardFooter v-if="products.length" class="justify-end">
          <RouterLink
            :to="`/w/${$route.params.workspace}/products`"
            :class="buttonVariants({ variant: 'default' })"
          >
            View All Products
            <IconArrowNarrowRight class="w-6 h-6 ml-2" />
          </RouterLink>
        </CardFooter>
      </Card>
      <Card class="flex flex-col col-span-1 row-span-1">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Tools
            <IconGltfEditor class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent class="flex-grow">
          <div class="grid grid-cols-3 gap-4">
            <RouterLink
              v-for="tool in toolsTable"
              :key="tool.title"
              :to="tool.href"
              :class="buttonVariants({ variant: 'outline' })"
              class="flex flex-col py-6 h-auto"
            >
              <component :is="tool.icon" class="inline w-8 h-8 text-muted-foreground" />
              <p class="mt-1 mb-2 text-center font-medium text-base">{{ tool.title }}</p>
              <p class="whitespace-normal text-center text-xs text-balance text-slate-600">
                {{ tool.description }}
              </p>
            </RouterLink>
          </div>
        </CardContent>
      </Card>
      <Card class="flex flex-col col-span-1 row-span-1 xl:col-span-2">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Analytics
            <IconChartDots class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent class="flex-grow">
          <DummyAnalytics />
        </CardContent>
        <CardFooter class="justify-end">
          <RouterLink
            :to="`/w/${$route.params.workspace}/analytics`"
            :class="buttonVariants({ variant: 'default' })"
          >
            View Analytics
            <IconArrowNarrowRight class="w-6 h-6 ml-2" />
          </RouterLink>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
