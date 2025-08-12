// --------------------------------------------------------------------------------------------- //
// Mini UI general settings                                                                      //
// --------------------------------------------------------------------------------------------- //

export const miniUiStartHtml = `\n\n	<!-- Mini UI -->
	<div class="dopple-mini-ui">`
export const miniUiEndHtml = `\n	</div>`
export const miniUiGroupStartHtml = (group: 'left' | 'right') =>
  `\n		<div data-mini-ui-side="${group}">`
export const miniUiGroupEndHtml = `\n		</div>`
export const miniUiCss = `\n\n	/* Dopple Mini UI */
	.dopple-mini-ui {
		align-items: flex-end;
		display: flex;
		justify-content: space-between;
		position: relative;
		transition: all 350ms ease-in-out;
	}
	[data-dopple-loading="true"] .dopple-mini-ui {
		visibility: hidden;
		opacity: 0;
	}
	[data-mini-ui-side] {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
	}
	[data-mini-ui-button],
	[data-mini-ui-action="close"] {
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
	[data-mini-ui-button] svg,
	[data-mini-ui-action="close"] svg {
		fill: none;
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
	.dopple-mini-ui-shadow {
		opacity: 0.45;
		stroke: #000;
		stroke-width: 4;
		transition: opacity 150ms ease;
	}
	[data-mini-ui-button]:hover .dopple-mini-ui-shadow,
	[data-mini-ui-button]:focus-visible .dopple-mini-ui-shadow {
		opacity: 0.75;
	}`
export const miniUiDialogCss = `\n	[data-mini-ui-dialog] {
		background: var(--color-bg);
		border: 0;
		border-radius: 1rem;
		box-shadow:
			inset 0 0 0 1px hsl(220deg 2% 50% / 0.15),
			0 -0.0625rem 0.125rem hsl(220deg 30% 3% / 0.15),
			0 0.125rem 0.125rem -0.0625rem hsl(220deg 30% 3% / 0.15),
			0 0.5rem 0.875rem -0.25rem hsl(220deg 30% 3% / 0.15);
		color: #252629;
		margin: auto;
		max-width: calc(100% - 1.5rem);
		padding: 1.5rem;
		width: 32rem;
	}
	[data-mini-ui-dialog]::backdrop {
		background: hsl(220deg 30% 3% / 0.25);
	}
	[data-mini-ui-action="close"] {
		position: absolute;
		right: 1rem;
		top: 1rem;
	}
	[data-mini-ui-action="close"]:hover,
	[data-mini-ui-action="close"]:focus-visible {
		background: var(--color-bg-muted);
		color: var(--color-text);
	}
	[data-mini-ui-action="close"] svg {
		height: 1.25rem;
		stroke: var(--color-text-muted);
		width: 1.25rem;
	}
	[data-mini-ui-action="close"]:hover svg,
	[data-mini-ui-action="close"]:focus-visible svg {
		stroke: currentColor;
	}
	.dopple-dialog-heading {
		color: var(--color-text);
		font-family: var(--font-family-heading);
		font-size: 1.5rem;
		margin: 0;
		padding: 0 2rem 0 0;
	}
	.dopple-dialog-description {
		color: var(--color-text-muted);
		font-size: 0.875rem;
		line-height: 1.4;
		margin: 0.5rem 0 1rem;
	}
	.dopple-dialog-action-buttons {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: flex-end;
		margin-top: 1.5rem;
	}
	.dopple-mini-ui-action-button {
		background: var(--color-primary);
		border: 1px solid transparent;
		border-radius: 0.5rem;
		color: var(--color-primary-accent);
		cursor: pointer;
		font-family: inherit;
		font-size: 0.875rem;
		height: 2.25rem;
		padding: 0 1rem;
		transition: all 200ms ease-in-out;
	}
	.dopple-mini-ui-action-button:hover,
	.dopple-mini-ui-action-button:focus-visible {
		opacity: 0.85;
	}`
export const miniUiDialogCloseButtonsJs = `\n\n	// Mini UI dialog close buttons
	const dialogCloseButtons = doppleWrapper.querySelectorAll("[data-mini-ui-action='close']");
	for (const button of dialogCloseButtons) {
		button.addEventListener("click", () => {
			try {
				const dialog = button.closest("dialog");
				dialog.close();
			} catch (error) {
				console.error(error);
			}
		});
	}`

