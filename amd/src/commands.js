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
 * Commands helper for the Moodle tiny_bfhfontcolor plugin.
 *
 * @module      tiny_bfhfontcolor/commands
 * @copyright   2023 Luca Bösch <luca.boesch@bfh.ch>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {register$c, isArrayOf, isString, mapColors} from "./colorswat";


/**
 * Get the setup function for the buttons.
 *
 * This is performed in an async function which ultimately returns the registration function as the
 * Tiny.AddOnManager.Add() function does not support async functions.
 *
 * @returns {function} The registration function to call within the Plugin.add function.
 */
export const getSetup = async() => {
    const color_map = [
        '000000', 'Black',
        '808080', 'Gray',
        'FFFFFF', 'White',
        'FF0000', 'Red',
        'FFFF00', 'Yellow',
        '008000', 'Green',
        '0000FF', 'Blue'
    ];

    const color_map_backcolor = [
        '000000', 'Black',
        '808080', 'Gray',
        'FFFFFF', 'White',
        '008000', 'Green',
        '0000FF', 'Blue'
    ];

    return (editor) => {
        editor.options.set('custom_colors', false);
        editor.options.set('color_map', color_map);
        editor.options.register('color_map_background', {
            processor: value => {
                if (isArrayOf(value, isString)) {
                    return {
                        value: mapColors(value),
                        valid: true
                    };
                } else {
                    return {
                        valid: false,
                        message: 'Must be an array of strings.'
                    };
                }
            },
            default: color_map_backcolor,
        });

        editor.options.set('color_map_background', color_map_backcolor);
        register$c(editor);

    };
};
