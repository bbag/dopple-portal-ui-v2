// --------------------------------------------------------------------------------------------- //
// Code section: Minimal (bare-minimum code if no additional options are selected)               //
// --------------------------------------------------------------------------------------------- //

export const configurationMenuHtml = (
  matrixChoices: { property: string; options: string[]; selectedOption: string }[],
  type: 'dropdowns' | 'radios'
) => {
  let markup = `\n\n<!-- Configuration Menu -->
<div class="dopple-config-menu">
	<h1>Configuration Options</h1>`

  for (const choice of matrixChoices) {
    markup += `\n	<fieldset>
		<legend>${choice.property}</legend>`
    switch (type) {
      case 'dropdowns': {
        markup += `\n		<select name="${choice.property}">`
        for (const option of choice.options) {
          markup += `\n			<option value="${option}"${choice.selectedOption === option ? ' selected' : ''}>${option}</option>`
        }
        markup += `\n		</select>`
        break
      }
      case 'radios':
      default: {
        for (const option of choice.options) {
          markup += `\n		<label>
			<input type="radio" name="${choice.property}" value="${option}" ${choice.selectedOption === option ? 'checked ' : ''}/>
			${option}
		</label>`
        }
      }
    }
    markup += `\n	</fieldset>`
  }
  markup += '\n</div>'

  return markup
}

export const configurationMenuCss = (type: 'dropdowns' | 'radios') => {
  switch (type) {
    case 'dropdowns': {
      return `\n	/* Config menu styles */
	select {
		cursor: pointer;
		font-family: var(--font-family-body, inherit);
	}`
    }
    case 'radios':
    default: {
      return `\n	/* Config menu styles */
	label {
		cursor: pointer;
		display: inline-block;
		font-family: var(--font-family-body, inherit);
	}`
    }
  }
}

export const configurationMenuJs = (type: 'dropdowns' | 'radios') => {
  let script = `\n\n	// Configuration menu`

  switch (type) {
    case 'dropdowns': {
      script += `\n	const configMenus = document.querySelectorAll(".dopple-config-menu select");
	for (const menu of configMenus) {
		menu.addEventListener("change", async () => {
			await dopple.updateSelection({ [menu.name]: menu.value });
		});
	}`
      break
    }
    case 'radios':
    default: {
      script += `\n	const configRadios = document.querySelectorAll(".dopple-config-menu input[type='radio']");
	for (const radio of configRadios) {
		radio.addEventListener("change", async () => {
			await dopple.updateSelection({ [radio.name]: radio.value });
		});
	}`
    }
  }

  return script
}
