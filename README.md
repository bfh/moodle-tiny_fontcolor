moodle-tiny_fontcolor
========================

![Release](https://img.shields.io/badge/Release-0.3-blue.svg)
[![Moodle Plugin CI](https://github.com/bfh/moodle-tiny_fontcolor/workflows/Moodle%20Plugin%20CI/badge.svg?branch=master)](https://github.com/bfh/moodle-tiny_fontcolor/actions?query=workflow%3A%22Moodle+Plugin+CI%22+branch%3Amaster)
[![PHP Support](https://img.shields.io/badge/php-7.4--8.2-blue)](https://github.com/bfh/moodle-tiny_fontcolor/action)
[![Moodle Support](https://img.shields.io/badge/Moodle-4.1+-orange)](https://github.com/bfh/moodle-tiny_fontcolor/actions)
[![License GPL-3.0](https://img.shields.io/github/license/bfh/moodle-tiny_fontcolor?color=lightgrey)](https://github.com/bfh/moodle-tiny_fontcolor/blob/main/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/bfh/moodle-tiny_fontcolor)](https://github.com/bfh/moodle-tiny_fontcolor/graphs/contributors)

## Installation

- Unzip the contents of the zip archive into the Moodle `.../lib/editor/tiny/plugins/fontcolor` directory.
- As a Moodle Admin go to Site Administration -> Plugins -> Text Editors -> TinyMCE editor -> Tiny text color/text background color settings
and add a view color names and color codes for at least on of the setting "Available text colors" or "Available text background colors".
- You may also enable the color picker for text color or background color.
 
If no colors are available and the color picker is disabled then the
menu item and button in the TinyMCE editor will not appear. This is valid for both,
the text color setting and the background color setting.

The color name can be an arbitrary string e.g. Red or Dark Green or whatever you name
your color. The name can be also the "corporate name" e.g. that is used in any style guides
of the corporate identity at your institution.

## Version History

### 0.3
- Fix CI issue: (#1) HTML Validation info, line 10: Trailing slash on void elements has no effect and interacts badly with unquoted attribute values.
- [Fix behat by switching to trait class](https://github.com/bfh/moodle-tiny_fontcolor/pull/12)
by [Jason Platts](https://github.com/jason-platts)
- [Preparing for PHP 8.2 Support](https://github.com/bfh/moodle-tiny_fontcolor/pull/13)
by [Luca Bösch](https://github.com/lucaboesch)
- Lifted software maturity to stable

### 0.2.3
- Lift software maturity level to RC.
- Fix issue [The close button of the color picker can't be reach by keyboard](https://github.com/bfh/moodle-tiny_fontcolor/issues/10)

### 0.2.2

- Lift software maturity level to STABLE.
- Adapt CI to test against Moodle 4.2.
- Fix example JSON in mustache templates and make CI have templates checked.
- Fix issue [Probably, $string['helplinktext'] = 'Font colour'; is needed in the lang strings](https://github.com/bfh/moodle-tiny_fontcolor/issues/6).

### 0.2.1

- Add behat test for the admin settings page and reorganize tests.
- Remove function `str_contains` to be PHP7.x compliant.
- Change maturity of plugin to release candidate.
- Privacy Provider was added.

### 0.2.0
Initial release
