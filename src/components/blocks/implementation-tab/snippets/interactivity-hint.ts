// --------------------------------------------------------------------------------------------- //
// Auto-rotation                                                                                 //
// --------------------------------------------------------------------------------------------- //

export const interactivityHintHtml = (basePath: string) => {
  let path = basePath

  if (!path.endsWith('/')) {
    path += '/'
  }

  return `\n\n	<!-- Interactivity hint -->
	<img src="${path}interactivity-hint.svg" alt="Drag the canvas to rotate" />`
}
export const interactivityHintCss = `\n\n	/* Interactivity hint */
	.configurator-hint {
		margin-bottom: min(2rem, 5%);
		place-self: end center;
		transition: opacity 0.35s linear, visibility 0.35s linear;
		width: clamp(5rem, 20%, 8rem);
	}`
