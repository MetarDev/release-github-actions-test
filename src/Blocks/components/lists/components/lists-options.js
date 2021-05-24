import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, Icon, ToggleControl } from '@wordpress/components';
import { icons, getOptionColors } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

export const ListsOptions = (attributes) => {
	const {
		componentName: manifestComponentName,
		title: manifestTitle,
		options: manifestOptions,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		label = manifestTitle,
		options = manifestOptions,
		listsShowControls = true,

		listsUse = checkAttr('listsUse', attributes, manifest, componentName),

		listsColor = checkAttr('listsColor', attributes, manifest, componentName),
		listsSize = checkAttr('listsSize', attributes, manifest, componentName),

		showListsColor = true,
		showListsSize = true,
	} = attributes;

	if (!listsShowControls) {
		return null;
	}

	return (
		<>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			<ToggleControl
				label={sprintf(__('Use %s', 'test-theme'), label)}
				checked={listsUse}
				onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
			/>

			{listsUse &&
				<>
					{showListsColor &&
						<ColorPaletteCustom
							label={
								<>
									<Icon icon={icons.color} />
									{__('Color', 'test-theme')}
								</>
							}
							colors={getOptionColors(options.colors)}
							value={listsColor}
							onChange={(value) => setAttributes({ [`${componentName}Color`]: value })}
						/>
					}

					{showListsSize &&
						<SelectControl
							label={
								<>
									<Icon icon={icons.textSize} />
									{__('Text size', 'test-theme')}
								</>
							}
							value={listsSize}
							options={options.sizes}
							onChange={(value) => setAttributes({ [`${componentName}Size`]: value })}
						/>
					}
				</>
			}

		</>
	);
};
