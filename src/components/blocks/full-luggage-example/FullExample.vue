<script setup lang="ts">
import { onMounted, ref } from 'vue'
import IconHandRotate from './icon-hand-rotate.svg'
import IconHandPan from './icon-hand-pan.svg'
import IconHandZoom from './icon-hand-zoom.svg'
import IconMouseRotate from './icon-mouse-rotate.svg'
import IconMousePan from './icon-mouse-pan.svg'
import IconMouseZoom from './icon-mouse-zoom.svg'

// Import the Dopple SDK
import { DoppleXR } from 'https://builds.dopple.io/packages/dopple-sdk@latest/dopple-sdk.js'

const doppleWrapper = ref(null)

onMounted(async () => {
  doppleWrapper.value = document.querySelector('.dopple')

  // Initialize a new 3D product
  const dopple = new DoppleXR({
    container: doppleWrapper.value?.querySelector('.dopple-container') as HTMLDivElement,
    owner: 'dopple',
    workspace: 'dev-docs',
    projectName: 'luggage',
    productVersion: '1',
    selection: {
      'luggage-view': 'closed',
      'packing-cubes': 'hidden',
      'toiletry-bag': 'none',
      charger: 'none',
      'luggage-color': 'calypso',
      'camera-position': 'default'
    }
  })

  // Optional: add `dopple` to the window for easy debugging
  window.dopple = dopple

  // Load the 3D product's assets
  await dopple.load()
  const loadingScreen = doppleWrapper.value.querySelector('.loading-screen')
  loadingScreen.style.display = 'none'

  // Begin rendering the 3D scene
  dopple.resize({ trackParentSize: true })
  dopple.run()

  // Dopple mini-UI button: augmented reality
  const arButton = doppleWrapper.value.querySelector("[data-mini-ui-button='ar']")
  arButton?.addEventListener('click', async () => {
    try {
      const buttonDialog = doppleWrapper.value.querySelector("[data-mini-ui-dialog='ar']")
      const arData = await dopple.startAR()

      if (arData) {
        const img = document.getElementById('dopple-ar-qr-code')
        img.src = arData

        buttonDialog.showModal()
      }
    } catch (error) {
      console.error(error)
    }
  })

  // Dopple mini-UI button: snapshot
  const snapshotButton = doppleWrapper.value.querySelector("[data-mini-ui-button='snapshot']")
  snapshotButton?.addEventListener('click', () => {
    try {
      const buttonDialog = doppleWrapper.value.querySelector("[data-mini-ui-dialog='snapshot']")
      buttonDialog.showModal()
    } catch (error) {
      console.error(error)
    }
  })

  // Dopple mini-UI button: controls & gestures
  const controlsButton = doppleWrapper.value.querySelector("[data-mini-ui-button='controls']")
  controlsButton?.addEventListener('click', () => {
    try {
      const buttonDialog = doppleWrapper.value.querySelector("[data-mini-ui-dialog='controls']")
      buttonDialog.showModal()
    } catch (error) {
      console.error(error)
    }
  })

  // Dopple mini-UI button: share
  const shareButton = doppleWrapper.value.querySelector("[data-mini-ui-button='share']")
  shareButton?.addEventListener('click', () => {
    try {
      const buttonDialog = doppleWrapper.value.querySelector("[data-mini-ui-dialog='share']")
      buttonDialog.showModal()
    } catch (error) {
      console.error(error)
    }
  })

  // Dopple mini-UI button: fullscreen
  const fullscreenButton = doppleWrapper.value.querySelector("[data-mini-ui-button='fullscreen']")
  fullscreenButton?.addEventListener('click', () => {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      document.exitFullscreen?.()
      document.webkitExitFullscreen?.()
      fullscreenButton.dataset.fullscreenState = 'inactive'
      fullscreenButton.title = 'Enter Fullscreen'
    } else {
      doppleWrapper.value.requestFullscreen?.()
      doppleWrapper.value.webkitRequestFullscreen?.()
      fullscreenButton.dataset.fullscreenState = 'active'
      fullscreenButton.title = 'Exit Fullscreen'
    }
  })

  // Dopple mini-UI dialog close buttons
  const dialogCloseButtons = doppleWrapper.value.querySelectorAll("[data-mini-ui-action='close']")
  for (const button of dialogCloseButtons) {
    button.addEventListener('click', () => {
      try {
        const dialog = button.closest('dialog')
        dialog.close()
      } catch (error) {
        console.error(error)
      }
    })
  }

  //   Hotspots
  const hotspots = doppleWrapper.value.querySelectorAll('[data-hotspot]')
  for (const hotspot of hotspots) {
    const hotspotId = hotspot.dataset.hotspot
    if (dopple.matrix.hotspots[hotspotId]) {
      dopple.matrix.hotspots[hotspotId].element = hotspot
    }
  }
  if (hotspots.length) {
    await dopple.updateSelection()
  }
})
</script>

