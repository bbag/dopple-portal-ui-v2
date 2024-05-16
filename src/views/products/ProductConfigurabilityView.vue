<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { codeToHtml } from 'shiki'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const configurabilityData = [
  { property: 'sofa_material', value: 'sofa_leather', type: 'Material swap' },
  { property: 'sofa_material', value: 'sofa_one_tone', type: 'Material swap' },
  { property: 'sofa_material', value: 'sofa_two_tone', type: 'Material swap' },
  { property: 'sofa_color_leather', value: '[255, 255, 255]', type: 'RGB color' },
  { property: 'sofa_color_one_tone', value: '[255, 255, 255]', type: 'RGB color' },
  { property: 'sofa_color_two_tone', value: '[255, 255, 255]', type: 'RGB color' },
  { property: 'back_cushions', value: 'back_cushions_button', type: 'Mesh swap' },
  { property: 'back_cushions', value: 'back_cushions_flat', type: 'Mesh swap' },
  { property: 'sofa_arms', value: 'sofa_arms_block', type: 'Mesh swap' },
  { property: 'sofa_arms', value: 'sofa_arms_arch', type: 'Mesh swap' },
  { property: 'sofa_arms', value: 'sofa_arms_slope', type: 'Mesh swap' },
  { property: 'sofa_legs', value: 'sofa_legs_wooden', type: 'Mesh swap' },
  { property: 'sofa_legs', value: 'sofa_legs_metal', type: 'Mesh swap' },
  { property: 'legs_color_wooden', value: '[255, 255, 255]', type: 'RGB color' },
  { property: 'legs_color_metal', value: '[255, 255, 255]', type: 'RGB color' },
  { property: 'sofa_pillows', value: 'add_on_lumbar_pillows_on', type: 'Mesh swap' },
  { property: 'sofa_pillows', value: 'add_on_lumbar_pillows_off', type: 'Mesh swap' },
  { property: 'add_on_chaise', value: 'add_on_chaise_on', type: 'Mesh swap' },
  { property: 'add_on_chaise', value: 'add_on_chaise_off', type: 'Mesh swap' },
  { property: 'add_on_ottoman', value: 'add_on_ottoman_on', type: 'Mesh swap' },
  { property: 'add_on_ottoman', value: 'add_on_ottoman_off', type: 'Mesh swap' }
]

const shikiTheme = 'material-theme-palenight'
const snippetRef = ref('')
const snippet = `product.setValue("sofa_material", "sofa_leather");`

onMounted(async () => {
  snippetRef.value = await codeToHtml(snippet, {
    lang: 'js',
    theme: shikiTheme
  })
})
</script>

<template>
  <div class="bg-muted overflow-x-auto p-8">
    <div class="max-w-5xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Configurability Matrix</CardTitle>
          <CardDescription>
            The table below lists the properties and values available for web developers to set on
            the product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="item in configurabilityData" :key="item.property">
                <TableCell class="font-mono">{{ item.property }}</TableCell>
                <TableCell class="font-mono">{{ item.value }}</TableCell>
                <TableCell>{{ item.type }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Example Code</CardTitle>
          <CardDescription>
            Call
            <a
              href="https://docs.dopple.io/docs/visual-api/configuration#updating-the-product-using-setvalue"
              target="_blank"
              class="link font-mono"
              >setValue(property, value)</a
            >
            on the product to update its configuration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label>JavaScript:</Label>
          <div v-html="snippetRef"></div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
