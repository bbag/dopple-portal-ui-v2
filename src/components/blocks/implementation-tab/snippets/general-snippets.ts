// --------------------------------------------------------------------------------------------- //
// Code section: Minimal (bare-minimum code if no additional options are selected)               //
// --------------------------------------------------------------------------------------------- //

export const minimalHtml = `<!-- Dopple canvas -->
<div class="dopple-container"></div>`
export const minimalCss = `.dopple-container {
	position: relative;
}`
export const minimalJs = `.dopple-container {
	position: relative;
}`

// --------------------------------------------------------------------------------------------- //
// Code section: Main (content that's always included)                                           //
// --------------------------------------------------------------------------------------------- //

export const mainHtmlStart = `<div class="dopple" data-dopple-loading="true">
	<!-- Dopple canvas -->
	<div class="dopple-container"></div>`
export const mainHtmlEnd = `\n</div>`
export const mainJsStart = `<script type="module">
	// Import the Dopple SDK
	import { DoppleXR } from "https://builds.dopple.io/packages/dopple-sdk@latest/dopple-sdk.js";`
export const mainJsDoppleWrapper = `\n\n	const doppleWrapper = document.querySelector(".dopple");`
export const mainJsNewDoppleInstance = (selectionObj = {}) => {
  let selection = ``
  for (const key of Object.keys(selectionObj)) {
    selection += `\n			"${key}": "${selectionObj[key]}",`
  }
  selection += `\n		`

  return `\n\n	// Initialize a new 3D product
	const dopple = new DoppleXR({
		container: doppleWrapper.querySelector(".dopple-container"),
		owner: "dopple",
		workspace: "dev-docs",
		projectName: "luggage",
		productVersion: "1",
		selection: {${selection}}
	});`
}
export const mainJsWindowDopple = `\n\n	// Optional: add \`dopple\` to the window for easy access from the console
	window.dopple = dopple;`
export const mainJsDoppleLoad = `\n\n	// Load the 3D product's assets
	await dopple.load();`
export const mainJsRemoveLoadingAttribute = `\n	doppleWrapper.removeAttribute("data-dopple-loading");`
export const mainJsDoppleRun = `\n\n	// Begin rendering the 3D scene
	dopple.run();`

export const mainJsEnd = `\n</script>`
export const mainCssStart = `@layer dopple {
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
	}`
export const mainCssEnd = `\n}`