// --------------------------------------------------------------------------------------------- //
// Augmented Reality                                                                             //
// --------------------------------------------------------------------------------------------- //

export const arHtml = `\n\n			<!-- Augmented Reality -->
			<button data-mini-ui-button="ar" title="View in Augmented Reality">
				<svg width="24" height="24" viewBox="0 0 24 24">
					<use href="#dopple-icon-ar" class="dopple-mini-ui-shadow" />
					<g id="dopple-icon-ar">
						<path d="M3 6v-1a2 2 0 0 1 2-2h1M3 18v1a2 2 0 0 0 2 2h1M18 3h1a2 2 0 0 1 2 2v1M18 21h1a2 2 0 0 0 2-2v-1M12 7 17 9.5 17 14.5 12 17 7 14.5 7 9.5 12 7M7 9.5 12 12M17 9.5 12 12M12 17 12 12" />
					</g>
				</svg>
			</button>
			<dialog data-mini-ui-dialog="ar" aria-labelledby="dopple-dialog-heading-ar" aria-describedby="dopple-dialog-description-ar" closedby="any">
				<button data-mini-ui-action="close" title="Close" aria-label="Close dialog">
					<svg width="20" height="20" viewBox="0 0 20 20">
						<path d="M14 6l-8 8M6 6l8 8" />
					</svg>
				</button>
				<h2 id="dopple-dialog-heading-ar" class="dopple-dialog-heading">
					Augmented Reality
				</h2>
				<p id="dopple-dialog-description-ar" class="dopple-dialog-description">
					Scan the QR code below using your smartphone to view in augmented reality.
				</p>
				<img id="dopple-ar-qr-code" src="" alt="A scannable QR code to view this 3D product in augmented reality." />
			</dialog>`
export const arCss = `\n\n	/* Augmented Reality (Mini UI)*/
	#dopple-ar-qr-code {
		margin: 0 auto;
		max-width: 100%;
	}
	[data-mini-ui-dialog="ar"] {
		width: 24rem;
	}`
export const arJs = `\n\n	// Mini UI button: Augmented Reality
	const arButton = doppleWrapper.querySelector("[data-mini-ui-button='ar']");
	arButton?.addEventListener("click", async () => {
		try {
			const buttonDialog = doppleWrapper.querySelector("[data-mini-ui-dialog='ar']");
			const arData = await dopple.startAR();

			if (arData) {
				const img = document.getElementById("dopple-ar-qr-code");
				img.src = arData;

				buttonDialog.showModal();
			}
		} catch (error) {
			console.error(error);
		}
	});`

// --------------------------------------------------------------------------------------------- //
// Auto-rotation                                                                                 //
// --------------------------------------------------------------------------------------------- //

export const autoRotateHtml = (isActiveOnLoad: boolean = false) => `\n\n			<!-- Auto-rotate -->
			<button data-mini-ui-button="autorotate" title="${isActiveOnLoad ? 'Auto-rotate: On' : 'Auto-rotate: Off'}" data-autorotate-state="${isActiveOnLoad ? 'active' : 'inactive'}">
				<svg data-autorotate-icon="active" width="24" height="24" viewBox="0 0 24 24">
					<use href="#dopple-icon-autorotate-on" class="dopple-mini-ui-shadow" />
					<g id="dopple-icon-autorotate-on">
						<path d="M17 15.328c2.414 -.718 4 -1.94 4 -3.328c0 -2.21 -4.03 -4 -9 -4s-9 1.79 -9 4s4.03 4 9 4M9 13l3 3l-3 3" />
					</g>
				</svg>
				<svg data-autorotate-icon="inactive" width="24" height="24" viewBox="0 0 24 24">
					<use href="#dopple-icon-autorotate-off" class="dopple-mini-ui-shadow" />
					<g id="dopple-icon-autorotate-off">
						<path d="M8.3,8.3C5.2,9,3,10.4,3,12c0,2.2,4,4,9,4M18.6,14.7C20.1,14,21,13,21,12c0-2.2-4-4-9-4M9,13l3,3l-3,3M4,4L20,20" />
					</g>
				</svg>
			</button>`