<template>
  <div class="dopple">
    <div class="dopple-container"></div>
    <div class="loading-screen">
      <svg class="loading-spinner" width="32" height="32" viewBox="0 0 24 24">
        <path d="M12 3a9 9 0 1 0 9 9"></path>
      </svg>
      <span class="loading-text"> Loading... </span>
    </div>
    <div class="hotspots-container"></div>
    <div class="dopple-mini-ui">
      <div data-mini-ui-side="left">
        <!-- Share -->
        <button data-mini-ui-button="share" title="Share">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#dopple-icon-share" class="dopple-mini-ui-shadow"></use>
            <g id="dopple-icon-share">
              <path
                d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M8.7 10.7l6.6 -3.4M8.7 13.3l6.6 3.4"
              ></path>
            </g>
          </svg>
        </button>
        <dialog
          data-mini-ui-dialog="share"
          aria-labelledby="dopple-dialog-heading-share"
          closedby="any"
        >
          <button data-mini-ui-action="close" title="Close">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M14 6l-8 8M6 6l8 8"></path>
            </svg>
          </button>
          <h2 class="dopple-dialog-heading" id="dopple-dialog-heading-share">
            Share Configuration
          </h2>
          <p class="dopple-dialog-description">fgsfds...</p>
        </dialog>

        <!-- Controls & Gestures -->
        <button data-mini-ui-button="controls" title="Controls & Gestures">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#dopple-icon-controls" class="dopple-mini-ui-shadow"></use>
            <g id="dopple-icon-controls">
              <path
                d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47M14 10.5a1.5 1.5 0 0 1 3 0v1.5M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5"
              ></path>
            </g>
          </svg>
        </button>
        <dialog
          data-mini-ui-dialog="controls"
          aria-labelledby="dopple-dialog-heading-controls"
          closedby="any"
        >
          <button data-mini-ui-action="close" title="Close">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M14 6l-8 8M6 6l8 8"></path>
            </svg>
          </button>
          <h2 class="dopple-dialog-heading" id="dopple-dialog-heading-controls">
            Controls & Gestures
          </h2>
          <div data-mini-ui-controls="touch" class="my-8">
            <div class="dopple-mini-ui-control-icon">
              <component :is="IconHandRotate" alt="Rotate" title="Touch and drag to rotate" />
              Rotate
            </div>
            <div class="dopple-mini-ui-control-icon">
              <component :is="IconHandPan" alt="Pan" title="Drag with two fingers to pan" />
              Pan
            </div>
            <div class="dopple-mini-ui-control-icon">
              <component :is="IconHandZoom" alt="Zoom" title="Pinch to zoom" />
              Zoom
            </div>
          </div>
          <div data-mini-ui-controls="mouse" class="my-8">
            <div class="dopple-mini-ui-control-icon">
              <component :is="IconMouseRotate" alt="Rotate" title="Click and drag to rotate" />
              Rotate
            </div>
            <div class="dopple-mini-ui-control-icon">
              <component :is="IconMousePan" alt="Pan" title="Right-click to pan" />
              Pan
            </div>
            <div class="dopple-mini-ui-control-icon">
              <component :is="IconMouseZoom" alt="Zoom" title="Scroll to zoom" />
              Zoom
            </div>
          </div>
          <!-- <hr />
          <div data-mini-ui-controls="keyboard">
            <div class="dopple-mini-ui-control-keyboard-item">
              <div class="arrow-keys">
                <span data-mini-ui-control-key="up">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <line x1="10" y1="5" x2="10" y2="15" />
                    <line x1="14" y1="9" x2="10" y2="5" />
                    <line x1="6" y1="9" x2="10" y2="5" />
                  </svg>
                </span>
                <span data-mini-ui-control-key="left">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <line x1="5" y1="10" x2="15" y2="10" />
                    <line x1="5" y1="10" x2="9" y2="14" />
                    <line x1="5" y1="10" x2="9" y2="6" />
                  </svg>
                </span>
                <span data-mini-ui-control-key="down">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <line x1="10" y1="5" x2="10" y2="15" />
                    <line x1="14" y1="11" x2="10" y2="15" />
                    <line x1="6" y1="11" x2="10" y2="15" />
                  </svg>
                </span>
                <span data-mini-ui-control-key="right">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <line x1="5" y1="10" x2="15" y2="10" />
                    <line x1="11" y1="14" x2="15" y2="10" />
                    <line x1="11" y1="6" x2="15" y2="10" />
                  </svg>
                </span>
              </div>
              <span class="u3m-sneaker__keyboard-controls__label"> Rotate </span>
            </div>
          </div> -->
        </dialog>

        <!-- Take Snapshot -->
        <button data-mini-ui-button="snapshot" title="Take Snapshot">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#dopple-icon-snapshot" class="dopple-mini-ui-shadow"></use>
            <g id="dopple-icon-snapshot">
              <path
                d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2M12 10.75A2.25 2.25 0 1 0 12 15.25 2.25 2.25 0 1 0 12 10.75z"
              ></path>
            </g>
          </svg>
        </button>
        <dialog
          data-mini-ui-dialog="snapshot"
          aria-labelledby="dopple-dialog-heading-snapshot"
          closedby="any"
        >
          <button data-mini-ui-action="close" title="Close">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M14 6l-8 8M6 6l8 8"></path>
            </svg>
          </button>
          <h2 class="dopple-dialog-heading" id="dopple-dialog-heading-snapshot">Snapshot</h2>
          <p class="dopple-dialog-description">Capture a snapshot below.</p>
        </dialog>

        <!-- View in AR -->
        <button data-mini-ui-button="ar" title="View in Augmented Reality">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#dopple-icon-ar" class="dopple-mini-ui-shadow"></use>
            <g id="dopple-icon-ar">
              <path
                d="M3 6v-1a2 2 0 0 1 2-2h1M3 18v1a2 2 0 0 0 2 2h1M18 3h1a2 2 0 0 1 2 2v1M18 21h1a2 2 0 0 0 2-2v-1M12 7 17 9.5 17 14.5 12 17 7 14.5 7 9.5 12 7M7 9.5 12 12M17 9.5 12 12M12 17 12 12"
              ></path>
            </g>
          </svg>
        </button>
        <dialog data-mini-ui-dialog="ar" aria-labelledby="dopple-dialog-heading-ar" closedby="any">
          <button data-mini-ui-action="close" title="Close">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M14 6l-8 8M6 6l8 8"></path>
            </svg>
          </button>
          <h2 class="dopple-dialog-heading" id="dopple-dialog-heading-ar">Augmented Reality</h2>
          <p class="dopple-dialog-description">
            Scan the QR code below using your smartphone to view in augmented reality.
          </p>
          <img
            id="dopple-ar-qr-code"
            src=""
            alt="A scannable QR code to view this 3D product in augmented reality."
          />
        </dialog>
      </div>
      <div data-mini-ui-side="right">
        <!-- Fullscreen -->
        <button
          data-mini-ui-button="fullscreen"
          title="Enter Fullscreen"
          data-fullscreen-state="inactive"
        >
          <svg data-fullscreen-icon="inactive" width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#dopple-icon-fullscreen" class="dopple-mini-ui-shadow"></use>
            <g id="dopple-icon-fullscreen">
              <path
                d="M4 8v-2a2 2 0 0 1 2 -2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2 -2v-2"
              ></path>
            </g>
          </svg>
          <svg data-fullscreen-icon="active" width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#dopple-icon-fullscreen-close" class="dopple-mini-ui-shadow"></use>
            <g id="dopple-icon-fullscreen-close">
              <path
                d="M16 20v-2a2 2 0 0 1 2 -2h2M16 4v2a2 2 0 0 0 2 2h2M4 16h2a2 2 0 0 1 2 2v2M4 8h2a2 2 0 0 0 2 -2v-2"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Dopple wrapper */
