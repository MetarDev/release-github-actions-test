import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { ButtonToolbar as ButtonToolbarComponent } from '../../../components/button/components/button-toolbar';
import manifest from './../manifest.json';

export const ButtonToolbar = ({ attributes, setAttributes }) => {
	const {
		blockName,
		title: manifestTitle,
		options: manifestOptions,
	} = manifest;

	const {
		buttonAlign = checkAttr('buttonAlign', attributes, manifest),
	} = attributes;

	return (
		<>
			<ButtonToolbarComponent
				setAttributes={setAttributes}
				{...props(attributes, blockName, '', true)}
			/>

			<AlignmentToolbar
				value={buttonAlign}
				options={manifestOptions.buttonAlign}
				label={sprintf(__('%s button align', 'test-theme'), manifestTitle)}
				onChange={(value) => setAttributes({ 'buttonAlign': value })}
			/>

		</>
	);
};