export const autoRotateCss = `\n\n	/* Auto-rotate (Mini UI) */
	[data-autorotate-state="inactive"] [data-autorotate-icon="active"],
	[data-autorotate-state="active"] [data-autorotate-icon="inactive"] {
		display: none;
	}`
export const autoRotateJs = `\n\n	// Mini UI button: Auto-rotate
	const autorotateButton = doppleWrapper.querySelector("[data-mini-ui-button='autorotate']");
	autorotateButton?.addEventListener("click", () => {
		enableAutoRotation = !enableAutoRotation;
		if (enableAutoRotation) {
			autorotateButton.dataset.autorotateState = "active";
			autorotateButton.title = "Auto-rotate: On";
		} else {
			autorotateButton.dataset.autorotateState = "inactive";
			autorotateButton.title = "Auto-rotate: Off";
		}
	});`

// --------------------------------------------------------------------------------------------- //
// Controls & Gestures                                                                           //
// --------------------------------------------------------------------------------------------- //

export const gesturesHtml = (basePath: string) => {
  let path = basePath

  if (!path.endsWith('/')) {
    path += '/'
  }

  return `\n\n			<!-- Controls & Gestures -->
				<button data-mini-ui-button="controls" title="Controls & Gestures">
					<svg width="24" height="24" viewBox="0 0 24 24">
						<use href="#dopple-icon-controls" class="dopple-mini-ui-shadow" />
						<g id="dopple-icon-controls">
							<path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47M14 10.5a1.5 1.5 0 0 1 3 0v1.5M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5" />
						</g>
					</svg>
				</button>
				<dialog data-mini-ui-dialog="controls" aria-labelledby="dopple-dialog-heading-controls" aria-describedby="dopple-dialog-description-controls" closedby="any">
					<button data-mini-ui-action="close" title="Close" aria-label="Close dialog">
						<svg width="20" height="20" viewBox="0 0 20 20">
							<path d="M14 6l-8 8M6 6l8 8" />
						</svg>
					</button>
					<h2 id="dopple-dialog-heading-controls" class="dopple-dialog-heading">
						Controls & Gestures
					</h2>
					<p id="dopple-dialog-description-controls" class="dopple-dialog-description">
						Use your mouse, keyboard, or touch gestures to view the product from different angles.
					</p>
					<div data-mini-ui-controls="touch">
						<div class="dopple-mini-ui-control-icon">
							<img src="${path}icon-hand-rotate.svg" alt="Rotate" title="Touch and drag to rotate" />
							Rotate
						</div>
						<div class="dopple-mini-ui-control-icon">
							<img src="${path}icon-hand-pan.svg" alt="Pan" title="Drag with two fingers to pan" />
							Pan
						</div>
						<div class="dopple-mini-ui-control-icon">
							<img src="${path}icon-hand-zoom.svg" alt="Zoom" title="Pinch to zoom" />
							Zoom
						</div>
					</div>
					<div data-mini-ui-controls="mouse">
						<div class="dopple-mini-ui-control-icon">
							<img src="${path}icon-mouse-rotate.svg" alt="Rotate" title="Click and drag to rotate" />
							Rotate
						</div>
						<div class="dopple-mini-ui-control-icon">
							<img src="${path}icon-mouse-pan.svg" alt="Pan" title="Right-click to pan" />
							Pan
						</div>
						<div class="dopple-mini-ui-control-icon">
							<img src="${path}icon-mouse-zoom.svg" alt="Zoom" title="Scroll to zoom" />
							Zoom
						</div>
					</div>
					<hr class="dopple-controls-divider">
					<div data-mini-ui-controls="keyboard">
						<div class="dopple-mini-ui-control-keyboard-item">
							<img src="${path}arrow-keys.svg" alt="Use the arrow keys to rotate" />
							Rotate
						</div>
						<div class="dopple-mini-ui-control-keyboard-item">
							<img src="${path}arrow-keys-ctrl.svg" alt="Hold Ctrl and use the arrow keys to pan" />
							Pan
						</div>
						<div class="dopple-mini-ui-control-keyboard-item">
							<img src="${path}arrow-keys-alt.svg" alt="Hold Alt and use the up/down arrow keys to zoom" />
							Zoom
						</div>
					</div>
				</dialog>`
}
export const gesturesCss = `\n\n	/* Controls & Gestures (Mini UI) */
	[data-mini-ui-dialog="controls"] {
		width: 32rem;
	}
	[data-mini-ui-controls="touch"],
	[data-mini-ui-controls="mouse"] {
		align-items: center;
		color: var(--color-text-muted);
		display: flex;
		font-size: 1.875rem;
		gap: 2rem;
		justify-content: center;
		margin: 1.5rem 0 0;
		position: relative;
		text-align: center;
		user-select: none;
		z-index: 1;
	}
	[data-mini-ui-controls="mouse"] {
		display: none;
	}
	.dopple-mini-ui-control-icon {
		align-items: center;
		display: flex;
		flex-direction: column;
		font-size: 0.875rem;
		gap: 0.5rem;
		margin: 0;
		width: 3rem;
	}
	@media (hover: hover) {
		[data-mini-ui-controls="touch"] {
			display: none;
		}
		[data-mini-ui-controls="mouse"] {
			display: flex;
		}
	}
	[data-mini-ui-controls="keyboard"] {
		display: none;
	}
	.dopple-mini-ui-control-keyboard-item {
		align-items: center;
		color: var(--color-text-muted);
		display: flex;
		flex-direction: column;
		font-size: 0.875rem;
		gap: 0.5rem;
		margin: 0 auto;
		text-align: center;
	}
	.dopple-mini-ui-control-keyboard-item,
	.dopple-mini-ui-control-icon img {
		max-width: 100%;
	}
	.dopple-controls-divider {
		display: none;
	}
	@media (min-width: 34rem) {
		[data-mini-ui-controls="keyboard"] {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.5rem;
		}
		.dopple-controls-divider {
			background: var(--color-border);
			border: 0;
			display: block;
			height: 1px;
			margin: 1.5rem 0;
		}
	}
	@media (min-width: 64rem) {
		.dopple-mini-ui-control-icon {
			width: 3.75rem;
		}
	}`