.dopple {
  aspect-ratio: 16 / 10;
  display: grid;
  position: relative;
}
.dopple > * {
  grid-area: 1 / 1;
  margin-top: 0 !important;
}

/* Dopple mini-UI */
.dopple-mini-ui {
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  position: relative;
}
[data-mini-ui-side] {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}
[data-mini-ui-button],
[data-mini-ui-action='close'] {
  align-items: center;
  background: none;
  border: 0;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font-family: inherit;
  justify-content: center;
  margin: 0;
  padding: 0.25rem;
  position: relative;
  transition: all 150ms ease;
  z-index: 1;
}
[data-mini-ui-button] {
  place-self: end;
}
[data-mini-ui-action='close'] {
  position: absolute;
  right: 1rem;
  top: 1rem;
}
[data-mini-ui-action='close']:hover,
[data-mini-ui-action='close']:focus-visible {
  background: hsl(220deg 30% 3% / 0.06);
  color: #252629;
}
[data-mini-ui-button] svg,
[data-mini-ui-action='close'] svg {
  fill: none;
  margin-top: 0;
  max-width: unset;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}
[data-mini-ui-button] svg {
  height: 1.5rem;
  stroke: #fff;
  width: 1.5rem;
}
[data-mini-ui-action='close'] svg {
  height: 1.25rem;
  stroke: #50535a;
  width: 1.25rem;
}
[data-mini-ui-action='close']:hover svg,
[data-mini-ui-action='close']:focus-visible svg {
  stroke: currentColor;
}
.dopple-mini-ui-shadow {
  opacity: 0.45;
  stroke: #000;
  stroke-width: 4;
  transition: opacity 150ms ease;
}
[data-mini-ui-button]:hover .dopple-mini-ui-shadow,
[data-mini-ui-button]:focus-visible .dopple-mini-ui-shadow {
  opacity: 0.75;
}
[data-fullscreen-state='inactive'] [data-fullscreen-icon='active'],
[data-fullscreen-state='active'] [data-fullscreen-icon='inactive'] {
  display: none;
}
[data-mini-ui-dialog] {
  background: #fff;
  border: 0;
  border-radius: 1rem;
  box-shadow:
    0 -0.0625rem 0.125rem hsl(220deg 30% 3% / 0.12),
    0 0.125rem 0.125rem -0.0625rem hsl(220deg 30% 3% / 0.12),
    0 0.5rem 0.875rem -0.25rem hsl(220deg 30% 3% / 0.12);
  color: #252629;
  margin: auto;
  max-width: 100%;
  padding: 1.5rem;
  width: 32rem;
}
[data-mini-ui-dialog]::backdrop {
  background: hsl(220deg 30% 3% / 0.25);
}
.dopple-dialog-heading {
  color: inherit;
  font-size: 1.5rem;
  margin: 0;
  padding: 0 2rem 0 0;
}
.dopple-dialog-description {
  color: #50535a;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0.5rem 0 1rem;
}

