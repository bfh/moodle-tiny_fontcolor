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

import {getButtonImage} from 'editor_tiny/utils';
import {get_string as getString} from 'core/str';
import {
    component,
} from './common';

/**
 * Handle the action for your plugin.
 * @param {TinyMCE.editor} editor The tinyMCE editor instance.
 * @param {string} texttype whether fg or bg color change to apply
 */
const handleAction = (editor, texttype) => {
    // TODO Handle the action.
    window.console.log(editor);
    window.console.log(texttype);
};

/**
 * Get the setup function for the buttons.
 *
 * This is performed in an async function which ultimately returns the registration function as the
 * Tiny.AddOnManager.Add() function does not support async functions.
 *
 * @returns {function} The registration function to call within the Plugin.add function.
 */
export const getSetup = async() => {
    const [
        menuItemFgcolor,
        menuItemBgcolor,
    ] = await Promise.all([
        getString('menuItemBgcolor'),
        getString('menuItemFgcolor'),
    ]);

    return (editor) => {
        editor.ui.registry.addMenuItem(menuItemFgcolor, {
            icon: getButtonImage('text-color'),
            text: menuItemFgcolor,
            onAction: () => handleAction(editor, 'fgcolor'),
        });
        editor.ui.registry.addMenuItem(menuItemFgcolor, {
            icon: getButtonImage('highlight-bg-color'),
            text: menuItemBgcolor,
            onAction: () => handleAction(editor, 'bgcolor'),
        });

    };
};