export const gesturesJs = `\n\n	// Mini UI button: Controls & Gestures
	const controlsButton = doppleWrapper.querySelector("[data-mini-ui-button='controls']");
	controlsButton?.addEventListener("click", () => {
		try {
			const buttonDialog = doppleWrapper.querySelector("[data-mini-ui-dialog='controls']");
			buttonDialog.showModal();
		} catch (error) {
			console.error(error);
		}
	});`

// --------------------------------------------------------------------------------------------- //
// Full Screen                                                                                   //
// --------------------------------------------------------------------------------------------- //

export const fullScreenHtml = `\n\n			<!-- Full Screen -->
			<button data-mini-ui-button="fullscreen" title="Enter Full Screen" data-fullscreen-state="inactive">
				<svg data-fullscreen-icon="inactive" width="24" height="24" viewBox="0 0 24 24">
					<use href="#dopple-icon-fullscreen" class="dopple-mini-ui-shadow" />
					<g id="dopple-icon-fullscreen">
						<path d="M4 8v-2a2 2 0 0 1 2 -2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2 -2v-2" />
					</g>
				</svg>
				<svg data-fullscreen-icon="active" width="24" height="24" viewBox="0 0 24 24">
					<use href="#dopple-icon-fullscreen-close" class="dopple-mini-ui-shadow" />
					<g id="dopple-icon-fullscreen-close">
						<path d="M16 20v-2a2 2 0 0 1 2 -2h2M16 4v2a2 2 0 0 0 2 2h2M4 16h2a2 2 0 0 1 2 2v2M4 8h2a2 2 0 0 0 2 -2v-2" />
					</g>
				</svg>
			</button>`
export const fullScreenCss = `\n\n	/* Full Screen (Mini UI) */
    [data-fullscreen-state="inactive"] [data-fullscreen-icon="active"],
    [data-fullscreen-state="active"] [data-fullscreen-icon="inactive"] {
        display: none;
    }`
