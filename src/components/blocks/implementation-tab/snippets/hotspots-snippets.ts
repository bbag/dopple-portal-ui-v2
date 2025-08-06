// --------------------------------------------------------------------------------------------- //
// Code section: Hotspots                                                                        //
// --------------------------------------------------------------------------------------------- //

export const hotspotsHtml = (hotspotsObj: Record<string, {}>, type: 'minimal' | 'stylized') => {
  let markup = `\n\n	<!-- Hotspots -->
	<div class="hotspots-container">`

  for (const hotspotId of Object.keys(hotspotsObj)) {
    const id = hotspotId
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\-_:.]/g, '-')

    markup += `\n		<div data-hotspot="${id}">`

    switch (type) {
      case 'minimal': {
        markup += `\n			<!-- Replace with your hotspot content here -->
			<p>${id}</p>`
        break
      }
      case 'stylized':
      default: {
        markup += `\n			<input id="hotspot-checkbox-${id}" type="checkbox" />
			<label class="hotspot-dot" for="hotspot-checkbox-${id}">
				<svg viewBox="0 0 24 24" width="32" height="32" role="presentation">
					<line x1="12" y1="8" x2="12" y2="16" />
					<line x1="8" y1="12" x2="16" y2="12" />
				</svg>
			</label>
			<div class="hotspot-content">
				<!-- Replace with your hotspot content here -->
				<p>${id}</p>
			</div>
		</div>`
      }
    }
    markup += `\n		</div>`
  }

  markup += `\n	</div>`
  return markup
}
export const hotspotsCss = (type: 'minimal' | 'stylized') => {
  let styles = `\n\n	/* Hotspots */
	.hotspots-container {
		display: none;
	}`

  if (type === 'stylized') {
    styles += `\n	.dopple {
		--color-hotspot-dot: #007BEE;
		--color-hotspot-dot-active: #00AE8B;
		--color-hotspot-dot-accent: #FFF;
	}
	[data-hotspot] input[type="checkbox"] {
		border: 0 !important;
		clip: rect(0, 0, 0, 0) !important;
		height: 1px !important;
		margin: -1px !important;
		overflow: hidden !important;
		padding: 0 !important;
		position: absolute !important;
		white-space: nowrap !important;
		width: 1px !important;
	}
	.hotspot-dot {
		align-items: center;
		background: var(--color-hotspot-dot);
		border-radius: 1rem;
		box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.25);
		color: var(--color-hotspot-dot-accent);
		cursor: pointer;
		display: flex;
		height: 1.5rem;
		justify-content: center;
		margin: 0;
		padding: 0;
		position: absolute;
		transform: translate(-50%, -50%);
		transition: all 300ms cubic-bezier(0.06, 0.8, 0.2, 1);
		user-select: none;
		width: 1.5rem;
	}
	.hotspot-dot:hover,
	.hotspot input[type="checkbox"]:focus-visible ~ .hotspot-dot {
		transform: translate(-50%, -50%) scale(1.15);
	}
	.hotspot input[type="checkbox"]:focus-visible ~ .hotspot-dot {
		outline: 4px solid rgba(0, 128, 234, 0.25);
	}
	.hotspot-dot svg {
		fill: none;
		height: 1.5rem;
		stroke: currentColor;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 2;
		width: 1.5rem;
	}
	.hotspot-content {
		background: var(--color-bg);
		border-radius: 0.625rem;
		bottom: calc(100% + 1.5rem);
		box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
		color: var(--color-text);
		left: 50%;
		padding: 1rem;
		pointer-events: none;
		position: absolute;
		opacity: 0;
		transform: translate(-50%, 0) scale(0.75);
		transform-origin: bottom center;
		transition: all 350ms cubic-bezier(0.06, 0.8, 0.2, 1);
		visibility: hidden;
		width: 15rem;
	}
	.hotspot-content::after {
		border: solid 0.5rem transparent;
		border-top-color: var(--color-bg);
		bottom: -0.875rem;
		content: '';
		display: block;
		left: 50%;
		position: absolute;
		transform: translate(-50%, 0);
	}
	[data-hotspot] input[type="checkbox"]:checked ~ .hotspot-dot {
		background: var(--color-hotspot-dot-active);
	}
	[data-hotspot] input[type="checkbox"]:checked ~ .hotspot-content {
		opacity: 1;
		pointer-events: auto;
		transform: translate(-50%, 0);
		visibility: visible;
	}`
  }

  return styles
}
export const hotspotsJs = `\n\n	// Hotspots
	const hotspots = doppleWrapper.querySelectorAll("[data-hotspot]");
	for (const hotspot of hotspots) {
		const hotspotId = hotspot.dataset.hotspot;
		if (dopple.matrix.hotspots[hotspotId]) {
			dopple.matrix.hotspots[hotspotId].element = hotspot;
		}

		const hotspotCheckbox = hotspot.querySelector("[data-hotspot] > input[type='checkbox']");
		if (hotspotCheckbox.checked) {
			// Ensure hotspot is inactive by default on page load (override default Firefox behavior)
			hotspotCheckbox.checked = false;
		}
	}
	if (hotspots.length) {
		await dopple.updateSelection();
	}`
