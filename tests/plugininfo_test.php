<?php
// This file is part of Moodle - http://moodle.org/
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
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

namespace tiny_fontcolor;

use context_system;

/**
 * Unit tests for the editor configuration produced by the fontcolor plugin.
 *
 * @package    tiny_fontcolor
 * @category   test
 * @copyright  2026 Kristian
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class plugininfo_test extends \advanced_testcase {
    /**
     * Set up.
     */
    public function setUp(): void {
        parent::setUp();
        $this->resetAfterTest();
    }

    /**
     * The add-to-palette setting must reach the editor configuration so the client can
     * decide whether to add the defined colours to the shared colour palette.
     *
     * @covers \tiny_fontcolor\plugininfo::get_plugin_configuration_for_context
     */
    public function test_addtopalette_enabled_is_passed_to_configuration(): void {
        set_config('addtopalette', 1, 'tiny_fontcolor');

        $config = plugininfo::get_plugin_configuration_for_context(context_system::instance(), [], []);

        $this->assertTrue($config['addtopalette']);
    }

    /**
     * When the setting is off (its default) the configuration must report it disabled, so
     * the shared palette is left untouched.
     *
     * @covers \tiny_fontcolor\plugininfo::get_plugin_configuration_for_context
     */
    public function test_addtopalette_defaults_to_disabled(): void {
        $config = plugininfo::get_plugin_configuration_for_context(context_system::instance(), [], []);

        $this->assertFalse($config['addtopalette']);
    }

    /**
     * The defined colours must reach the configuration as a flat [value, name, ...] list,
     * which is the shape the client maps onto the colour pickers.
     *
     * @covers \tiny_fontcolor\plugininfo::get_plugin_configuration_for_context
     */
    public function test_defined_colours_are_passed_as_flat_lists(): void {
        set_config('textcolors', json_encode([['name' => 'Brand navy', 'value' => '#404e8b']]), 'tiny_fontcolor');
        set_config('backgroundcolors', json_encode([['name' => 'Brand sky', 'value' => '#aee1ff']]), 'tiny_fontcolor');

        $config = plugininfo::get_plugin_configuration_for_context(context_system::instance(), [], []);

        $this->assertSame(['#404E8B', 'Brand navy'], $config['textcolors']);
        $this->assertSame(['#AEE1FF', 'Brand sky'], $config['backgroundcolors']);
    }
}
