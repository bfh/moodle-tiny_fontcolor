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
 * Adds the defined colours to the editor's shared colour palette (color_map) for tiny_fontcolor.
 *
 * @module      tiny_fontcolor
 * @copyright   2023 Luca Bösch <luca.boesch@bfh.ch>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getForecolorMap, getBackcolorMap, isAddToPaletteOn} from './options';

const colorMapOption = 'color_map';

/**
 * Build a flat [value, name, ...] colour map from the given colour entries, skipping duplicate values.
 *
 * The color_map option reads back as objects but its processor only accepts a flat array of strings,
 * so we rebuild the flat form and let the processor recreate the objects.
 *
 * @param {...object[]} sources Arrays of colours, each entry {value, text}.
 * @returns {string[]} A flat colour map for the color_map option.
 */
const buildColorMap = (...sources) => {
    const flat = [];
    const seen = new Set();
    sources.flat().forEach(({value, text}) => {
        const key = String(value).toUpperCase();
        if (!seen.has(key)) {
            seen.add(key);
            flat.push(value, text);
        }
    });
    return flat;
};

/**
 * Add the defined colours to the editor's shared colour palette when the setting is enabled.
 *
 * @param {TinyMCE.Editor} editor
 */
export const setup = (editor) => {
    if (!isAddToPaletteOn(editor)) {
        return;
    }
    editor.on('init', () => {
        const colors = getForecolorMap(editor).concat(getBackcolorMap(editor));
        if (colors.length) {
            editor.options.set(colorMapOption, buildColorMap(editor.options.get(colorMapOption), colors));
        }
    });
};