/* Dopple mini-UI: Augmented Reality */
#dopple-ar-qr-code {
  margin: 0 auto;
}
[data-mini-ui-dialog='ar'] {
  width: 24rem;
}

/* Dopple mini-UI: Controls & Gestures */
[data-mini-ui-dialog='controls'] {
  width: 24rem;
}
[data-mini-ui-controls='touch'],
[data-mini-ui-controls='mouse'] {
  align-items: center;
  color: #50535a;
  display: flex;
  font-size: 1.875rem;
  gap: 2rem;
  justify-content: center;
  position: relative;
  text-align: center;
  user-select: none;
  z-index: 1;
}
.dopple-mini-ui-control-icon {
  font-size: 0.875rem;
  margin: 0;
  width: 3rem;
}
@media (hover: hover) {
  [data-mini-ui-controls='touch'] {
    display: none;
  }
  [data-mini-ui-controls='mouse'] {
    display: flex;
  }
}
@media (min-width: 64rem) {
  .dopple-mini-ui-control-icon {
    width: 3.75rem;
  }
}
[data-mini-ui-controls='keyboard'] {
  display: flex;
}
.dopple-mini-ui-control-keyboard-item {
}
[data-mini-ui-control-key] {
  border: 1px solid #d0d2d4;
  border-radius: 0.25rem;
}
.arrow-keys {
  display: grid;
  gap: 2px;
  grid-template-areas: '. up .' 'left down right';
}
[data-mini-ui-control-key='up'] {
  grid-area: up;
}
[data-mini-ui-control-key='down'] {
  grid-area: down;
}
[data-mini-ui-control-key='left'] {
  grid-area: left;
}
[data-mini-ui-control-key='right'] {
  grid-area: right;
}

/* Loading screen */
.loading-screen {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  pointer-events: none;
  position: relative;
}
.loading-spinner {
  animation: swatch-loader-spin 1s linear infinite;
  fill: none;
  height: 2rem;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5;
  width: 2rem;
}
.loading-text {
  font-size: 0.875rem;
  opacity: 0.5;
}
.dopple-container {
  background: var(--sl-color-bg-nav);
  border-radius: 0.5rem;
  box-shadow: var(--smooth-shadow);
  position: relative;
}
.hotspots-container {
  display: none;
}

@keyframes swatch-loader-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

<style>
[data-camera-controls-version] {
  margin: 0 !important;
}
</style>