export const fullScreenJs = `\n\n	// Mini UI button: Full Screen
	const fullscreenButton = doppleWrapper.querySelector("[data-mini-ui-button='fullscreen']");
	fullscreenButton?.addEventListener("click", () => {
		if (document.fullscreenElement || document.webkitFullscreenElement) {
			document.exitFullscreen?.();
			document.webkitExitFullscreen?.();
			fullscreenButton.dataset.fullscreenState = "inactive";
			fullscreenButton.title = "Enter Fullscreen";
		} else {
			doppleWrapper.requestFullscreen?.();
			doppleWrapper.webkitRequestFullscreen?.();
			fullscreenButton.dataset.fullscreenState = "active";
			fullscreenButton.title = "Exit Fullscreen";
		}
	});`

// --------------------------------------------------------------------------------------------- //
// Share                                                                                         //
// --------------------------------------------------------------------------------------------- //

export const shareHtml = `\n\n			<!-- Share -->
			<button data-mini-ui-button="share" title="Share">
				<svg width="24" height="24" viewBox="0 0 24 24">
					<use href="#dopple-icon-share" class="dopple-mini-ui-shadow"></use>
					<g id="dopple-icon-share">
						<path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M8.7 10.7l6.6 -3.4M8.7 13.3l6.6 3.4" />
					</g>
				</svg>
			</button>
			<dialog data-mini-ui-dialog="share" aria-labelledby="dopple-dialog-heading-share" aria-describedby="dopple-dialog-description-share" closedby="any">
				<button data-mini-ui-action="close" title="Close" aria-label="Close dialog">
					<svg width="20" height="20" viewBox="0 0 20 20">
						<path d="M14 6l-8 8M6 6l8 8" />
					</svg>
				</button>
				<h2 id="dopple-dialog-heading-share" class="dopple-dialog-heading">
					Share Configuration
				</h2>
				<p id="dopple-dialog-description-share" class="dopple-dialog-description">
					Copy the URL below to share your custom configuration.
				</p>
				<textarea id="dopple-share-link" readonly></textarea>
				<div class="dopple-dialog-action-buttons">
					<button id="dopple-share-copy-button" class="dopple-mini-ui-action-button">
						Copy Link
					</button>
				</div>
			</dialog>`
export const shareCss = `\n\n	/* Share (Mini UI) */
	#dopple-share-link {
		background: var(--color-bg-muted);
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		color: var(--color-text);
		font-size: 0.875rem;
		font-family: inherit;
		height: 8rem;
		line-height: 1.5;
		padding: 0.75rem 1rem;
		resize: none;
		width: 100%;
	}`
export const shareJs = `\n\n	// Mini UI button: Share
	const shareUrlTextarea = document.getElementById("dopple-share-link");
	const shareButton = doppleWrapper.querySelector("[data-mini-ui-button='share']");
	shareButton?.addEventListener("click", async () => {
		try {
			isShareUrlCopied = false;
			copyShareUrlButton.textContent = "Copy link";

			const { url } = await dopple.generateShareURL({
				baseUrl: window.location,
				arMode: false,
				qrCode: false
			});
			shareUrlTextarea.value = url;

			const buttonDialog = doppleWrapper.querySelector("[data-mini-ui-dialog='share']");
			buttonDialog.showModal();
		} catch (error) {
			console.error(error);
		}
	});

	let isShareUrlCopied = false;
	const copyShareUrlButton = document.getElementById("dopple-share-copy-button");
	copyShareUrlButton.addEventListener("click", async () => {
		await navigator.clipboard.writeText(shareUrlTextarea.value);

		if (!isShareUrlCopied) {
			isShareUrlCopied = true;
			copyShareUrlButton.textContent = "Copied!";
		}
	});`

// --------------------------------------------------------------------------------------------- //
// Snapshot                                                                                      //
// --------------------------------------------------------------------------------------------- //

