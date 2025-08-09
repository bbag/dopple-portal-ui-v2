// --------------------------------------------------------------------------------------------- //
// Code section: Loading screen                                                                  //
// --------------------------------------------------------------------------------------------- //

export const cameraControlsJs = (allowRotate: boolean, allowPan: boolean, allowZoom: boolean) => {
  let scripts = ``

  const disabledControls = []
  if (!allowRotate) disabledControls.push('rotation')
  if (!allowPan) disabledControls.push('trucking')
  if (!allowZoom) disabledControls.push('zooming')

  if (!(allowRotate && allowPan && allowZoom)) {
    scripts += `\n\n	// Custom camera control behavior (disabled ${disabledControls.join(', ')})`
  }

  if (!allowRotate) {
    scripts += `\n	dopple.controls.mouseButtons.left = 0;`
    scripts += `\n	dopple.controls.touches.one = 0;`
  }
  if (!allowPan) {
    scripts += `\n	dopple.controls.mouseButtons.right = 0;`
  }
  if (!allowZoom) {
    scripts += `\n	dopple.controls.mouseButtons.middle = 0;`
    scripts += `\n	dopple.controls.mouseButtons.wheel = 0;`
  }
  if (!(allowPan && allowZoom)) {
    scripts += `\n	dopple.controls.touches.two = 0;`
    scripts += `\n	dopple.controls.touches.three = 0;`
  }

  return scripts
}
