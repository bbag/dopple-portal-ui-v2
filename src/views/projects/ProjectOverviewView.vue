<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

import IconGltfEditor from '@/assets/icons/gltf-editor.svg'

const { project, workspace } = useRoute().params

const projectData = useProjectsStore().projects.find((p) => p.slug === project)
</script>

<template>
  <div class="p-8 overflow-x-hidden overflow-y-auto">
    <div class="max-w-5xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">{{ projectData?.title }}</h1>
        <RouterLink :class="buttonVariants({ variant: 'outline' })" :to="`/w/${workspace}/editor`">
          <IconGltfEditor class="w-5 h-5 mr-2 text-muted-foreground" />
          Open in glTF Editor
        </RouterLink>
      </div>
      <Card>
        <CardHeader>
          <CardTitle> Project Details </CardTitle>
          <CardDescription>
            Edit the name, description, etc. of the project, and see other high-level info for the
            project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>[ content will go here... ]</p>
          <div
            class="max-w-xl mx-auto mt-4 p-4 rounded-lg border border-yellow-500 bg-yellow-50 text-yellow-800"
          >
            Each of these sections are strictly <em>concepts</em> and <em>placeholders</em>; they
            will evolve according to the final requirements of the platform.
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle> Version History </CardTitle>
          <CardDescription>
            Breakdown of the version history for this project, with relevant links/info/actions for
            versions.
          </CardDescription>
        </CardHeader>
        <CardContent> [ content will go here... ] </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle> Published Product </CardTitle>
          <CardDescription>
            May link to the Overview page for the published product for this project, or a callout
            that this project hasn't been published yet.
          </CardDescription>
        </CardHeader>
        <CardContent> [ content will go here... ] </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle> Team Members </CardTitle>
          <CardDescription>
            List of team members with access to this project (once roles have been added... might be
            a "phase 2" kinda thing...).
          </CardDescription>
        </CardHeader>
        <CardContent>
          [ content will go here... admins may be able to edit team members from here ]
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle> Authorized Domains </CardTitle>
          <CardDescription> List of domains </CardDescription>
        </CardHeader>
        <CardContent>
          [ content will go here... admins will be able to add/edit domains, others will just view ]
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle> Misc. </CardTitle>
          <CardDescription>
            Anything else that should be included on the Project Overview?
          </CardDescription>
        </CardHeader>
        <CardContent> [ content will go here... ] </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
