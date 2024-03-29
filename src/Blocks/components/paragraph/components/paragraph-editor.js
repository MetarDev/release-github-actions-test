import React from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { pasteInto, outputCssVariables, getUnique } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ParagraphEditor = (attributes) => {
	const unique = getUnique();

	const {
		componentName: manifestComponentName,
		componentClass: manifestComponentClass,
		options: manifestOptions,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		componentClass = manifestComponentClass,
		options = manifestOptions,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'test-theme'),

		onSplit,
		mergeBlocks,
		onReplace,
		onRemove,

		paragraphUse = checkAttr('paragraphUse', attributes, manifest, componentName),

		paragraphContent = checkAttr('paragraphContent', attributes, manifest, componentName),
	} = attributes;

	const paragraphClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{paragraphUse &&
				<>
					{outputCssVariables(attributes, manifest, unique, globalManifest)}
					<RichText
						identifier={`${componentName}Content`}
						className={paragraphClass}
						placeholder={placeholder}
						value={paragraphContent}
						onChange={(value) => {
							setAttributes({ [`${componentName}Content`]: value })
						}}
						allowedFormats={['core/bold', 'core/link', 'core/italic']}
						onSplit={onSplit}
						onMerge={mergeBlocks}
						onReplace={onReplace}
						onRemove={onRemove}
						onPaste={(event) => pasteInto(event, attributes, setAttributes, options.pasteAllowTags, 'p')}
						deleteEnter={true}
						data-id={unique}
					/>
				</>
			}
		</>
	);
};
