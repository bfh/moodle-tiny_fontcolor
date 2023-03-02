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

/**
 * Class that allow configuring a bfhfontcolor color list.
 *
 * @package     tiny_bfhfontcolor
 * @copyright   2023 Luca Bösch <luca.boesch@bfh.ch>
 * @copyright   2023 Stephan Robotta <stephan.robotta@bfh.ch>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace tiny_bfhfontcolor;

use admin_setting_configtext;
use core\uuid;

/**
 * BFH Font colour plugin color config utility.
 *
 * @package     tiny_bfhfontcolor
 * @copyright   2023 Luca Bösch <luca.boesch@bfh.ch>
 * @copyright   2023 Stephan Robotta <stephan.robotta@bfh.ch>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class admin_setting_colorlist extends admin_setting_configtext {

    /**
     * Return an XHTML string for the setting
     * @param mixed $data
     * @param string $query
     * @return string Returns an XHTML string
     * @throws \coding_exception
     */
    public function output_html($data, $query='') {
        global $OUTPUT;

        $colors = json_decode($data, true);
        if (!is_array($colors)) {
            $colors = [];
        }
        $colors[] = [
            'name' => '',
            'value' => '',
        ];

        $default = $this->get_defaultsetting();
        $context = (object) [
            'header' => [
                'name' => get_string('tinyplaceholdercolorname', 'tiny_bfhfontcolor'),
                'value' => get_string('tinyplaceholdercolorvalue', 'tiny_bfhfontcolor'),
            ],
            'id' => $this->get_id(),
            'name' => $this->get_full_name(),
            'forceltr' => $this->get_force_ltr(),
            'readonly' => $this->is_readonly(),
            'size' => $this->size,
            'colors' => [],
        ];

        foreach (\array_keys($colors) as $i) {
            $row = [];
            foreach (['name', 'value'] as $field) {
                $suffix = '_' . $field . '_' . ($i + 1);
                $row[$field] = (object)[
                    'id' => $this->get_id() . $suffix,
                    'name' => $this->get_full_name() . $suffix,
                    'value' => $colors[$i][$field] ?? '',
                    'last' => $i + 1 === count($colors),
                ];
            }
            $context->colors[] = $row;
        }
        $html = $OUTPUT->render_from_template('tiny_bfhfontcolor/settings_config_color', $context);

        return format_admin_setting($this, $this->visiblename, $html, $this->description, true, '', $default, $query);
    }

    /**
     * Write the config setting.
     * Here we need to translate the rows of color names and values into a single json.
     * @param string $name
     * @param string $value
     * @return bool
     */
    public function config_write($name, $value) {
        $colors = [];
        $names = [];
        $values = [];
        foreach ($_REQUEST as $key => $val) {
            if (str_contains($key, $name . '_name_') !== false) {
                $num = (int)substr($key, strrpos($key, '_') + 1);
                $names[$num] = trim($val);
            } else if (str_contains($key, $name . '_value_') !== false) {
                $num = (int)substr($key, strrpos($key, '_') + 1);
                $values[$num] = trim($val);
            }
        }
        foreach (\array_keys($names) as $i) {
            if (isset($values[$i]) && !empty($names[$i]) && !empty($values[$i])) {
                $colors[] = [
                    'name' => $names[$i],
                    'value' => $values[$i],
                ];
            }
        }
        return parent::config_write($name, json_encode($colors));
    }
}
