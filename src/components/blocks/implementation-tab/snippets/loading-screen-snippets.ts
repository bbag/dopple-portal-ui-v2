// --------------------------------------------------------------------------------------------- //
// Code section: Loading screen                                                                  //
// --------------------------------------------------------------------------------------------- //

export const loadingScreenHtml = (loadingScreenText: string) => `\n\n	<!-- Loading screen -->
	<div class="loading-screen">
		<svg class="loading-spinner" width="32" height="32" viewBox="0 0 24 24" role="presentation">
			<path d="M12 3a9 9 0 1 0 9 9" />
		</svg>
		<span class="loading-text">
			${loadingScreenText || 'Loading...'} <span id="dopple-progress-percent">0%</span>
		</span>
		<progress id="dopple-progress-bar" value="0" max="100" aria-label="The 3D product is loading.">
			0%
		</progress>
	</div>`
export const loadingScreenJs = `\n\n	// Loading screen
	const progressPercentText = document.getElementById("dopple-progress-percent");
	const progressBar = document.getElementById("dopple-progress-bar");

	dopple.loadingManager.onProgress = (_url, current, total) => {
		const percentLoaded = Math.round(current / total * 100)
		progressPercentText.textContent = \`\${percentLoaded}%\`;
		progressBar.value = percentLoaded;
		progressBar.textContent = \`\${percentLoaded}%\`;
	};`
export const loadingScreenCss = `\n\n	/* Loading screen */
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
