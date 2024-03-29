import React from 'react';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { LinkToolbarButton } from '@eightshift/frontend-libs/scripts/components';
import { useRef } from '@wordpress/element';
import manifest from './../manifest.json';

export const ButtonToolbar = (attributes) => {
	const {
		title: manifestTitle,
		componentName: manifestComponentName,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		label = manifestTitle,
		buttonShowControls = true,

		buttonUse = checkAttr('buttonUse', attributes, manifest, componentName),
		buttonUrl = checkAttr('buttonUrl', attributes, manifest, componentName),
		buttonIsNewTab = checkAttr('buttonIsNewTab', attributes, manifest, componentName),

		showButtonUrl = true,
	} = attributes;

	if (!buttonShowControls) {
		return null;
	}

	const ref = useRef();

	return (
		<>
			{buttonUse &&
				<>
					{showButtonUrl &&
						<LinkToolbarButton
							componentName={componentName}
							url={buttonUrl}
							opensInNewTab={buttonIsNewTab}
							setAttributes={setAttributes}
							anchorRef={ref}
							title={label}
							textDomain={'test-theme'}
						/>
					}
				</>
			}
		</>
	);
};