export const snapshotHtml = (width: number, height: number) => `\n\n			<!-- Snapshot -->
			<button data-mini-ui-button="snapshot" title="Take Snapshot">
				<svg width="24" height="24" viewBox="0 0 24 24">
					<use href="#dopple-icon-snapshot" class="dopple-mini-ui-shadow" />
					<g id="dopple-icon-snapshot">
						<path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2M12 10.75A2.25 2.25 0 1 0 12 15.25 2.25 2.25 0 1 0 12 10.75z" />
					</g>
				</svg>
			</button>
			<dialog data-mini-ui-dialog="snapshot" aria-labelledby="dopple-dialog-heading-snapshot" aria-describedby="dopple-dialog-description-snapshot" closedby="any">
				<button data-mini-ui-action="close" title="Close" aria-label="Close dialog">
					<svg width="20" height="20" viewBox="0 0 20 20">
						<path d="M14 6l-8 8M6 6l8 8" />
					</svg>
				</button>
				<h2 id="dopple-dialog-heading-snapshot" class="dopple-dialog-heading">
					Snapshot
				</h2>
				<p id="dopple-dialog-description-snapshot" class="dopple-dialog-description">
					Save a snapshot image of your customized product to your device.
				</p>
				<div class="dopple-snapshot-options">
					<div class="dopple-snapshot-option">
						<label for="dopple-snapshot-width">Width</label>
						<div class="dopple-snapshot-input-wrapper">
							<input id="dopple-snapshot-width" class="dopple-snapshot-input" type="number" value="${width}" min="1" max="4096" />
							<span class="dopple-snapshot-input-postfix">px</span>
						</div>
					</div>
					<div class="dopple-snapshot-option">
						<label for="dopple-snapshot-height">Height</label>
						<div class="dopple-snapshot-input-wrapper">
							<input id="dopple-snapshot-height" class="dopple-snapshot-input" type="number" value="${height}" min="1" max="4096" />
							<span class="dopple-snapshot-input-postfix">px</span>
						</div>
					</div>
				</div>
				<div class="dopple-dialog-action-buttons">
					<button id="dopple-save-snapshot-button" class="dopple-mini-ui-action-button">
						Save Snapshot
					</button>
				</div>
			</dialog>`
export const snapshotCss = `\n\n	/* Snapshot (Mini UI) */
	[data-mini-ui-dialog="snapshot"] {
		width: 26rem;
	}
	.dopple-snapshot-options {
		display: flex;
		flex-wrap: wrap;
		font-size: 0.875rem;
		gap: 0.75rem 1.5rem;
		margin: 1rem 0;
	}
	.dopple-snapshot-option {
		flex: 1 1 auto;
	}
	.dopple-snapshot-option label {
		color: var(--color-text-muted);
		cursor: pointer;
		display: inline-block;
		width: 3.5rem;
	}
	.dopple-snapshot-input-wrapper {
		align-items: center;
		display: flex;
	}
	.dopple-snapshot-input-postfix,
	.dopple-snapshot-input {
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		height: 2.25rem;
	}
	.dopple-snapshot-input {
		background: var(--color-bg);
		border-bottom-right-radius: 0;
		border-top-right-radius: 0;
		color: var(--color-text);
		flex: 1 1 auto;
		font-size: inherit;
		max-width: 100%;
		padding: 0 0.625rem;
		position: relative;
		width: 100%;
	}
	.dopple-snapshot-input-postfix {
		align-items: center;
		background: var(--color-bg-muted);
		border-bottom-left-radius: 0;
		border-left: 0;
		border-top-left-radius: 0;
		color: var(--color-text-muted);
		display: flex;
		padding: 0 0.625rem;
	}`
export const snapshotJs = (width: number, height: number) => `\n\n	// Mini UI button: Snapshot
	const snapshotButton = doppleWrapper.querySelector("[data-mini-ui-button='snapshot']");
	snapshotButton?.addEventListener("click", () => {
		try {
			const buttonDialog = doppleWrapper.querySelector("[data-mini-ui-dialog='snapshot']");
			buttonDialog.showModal();
		} catch (error) {
			console.error(error);
		}
	});

	const snapshotWidth = document.getElementById("dopple-snapshot-width");
	const snapshotHeight = document.getElementById("dopple-snapshot-height");
	const saveSnapshotButton = document.getElementById("dopple-save-snapshot-button");
	saveSnapshotButton.addEventListener("click", async () => {
		await dopple.takeSnapshot({
			fileName: dopple.projectName || "snapshot",
			mimeType: "image/png",
			size: {
				width: snapshotWidth.value || ${width}, // pixels
				height: snapshotHeight.value || ${height} // pixels
			}
		});
	});`
