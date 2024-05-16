<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useClientStore } from '@/stores/client'
import { useDomainsStore } from '@/stores/domains'
import { useProductsStore } from '@/stores/products'
import { useWorkspacesStore } from '@/stores/workspaces'

import LayoutMain from '@/components/layouts/LayoutMain.vue'

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { IconArrowNarrowRight, IconUsers, IconWorld } from '@tabler/icons-vue'
import IconWorkspaces from '@/assets/icons/workspaces.svg'

const workspaces = computed(() => {
  return useWorkspacesStore().workspaces.map(({ name, dateModified }) => ({
    name,
    dateModified,
    productCount: useProductsStore().products.filter((product) => product.workspace === name).length
  }))
})

const workspaceDisplayCount = 3
const recentWorkspaces = workspaces.value
  .sort((a, b) => b.dateModified.getTime() - a.dateModified.getTime())
  .slice(0, workspaceDisplayCount)

const domainDisplayCount = 5
const domains = computed(() => useDomainsStore().domains.slice(0, domainDisplayCount))
</script>

<template>
  <LayoutMain>
    <div class="p-8 max-w-[104rem] mx-auto">
      <header class="flex justify-between gap-4 mb-8">
        <h1 class="text-3xl font-bold">Welcome to Dopple!</h1>
      </header>
      <div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(31rem,1fr))]">
        <Card class="flex flex-col">
          <CardHeader>
            <CardTitle class="relative pr-8">
              <IconWorkspaces class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
              Workspaces
            </CardTitle>
            <CardDescription>Manage workspaces for your 3D products and assets.</CardDescription>
          </CardHeader>
          <CardContent class="flex-grow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="h-8 w-full">Workspace Name</TableHead>
                  <TableHead class="h-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="workspace in recentWorkspaces" :key="workspace.name">
                  <TableCell class="py-2">
                    <span class="font-medium">{{ workspace.name }}</span>
                    <small v-if="workspace.productCount > 0" class="text-slate-500 text-xs ml-2">
                      ({{ workspace.productCount }} product{{
                        workspace.productCount > 1 ? 's' : ''
                      }})
                    </small>
                  </TableCell>
                  <TableCell class="py-2">
                    <RouterLink
                      :to="`/w/${workspace.name}`"
                      :class="buttonVariants({ variant: 'outline', size: 'sm' })"
                    >
                      Open
                    </RouterLink>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p
              v-if="workspaces.length > workspaceDisplayCount"
              class="text-sm text-slate-500 italic pt-2 px-4 border-t border-slate-200"
            >
              + {{ workspaces.length - workspaceDisplayCount }} more
            </p>
          </CardContent>
          <CardFooter class="justify-end">
            <RouterLink to="/workspaces" :class="buttonVariants({ variant: 'default' })">
              View All Workspaces
              <IconArrowNarrowRight class="w-6 h-6 ml-2" />
            </RouterLink>
          </CardFooter>
        </Card>
        <Card class="flex flex-col">
          <CardHeader>
            <CardTitle class="relative pr-8">
              <IconWorld class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
              Domains
            </CardTitle>
            <CardDescription>
              Manage which websites are allowed to load your 3D products.
            </CardDescription>
          </CardHeader>
          <CardContent class="flex-grow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="h-8 w-full">Domain</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="domain in domains" :key="domain.url">
                  <TableCell class="py-2">
                    {{ domain.url }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p
              v-if="useDomainsStore().domains.length > domainDisplayCount"
              class="text-sm text-slate-500 italic pt-2 px-4 border-t border-slate-200"
            >
              + {{ useDomainsStore().domains.length - domainDisplayCount }} more
            </p>
          </CardContent>
          <CardFooter class="justify-end">
            <RouterLink to="/domains" :class="buttonVariants({ variant: 'default' })">
              Manage Domains
              <IconArrowNarrowRight class="w-6 h-6 ml-2" />
            </RouterLink>
          </CardFooter>
        </Card>
        <Card class="flex flex-col">
          <CardHeader>
            <CardTitle class="relative pr-8">
              <IconUsers class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
              Team
            </CardTitle>
            <CardDescription> Manage roles and permissions for your team. </CardDescription>
          </CardHeader>
          <CardContent class="flex-grow">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell class="py-2">Client ID</TableCell>
                  <TableCell class="py-2 font-mono">
                    {{ useClientStore().client.clientId }}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="py-2">Organization</TableCell>
                  <TableCell class="py-2">
                    {{ useClientStore().client.orgName }}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="py-2">Members</TableCell>
                  <TableCell class="py-2">
                    {{ useClientStore().client.members.length }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter class="justify-end">
            <RouterLink to="/team" :class="buttonVariants({ variant: 'default' })">
              View Team
              <IconArrowNarrowRight class="w-6 h-6 ml-2" />
            </RouterLink>
          </CardFooter>
        </Card>
      </div>
    </div>
  </LayoutMain>
</template>

<style scoped></style>
