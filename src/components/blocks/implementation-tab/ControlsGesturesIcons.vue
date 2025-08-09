<script setup lang="ts">
import ArrowKeys from './assets/arrow-keys.svg'
import ArrowKeysAlt from './assets/arrow-keys-alt.svg'
import ArrowKeysCtrl from './assets/arrow-keys-ctrl.svg'
import IconHandPan from './assets/icon-hand-pan.svg'
import IconHandRotate from './assets/icon-hand-rotate.svg'
import IconHandZoom from './assets/icon-hand-zoom.svg'
import IconMousePan from './assets/icon-mouse-pan.svg'
import IconMouseRotate from './assets/icon-mouse-rotate.svg'
import IconMouseZoom from './assets/icon-mouse-zoom.svg'
</script>

<template>
  <div class="space-y-4">
    <p>The Controls & Gestures dialog features the following icons:</p>
    <table>
      <tbody
        class="[&_td]:py-2 [&_th]:text-center [&_td]:px-4 [&_svg]:mx-auto text-muted-foreground"
      >
        <tr>
          <th></th>
          <th>Mouse</th>
          <th>Touch</th>
          <th>Keyboard</th>
        </tr>
        <tr>
          <td>Orbit (Rotate)</td>
          <td><IconMouseRotate class="h-16" /></td>
          <td><IconHandRotate class="h-16" /></td>
          <td><ArrowKeys class="h-10" /></td>
        </tr>
        <tr>
          <td>Truck (Pan)</td>
          <td><IconMousePan class="h-16" /></td>
          <td><IconHandPan class="h-16" /></td>
          <td><ArrowKeysAlt class="h-10" /></td>
        </tr>
        <tr>
          <td>Dolly (Zoom)</td>
          <td><IconMouseZoom class="h-16" /></td>
          <td><IconHandZoom class="h-16" /></td>
          <td><ArrowKeysCtrl class="h-10" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
