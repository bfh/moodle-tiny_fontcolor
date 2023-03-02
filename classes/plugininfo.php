<?php
// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Tiny BFH Font colour plugin for Moodle.
 *
 * @package     tiny_bfhfontcolor
 * @copyright   2023 Luca Bösch <luca.boesch@bfh.ch>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace tiny_bfhfontcolor;

use context;
use editor_tiny\editor;
use editor_tiny\plugin;
use editor_tiny\plugin_with_menuitems;
use editor_tiny\plugin_with_buttons;
use editor_tiny\plugin_with_configuration;

/**
 * BFH Font colour plugin.
 *
 * @package     tiny_bfhfontcolor
 * @copyright   2023 Luca Bösch <luca.boesch@bfh.ch>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class plugininfo extends plugin implements plugin_with_menuitems, plugin_with_buttons, plugin_with_configuration {

    /**
     * Get a list of the menu items provided by this plugin.
     *
     * @return string[]
     */
    public static function get_available_menuitems(): array {
        return [
            'tiny_bfhfontcolor/bfh_forecolor',
            'tiny_bfhfontcolor/bfh_backcolor',
        ];
    }

    /**
     * Get a list of the buttons provided by this plugin.
     * @return string[]
     */
    public static function get_available_buttons(): array
    {
        return [
            'tiny_bfhfontcolor/bfh_forecolor',
            'tiny_bfhfontcolor/bfh_backcolor',
        ];
    }

    /**
     * @param context $context
     * @param array $options
     * @param array $fpoptions
     * @param editor|null $editor
     * @return array
     * @throws \dml_exception
     */
    public static function get_plugin_configuration_for_context(context $context, array $options, array $fpoptions,
                                                                ?editor $editor = null): array {

        $config = [];
        foreach (['tinytextcolors', 'tinytextbackgroundcolors'] as $configfield) {
            $data = json_decode(get_config('tiny_bfhfontcolor', $configfield), true);
            if (!\is_array($data)) {
                $data = [];
            }
            $array = [];
            foreach ($data as $item) {
                $name = trim($item['name']);
                $value = trim($item['value']);
                if (!empty($name) && !empty($value) && preg_match('/^#?[0-9a-f]$/', $value) !== false) {
                    $array[] = $value;
                    $array[] = $name;
                }
            }
            $config[$configfield] = $array;
        }

        $config['tinytextcolorpicker'] = (bool)get_config('tiny_bfhfontcolor', 'tinytextcolorpicker');
        $config['tinytextbackgroundcolorpicker'] = (bool)get_config('tiny_bfhfontcolor', 'tinytextbackgroundcolorpicker');

        return $config;
    }
}
