import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, TextControl, Icon, ToggleControl } from '@wordpress/components';
import { icons, getOptionColors, getOptions } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ButtonOptions = (attributes) => {
	const {
		title: manifestTitle,
		componentName: manifestComponentName,
		options: manifestOptions,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		label = manifestTitle,
		options = manifestOptions,
		buttonShowControls = true,

		buttonUse = checkAttr('buttonUse', attributes, manifest, componentName),

		buttonColor = checkAttr('buttonColor', attributes, manifest, componentName),
		buttonSize = checkAttr('buttonSize', attributes, manifest, componentName),
		buttonWidth = checkAttr('buttonWidth', attributes, manifest, componentName),
		buttonIsAnchor = checkAttr('buttonIsAnchor', attributes, manifest, componentName),
		buttonId = checkAttr('buttonId', attributes, manifest, componentName),
		buttonIsLink = checkAttr('buttonIsLink', attributes, manifest, componentName),

		showButtonUse = true,
		showButtonColor = true,
		showButtonSize = true,
		showButtonWidth = true,
		showButtonIsAnchor = true,
		showButtonId = true,
		showButtonIsLink = true,
	} = attributes;

	if (!buttonShowControls) {
		return null;
	}

	return (
		<>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			{showButtonUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'test-theme'), label)}
					checked={buttonUse}
					onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
				/>
			}

			{buttonUse &&
				<>
					{showButtonColor &&
						<ColorPaletteCustom
							label={
								<>
									<Icon icon={icons.color} />
									{__('Color', 'test-theme')}
								</>
							}
							value={buttonColor}
							colors={getOptionColors(getOptions(manifest, componentName, 'color', options))}
							onChange={(value) => setAttributes({ [`${componentName}Color`]: value })}
						/>
					}

					{showButtonIsLink &&
						<ToggleControl
							label={__('Show button as link', 'test-theme')}
							checked={buttonIsLink}
							onChange={(value) => setAttributes({ [`${componentName}IsLink`]: value })}
							help={__('When checked button will be converted to link style.', 'test-theme')}
						/>
					}

					{showButtonSize &&
						<SelectControl
							label={
								<>
									<Icon icon={icons.size} />
									{__('Size', 'test-theme')}
								</>
							}
							value={buttonSize}
							options={getOptions(manifest, componentName, 'size', options)}
							onChange={(value) => setAttributes({ [`${componentName}Size`]: value })}
						/>
					}

					{(showButtonWidth && !buttonIsLink) &&
						<SelectControl
							label={
								<>
									<Icon icon={icons.width} />
									{__('Width', 'test-theme')}
								</>
							}
							value={buttonWidth}
							options={getOptions(manifest, componentName, 'width', options)}
							onChange={(value) => setAttributes({ [`${componentName}Width`]: value })}
						/>
					}

					{showButtonIsAnchor &&
						<ToggleControl
							label={__('Anchor', 'test-theme')}
							checked={buttonIsAnchor}
							onChange={(value) => setAttributes({ [`${componentName}IsAnchor`]: value })}
							help={__('Using anchor option will add JavaScript selector to the button. You must provide anchor destination inside Button Url field. Example: #super-block.', 'test-theme')}
						/>
					}

					{showButtonId &&
						<TextControl
							label={
								<>
									<Icon icon={icons.id} />
									{__('ID', 'test-theme')}
								</>
							}
							value={buttonId}
							onChange={(value) => setAttributes({ [`${componentName}Id`]: value })}
						/>
					}
				</>
			}

		</>
	);
};
