<?php

/**
 * Template for the Paragraph Block view.
 *
 * @package ReleaseGithubActionsTest
 */

use ReleaseGithubActionsTest\Blocks\Blocks;
use ReleaseGithubActionsTestVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);
$blockName = $attributes['blockName'] ?? $manifest['blockName'];

$blockClass =  Components::checkAttr('blockClass', $attributes, $manifest);

$unique = Components::getUnique();
echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped

?>

<div class="<?php echo esc_attr($blockClass); ?>" data-id="<?php echo \esc_attr($unique); ?>">
	<?php
	echo Components::render( // phpcs:ignore Eightshift.Security.EscapeOutput.OutputNotEscaped
		'paragraph',
		Blocks::props($attributes, $blockName, '', true)
	);
	?>
</div>
