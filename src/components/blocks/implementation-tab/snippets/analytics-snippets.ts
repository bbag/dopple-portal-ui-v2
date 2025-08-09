// --------------------------------------------------------------------------------------------- //
// Code section: Hotspots                                                                        //
// --------------------------------------------------------------------------------------------- //

/**
 * @param {string} measurementId - The user's Measurement ID from Google Analytics (e.g. "G-ABCDE12345").
 */

export const analyticsJs = (
  measurementId: string = 'G-ABCDE12345',
  isAddToCartActive: boolean = false,
  addToCartQuerySelector: string = '#add-to-cart'
) => {
  let scripts = `\n\n	// Google Analytics
	const gaScript = document.createElement("script");
	gaScript.async = true;
	gaScript.src = "https://www.googletagmanager.com/gtag/js?id=${measurementId}";
	document.head.appendChild(gaScript);

	function gtag(...args) {
		window.dataLayer.push(args);
	}
	
	window.gtag = gtag;
	gtag("js", new Date());
	gtag("config", "${measurementId}");

	const EVENT_NAMES = {
		// Standard Dopple events (automatically sent)
		LOADED: "dopple_configurator_loaded",
		IN_VIEWPORT: "dopple_canvas_shown",
		OUT_OF_VIEWPORT: "dopple_canvas_hidden",
		CAMERA_UPDATE: "dopple_model_interacted",
		SESSION_ENDED: "dopple_session_ended",
		SNAPSHOT_TAKEN: "dopple_snapshot_taken",
		AR_INITIATED: "dopple_ar_initiated",
		SELECTION_UPDATED: "dopple_property_changed",
		// Custom events (add any custom events here as needed)${isAddToCartActive ? '\n		ADD_TO_CART: "dopple_add_to_cart"' : ''}
	}

	/**
	 * LogWriter function for sending Dopple events to Google Analytics
	 * @param {string} message - A JSON-stringified object matching the following shape:
	 * {
	 *   context: {
	 *     sessionId: string,
	 *     event: string,
	 *     selection?: Object.<string, string>,
	 *     oldSelection?: Object.<string, string>,
	 *     newSelection?: Object.<string, string>,
	 *     target?: string,
	 *     position?: string
	 *   },
	 *   time: number
	 * }
	 */
	function writeGAEvent(message) {
		const msgObject = JSON.parse(message);

		if (!window.gtag || !msgObject?.context?.event) {
			return false;
		}

		const ctx = msgObject.context;
		const eventData = {
			dopple_session_id: ctx.sessionId,
			timestamp: msgObject.time,
		};

		if (!(ctx.event in EVENT_NAMES)) {
			return false;
		}

		const eventName = EVENT_NAMES[ctx.event];

		if (ctx.event === "SELECTION_UPDATED") {
			const oldSel = ctx.oldSelection ?? {};
			const newSel = ctx.selection ?? {};
			for (const key in newSel) {
				if (key in oldSel && newSel[key] !== oldSel[key]) {
					window.gtag("event", eventName, {
						...eventData,
						property_name: key,
						selected_option: newSel[key],
					});
					break;
				}
			}
			return true;
		}

		switch (ctx.event) {
			case "CAMERA_UPDATE":
				Object.assign(eventData, {
					target: ctx.target,
					position: ctx.position,
				});
				break;
			case "SNAPSHOT_TAKEN":
			case "AR_INITIATED":
				eventData.full_config_object = ctx.selection;
				break;
		}

		window.gtag("event", eventName, eventData);

		return false;
	}

	dopple.addLogWriter(writeGAEvent);`

  if (isAddToCartActive) {
    scripts += `\n\n	// Send the custom \`ADD_TO_CART\` event when the Add To Cart button is clicked
 	const addToCartButton = document.querySelector("${addToCartQuerySelector}");
 	if (!addToCartButton) {
 		console.warn("addToCartButton not defined. Is the querySelector correct?");
 	}
	addToCartBtn?.addEventListener("click", () => {
		dopple.logger.info(
			{
				analyticsEvent: true,
				event: "ADD_TO_CART",
			},
			"User added the product to the cart",
		);
	});`
  }

  return scripts
}
