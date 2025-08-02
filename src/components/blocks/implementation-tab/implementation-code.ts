// --------------------------------------------------------------------------------------------- //
// Code section: Loading screen                                                                  //
// --------------------------------------------------------------------------------------------- //

export const loadingScreenHtml = () => `\n\n	<!-- Loading screen -->
	<div class="loading-screen">
		<svg class="loading-spinner" width="32" height="32" viewBox="0 0 24 24" role="presentation">
			<path d="M12 3a9 9 0 1 0 9 9" />
		</svg>
		<span class="loading-text">
			Loading... <span id="dopple-progress-percent">0%</span>
		</span>
		<progress id="dopple-progress-bar" value="0" max="100" aria-label="The 3D product is loading.">
			0%
		</progress>
	</div>`
export const loadingScreenJs = () => `\n\n	// Loading screen
	const progressPercentText = document.getElementById("dopple-progress-percent");
	const progressBar = document.getElementById("dopple-progress-bar");

	dopple.loadingManager.onProgress = (_url, current, total) => {
		const percentLoaded = Math.round(current / total * 100)
		progressPercentText.textContent = \`\${percentLoaded}%\`;
		progressBar.value = percentLoaded;
		progressBar.textContent = \`\${percentLoaded}%\`;
	};`
export const loadingScreenCss = () => `\n\n	/* Loading screen */
	.loading-screen {
		display: none;
	}
	[data-dopple-loading="true"] .loading-screen {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		justify-content: center;
		pointer-events: none;
		position: relative;
	}
	.loading-spinner {
		animation: dopple-loader-spin 1s linear infinite;
		fill: none;
		height: 2rem;
		stroke: currentColor;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 1.5;
		width: 2rem;
	}
	@keyframes dopple-loader-spin {
		to { transform: rotate(360deg); }
	}
	.loading-text {
		font-size: 0.875rem;
		opacity: 0.5;
	}
	#dopple-progress-bar {
		--progress-bg: lightgray;
		--progress-fg: black;
		--progress-height: 0.5rem;
		--progress-radius: 0.5rem;
		--progress-transition: all 150ms ease-in-out;
		background: var(--progress-bg);
		border: 0px solid black;
		border-radius: var(--progress-radius);
		height: var(--progress-height);
	}
	#dopple-progress-bar::-webkit-progress-bar {
		background: var(--progress-bg);
		border-radius: var(--progress-radius);
	}
	#dopple-progress-bar::-webkit-progress-value {
		background: var(--progress-fg);
		border-radius: var(--progress-radius);
		transition: var(--progress-transition);
	}
	#dopple-progress-bar::-moz-progress-bar {
		background: var(--progress-fg);
		border-radius: var(--progress-radius);
		transition: var(--progress-transition);
	}`

// --------------------------------------------------------------------------------------------- //
// Code section: Main (content that's always included)                                           //
// --------------------------------------------------------------------------------------------- //

export const mainHtmlStart = () => `<div class="dopple" data-dopple-loading="true">
	<!-- Dopple canvas -->
	<div class="dopple-container"></div>`
export const mainHtmlEnd = () => `\n</div>`
export const mainJsStart = (selectionObj = {}) => {
  let selection = ``
  for (const key of Object.keys(selectionObj)) {
    selection += `\n			"${key}": "${selectionObj[key]}",`
  }
  selection += `\n		`

  return `<script is:inline type="module">
	// Import the Dopple SDK
	import { DoppleXR } from "https://builds.dopple.io/packages/dopple-sdk@latest/dopple-sdk.js";

	const doppleWrapper = document.querySelector(".dopple");

	// Initialize a new 3D product
	const dopple = new DoppleXR({
		container: doppleWrapper.querySelector(".dopple-container"),
		owner: "dopple",
		workspace: "dev-docs",
		projectName: "luggage",
		productVersion: "1",
		selection: {${selection}}
	});

	// Optional: add \`dopple\` to the window for easy debugging
	window.dopple = dopple;`
}
export const mainJsLoad = () => `\n\n	// Load the 3D product's assets
	await dopple.load();
	doppleWrapper.removeAttribute("data-dopple-loading");

	// Begin rendering the 3D scene
	dopple.run();`
export const mainJsEnd = () => `\n</script>`
export const mainCssStart = () => `@layer dopple {
	/* Dopple wrapper and container */
	.dopple {
		--color-text: #252629;
		--color-text-muted: #50535A;
		--color-primary: #007BEE;
		--color-primary-accent: #FFF;
		--color-bg: #FFF;
		--color-bg-muted: #EFF0F2;
		--color-border: #C7CAD2;
		--font-family-body: inherit;
		--font-family-heading: inherit;
		aspect-ratio: 16 / 10;
		display: grid;
		font-family: var(--font-family-body);
		position: relative;
	}
	.dopple * {
		box-sizing: border-box;
		margin: 0;
	}
	.dopple > * {
		grid-area: 1 / 1;
	}
	.dopple-container {
		position: relative;
	}
	.dopple img {
		max-width: 100%;
	}`
export const mainCssEnd = () => `\n}`
