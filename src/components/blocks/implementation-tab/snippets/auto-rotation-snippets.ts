// --------------------------------------------------------------------------------------------- //
// Auto-rotation                                                                                 //
// --------------------------------------------------------------------------------------------- //

export const autoRotateSettingsJs = (
  isActiveOnLoad: boolean = false,
  speed: number = 30,
  direction: 'clockwise' | 'counter-clockwise' = 'clockwise'
) => `\n\n	// Auto-rotation settings
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
