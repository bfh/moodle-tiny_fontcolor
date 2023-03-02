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
 * Locallib for the bfhfontcolor features.
 *
 * @package     tiny_bfhfontcolor
 * @copyright   2023 Luca Bösch <luca.boesch@bfh.ch>
 * @copyright   2023 Stephan Robotta <stephan.robotta@bfh.ch>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/** Course enrol instance enabled. (used in enrol->status) */
define('TINYTEXTCOLORPICKER_DISABLED', 0);

/** Course enrol instance disabled, user may enter course if other enrol instance enabled. (used in enrol->status)*/
define('TINYTEXTCOLORPICKER_ENABLED', 1);

/** User is active participant (used in user_enrolments->status)*/
define('TINYTEXTBACKGROUNDCOLORPICKER_DISABLED', 0);

/** User participation in course is suspended (used in user_enrolments->status) */
define('TINYTEXTBACKGROUNDCOLORPICKER_ENABLED', 1);

