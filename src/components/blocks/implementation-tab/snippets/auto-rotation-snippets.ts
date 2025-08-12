// --------------------------------------------------------------------------------------------- //
// Auto-rotation                                                                                 //
// --------------------------------------------------------------------------------------------- //

export const autoRotateSettingsJs = (
  isActiveOnLoad: boolean = false,
  speed: number = 30,
  direction: 'clockwise' | 'counter-clockwise' = 'clockwise',
  isMiniUiActive: boolean = false
) => {
  let scripts = `\n\n	// Auto-rotation settings
	const autoRotationSpeed = ${speed}; // Degrees per second
	let enableAutoRotation = ${isActiveOnLoad ? 'true' : 'false'};
	let autoRotationStartTime = performance.now();
	let autoRotationOldTime = autoRotationStartTime;
	let autoRotationElapsedTime = 0;
	let autoRotationIsRunning = false;

	(function autoRotate() {
		let delta = 0;
		if (!autoRotationIsRunning) {
			autoRotationStartTime = performance.now();
			autoRotationOldTime = autoRotationStartTime;
			autoRotationElapsedTime = 0;
			autoRotationIsRunning = true;
		} else {
			const newTime = performance.now();
			delta = (newTime - autoRotationOldTime) / 1000;
			autoRotationOldTime = newTime;
			autoRotationElapsedTime += delta;
		}
		if (enableAutoRotation) {
			dopple.controls.azimuthAngle ${direction === 'clockwise' ? '+' : '-'}= delta * (Math.PI / 180) * autoRotationSpeed;
		}
		requestAnimationFrame(autoRotate);
	})();`

  if (isMiniUiActive) {
    scripts += `\n\n	// Pause auto-rotation while the user is interacting
	function resumeAutoRotation() {
		enableAutoRotation = true;
		document.removeEventListener("pointerup", resumeAutoRotation);
	}
	dopple.container.addEventListener("pointerdown", () => {
		const miniUiButton = document.querySelector("[data-mini-ui-button='autorotate']");
		if (miniUiButton?.dataset?.autorotateState === "active") {
			document.addEventListener("pointerup", resumeAutoRotation);
		}
		enableAutoRotation = false;
	});`
  } else {
    scripts += `\n\n	// Stop auto-rotation after first interaction
	dopple.container.addEventListener("pointerdown", () => {
		enableAutoRotation = false;
	});`
  }

  return scripts
}
