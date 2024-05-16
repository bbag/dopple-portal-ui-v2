<script setup lang="ts">
import LayoutMain from '@/components/layouts/LayoutMain.vue'

import { useDomainsStore } from '@/stores/domains'

const domains = useDomainsStore().domains

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { IconTrash } from '@tabler/icons-vue'
import IconPlusSmall from '@/assets/icons/plus-small.svg'
</script>

<template>
  <LayoutMain>
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Domains</h1>
      <Card>
        <CardHeader>
          <CardTitle>Whitelisted Domains</CardTitle>
          <CardDescription>
            Enter the domains below that your 3D products will be allowed to load on.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <table class="w-full">
            <tr v-for="(domain, i) in domains" :key="i">
              <td class="pr-2 py-1">
                <Label :for="`${domain}-${i}`">
                  {{ i + 1 }}
                </Label>
              </td>
              <td class="w-full py-1 relative">
                <Input :id="`${domain}-${i}`" v-model="domains[i].url" type="text" />
                <Button size="icon-sm" variant="ghost" class="absolute right-1 top-2">
                  <IconTrash class="w-4 h-4" />
                </Button>
              </td>
            </tr>
          </table>
          <div class="flex items-center gap-2 flex-wrap justify-between mt-4">
            <Button variant="secondary">
              <IconPlusSmall class="mr-2 w-5 h-5" />
              Add Domain
            </Button>
            <Button variant="default">Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </LayoutMain>
</template>

<style scoped></style>
