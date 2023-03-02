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
 * Color palette setter for BFH Fontcolor plugin.
 *
 * @module      tiny_equation/options
 * @copyright   2023 Luca Bösch <luca.boesch@bfh.ch>
 * @copyright   2023 Stephan Robotta <stephan.robotta@bfh.ch>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

// ESLint directives.

import {getBackcolorMap, getForecolorMap, isBackcolorPickerOn, isForecolorPickerOn} from "./options";

const hasProto = (v, constructor, predicate) => {
  if (predicate(v, constructor.prototype)) {
    return true;
  } else {
    return v.constructor?.name === constructor.name;
  }
};
const typeOf = x => {
  const t = typeof x;
  if (x === null) {
    return 'null';
  } else if (t === 'object' && Array.isArray(x)) {
    return 'array';
  } else if (t === 'object' && hasProto(x, String, (o, proto) => proto.isPrototypeOf(o))) {
    return 'string';
  } else {
    return t;
  }
};
const eq$1 = t => a => t === a;
const isType$1 = type => value => typeOf(value) === type;
const isString = isType$1('string');
const isArray = isType$1('array');
const isUndefined = eq$1(undefined);
const isNullable = a => a === null || a === undefined;
const isNonNullable = a => !isNullable(a);
const isArrayOf = (value, pred) => {
  if (isArray(value)) {
    for (let i = 0, len = value.length; i < len; ++i) {
      if (!pred(value[i])) {
        return false;
      }
    }
    return true;
  }
  return false;
};
const nativeIndexOf = Array.prototype.indexOf;
const rawIndexOf = (ts, t) => nativeIndexOf.call(ts, t);
const indexOf = (xs, x) => {
  const r = rawIndexOf(xs, x);
  return r === -1 ? Optional.none() : Optional.some(r);
};
const noop = () => {
  // Do nothing.
};

class Optional {
  constructor(tag, value) {
    this.tag = tag;
    this.value = value;
  }

  static some(value) {
    return new Optional(true, value);
  }

  static none() {
    return Optional.singletonNone;
  }

  fold(onNone, onSome) {
    if (this.tag) {
      return onSome(this.value);
    } else {
      return onNone();
    }
  }

  isSome() {
    return this.tag;
  }

  isNone() {
    return !this.tag;
  }

  map(mapper) {
    if (this.tag) {
      return Optional.some(mapper(this.value));
    } else {
      return Optional.none();
    }
  }

  bind(binder) {
    if (this.tag) {
      return binder(this.value);
    } else {
      return Optional.none();
    }
  }

  exists(predicate) {
    return this.tag && predicate(this.value);
  }

  forall(predicate) {
    return !this.tag || predicate(this.value);
  }

  filter(predicate) {
    if (!this.tag || predicate(this.value)) {
      return this;
    } else {
      return Optional.none();
    }
  }

  getOr(replacement) {
    return this.tag ? this.value : replacement;
  }

  or(replacement) {
    return this.tag ? this : replacement;
  }

  getOrThunk(thunk) {
    return this.tag ? this.value : thunk();
  }

  orThunk(thunk) {
    return this.tag ? this : thunk();
  }

  getOrDie(message) {
    if (!this.tag) {
      throw new Error(message ?? 'Called getOrDie on None');
    } else {
      return this.value;
    }
  }

  static from(value) {
    return isNonNullable(value) ? Optional.some(value) : Optional.none();
  }

  getOrNull() {
    return this.tag ? this.value : null;
  }

  getOrUndefined() {
    return this.value;
  }

  each(worker) {
    if (this.tag) {
      worker(this.value);
    }
  }

  toArray() {
    return this.tag ? [this.value] : [];
  }

  toString() {
    return this.tag ? `some(${this.value})` : 'none()';
  }
}

Optional.singletonNone = new Optional(false);

const contains$1 = (str, substr, start = 0, end) => {
  const idx = str.indexOf(substr, start);
  if (idx !== -1) {
    return isUndefined(end) ? true : idx + substr.length <= end;
  } else {
    return false;
  }
};
const removeFromStart = (str, numChars) => {
  return str.substring(numChars);
};

const toHex = component => {
  const hex = component.toString(16);
  return (hex.length === 1 ? '0' + hex : hex).toUpperCase();
};
const fromRgba = rgbaColour => {
  const value = toHex(rgbaColour.red) + toHex(rgbaColour.green) + toHex(rgbaColour.blue);
  return hexColour(value);
};
const rgbRegex = /^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i;
const rgbaRegex = /^\s*rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?(?:\.\d+)?)\s*\)\s*$/i;
const fromStringValues = (red, green, blue, alpha) => {
  const r = parseInt(red, 10);
  const g = parseInt(green, 10);
  const b = parseInt(blue, 10);
  const a = parseFloat(alpha);
  return rgbaColour(r, g, b, a);
};
const fromString = rgbaString => {
  if (rgbaString === 'transparent') {
    return Optional.some(rgbaColour(0, 0, 0, 0));
  }
  const rgbMatch = rgbRegex.exec(rgbaString);
  if (rgbMatch !== null) {
    return Optional.some(fromStringValues(rgbMatch[1], rgbMatch[2], rgbMatch[3], '1'));
  }
  const rgbaMatch = rgbaRegex.exec(rgbaString);
  if (rgbaMatch !== null) {
    return Optional.some(fromStringValues(rgbaMatch[1], rgbaMatch[2], rgbaMatch[3], rgbaMatch[4]));
  }
  return Optional.none();
};
const removeLeading = (str, prefix) => {
  return startsWith(str, prefix) ? removeFromStart(str, prefix.length) : str;
};

const checkRange = (str, substr, start) =>
  substr === '' || str.length >= substr.length && str.substr(start, start + substr.length) === substr;

const hexColour = value => ({value});
const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const isHexString = hex => shorthandRegex.test(hex) || longformRegex.test(hex);
const normalizeHex = hex => removeLeading(hex, '#').toUpperCase();
const fromString$1 = hex => isHexString(hex) ? Optional.some({value: normalizeHex(hex)}) : Optional.none();
const startsWith = (str, prefix) => {
  return checkRange(str, prefix, 0);
};
const anyToHex = color => fromString$1(color).orThunk(() => fromString(color).map(fromRgba)).getOrThunk(() => {
  const canvas = document.createElement('canvas');
  canvas.height = 1;
  canvas.width = 1;
  const canvasContext = canvas.getContext('2d');
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = '#FFFFFF';
  canvasContext.fillStyle = color;
  canvasContext.fillRect(0, 0, 1, 1);
  const rgba = canvasContext.getImageData(0, 0, 1, 1).data;
  const r = rgba[0];
  const g = rgba[1];
  const b = rgba[2];
  const a = rgba[3];
  return fromRgba(rgbaColour(r, g, b, a));
});
const rgbaColour = (red, green, blue, alpha) => ({
  red,
  green,
  blue,
  alpha
});

// eslint-disable-next-line
let global$4 = tinymce.util.Tools.resolve('tinymce.util.LocalStorage');

const map$2 = (xs, f) => {
  const len = xs.length;
  const r = new Array(len);
  for (let i = 0; i < len; i++) {
    const x = xs[i];
    r[i] = f(x, i);
  }
  return r;
};

const Cell = initial => {
  let value = initial;
  const get = () => {
    return value;
  };
  const set = v => {
    value = v;
  };
  return {
    get,
    set
  };
};

const fireTextColorChange = (editor, data) => {
  editor.dispatch('TextColorChange', data);
};

const storageName = 'tinymce-custom-colors';
const ColorCache = (max = 10, suffix = '') => {
  const storageString = global$4.getItem(storageName + suffix);
  const localstorage = isString(storageString) ? JSON.parse(storageString) : [];
  const prune = list => {
    const diff = max - list.length;
    return diff < 0 ? list.slice(0, max) : list;
  };
  const cache = prune(localstorage);
  const add = key => {
    indexOf(cache, key).each(remove);
    cache.unshift(key);
    if (cache.length > max) {
      cache.pop();
    }
    global$4.setItem(storageName, JSON.stringify(cache));
  };
  const remove = idx => {
    cache.splice(idx, 1);
  };
  const state = () => cache.slice(0);
  return {
    add,
    state
  };
};

// eslint-disable-next-line
const colorCache = ColorCache(10);
// eslint-disable-next-line
const colorCacheBg = ColorCache(10, '-background');
const mapColors = colorMap => {
  const colors = [];
  for (let i = 0; i < colorMap.length; i += 2) {
    colors.push({
      text: colorMap[i + 1],
      value: '#' + anyToHex(colorMap[i]).value,
      type: 'choiceitem'
    });
  }
  return colors;
};
const option$1 = name => editor => editor.options.get(name);

const getColorCols$1 = option$1('color_cols');
const getColors$3 = (editor, name) => {
  if (name === 'bfh_forecolor') {
    return getForecolorMap(editor);
  }
  return getBackcolorMap(editor);
};
const getCurrentColors = (type) => map$2(type === 'bfh_forecolor' ? colorCache.state() : colorCacheBg.state(), color => ({
  type: 'choiceitem',
  text: color,
  value: color
}));
const addColor = color => {
  colorCache.add(color);
};

const fallbackColor = '#000000';
const hasStyleApi = node => isNonNullable(node.style);
const getCurrentColor = (editor, format) => {
  let color;
  editor.dom.getParents(editor.selection.getStart(), elm => {
    const value = hasStyleApi(elm) ? elm.style[format === 'bfh_forecolor' ? 'color' : 'backgroundColor'] : null;
    if (value) {
      color = color ? color : value;
    }
  });
  return Optional.from(color);
};
const applyFormat = (editor, format, value) => {
  editor.undoManager.transact(() => {
    editor.focus();
    editor.formatter.apply(format, {value});
    editor.nodeChanged();
  });
};
const removeFormat = (editor, format) => {
  editor.undoManager.transact(() => {
    editor.focus();
    editor.formatter.remove(format, {value: null}, undefined, true);
    editor.nodeChanged();
  });
};
const registerCommands = editor => {
  editor.addCommand('mceApplyTextcolor', (format, value) => {
    applyFormat(editor, format, value);
  });
  editor.addCommand('mceRemoveTextcolor', format => {
    removeFormat(editor, format);
  });
};
const getAdditionalColors = hasCustom => {
  const type = 'choiceitem';
  const remove = {
    type,
    text: 'Remove color',
    icon: 'color-swatch-remove-color',
    value: 'remove'
  };
  const custom = {
    type,
    text: 'Custom color',
    icon: 'color-picker',
    value: 'custom'
  };
  return hasCustom ? [
    remove,
    custom
  ] : [remove];
};
const applyColor = (editor, format, value, onChoice) => {
  if (value === 'custom') {
    const dialog = colorPickerDialog(editor);
    dialog(colorOpt => {
      colorOpt.each(color => {
        addColor(color);
        editor.execCommand('mceApplyTextcolor', format, color);
        onChoice(color);
      });
    }, fallbackColor);
  } else if (value === 'remove') {
    onChoice('');
    editor.execCommand('mceRemoveTextcolor', format);
  } else {
    onChoice(value);
    editor.execCommand('mceApplyTextcolor', format, value);
  }
};
const getColors$1 = (colors, hasCustom, type) => colors.concat(getCurrentColors(type).concat(getAdditionalColors(hasCustom)));
const getFetch$1 = (colors, hasCustom, type) => callback => {
  callback(getColors$1(colors, hasCustom, type));
};
const setIconColor = (splitButtonApi, name, newColor) => {
  const id = name === 'bfh_forecolor' ? 'tox-icon-text-color__color' : 'tox-icon-highlight-bg-color__color';
  splitButtonApi.setIconFill(id, newColor);
};
const registerTextColorButton = (editor, name, format, tooltip, lastColor) => {
  let iconName, hasCustom;
  if (name === 'bfh_forecolor') {
    iconName = 'text-color';
    hasCustom = isForecolorPickerOn(editor);
  } else {
    iconName = 'highlight-bg-color';
    hasCustom = isBackcolorPickerOn(editor);
  }
  editor.ui.registry.addSplitButton(name, {
    tooltip,
    presets: 'color',
    icon: iconName,
    select: value => {
      const optCurrentRgb = getCurrentColor(editor, format);
      return optCurrentRgb.bind(currentRgb => fromString(currentRgb).map(rgba => {
        const currentHex = fromRgba(rgba).value;
        return contains$1(value.toLowerCase(), currentHex);
      })).getOr(false);
    },
    columns: getColorCols$1(editor),
    fetch: getFetch$1(getColors$3(editor, name), hasCustom, name),
    onAction: () => {
      applyColor(editor, format, lastColor.get(), noop);
    },
    onItemAction: (_splitButtonApi, value) => {
      applyColor(editor, format, value, newColor => {
        lastColor.set(newColor);
        fireTextColorChange(editor, {
          name,
          color: newColor
        });
      });
    },
    onSetup: splitButtonApi => {
      setIconColor(splitButtonApi, name, lastColor.get());
      const handler = e => {
        if (e.name === name) {
          setIconColor(splitButtonApi, e.name, e.color);
        }
      };
      editor.on('TextColorChange', handler);
      return () => {
        editor.off('TextColorChange', handler);
      };
    }
  });
};
const registerTextColorMenuItem = (editor, name, format, text) => {
  editor.ui.registry.addNestedMenuItem(name, {
    text,
    icon: name === 'bfh_forecolor' ? 'text-color' : 'highlight-bg-color',
    getSubmenuItems: () => [{
      type: 'fancymenuitem',
      fancytype: 'colorswatch',
      initData: {
        allowCustomColors: name === 'bfh_forecolor' ? isForecolorPickerOn(editor) : isBackcolorPickerOn(editor),
        colors: getColors$3(editor, name),
      },
      onAction: data => {
        applyColor(editor, format, data.value, noop);
      }
    }]
  });
};
const colorPickerDialog = editor => (callback, value) => {
  let isValid = false;
  const onSubmit = api => {
    const data = api.getData();
    const hex = data.colorpicker;
    if (isValid) {
      callback(Optional.from(hex));
      api.close();
    } else {
      editor.windowManager.alert(editor.translate([
        'Invalid hex color code: {0}',
        hex
      ]));
    }
  };
  const onAction = (_api, details) => {
    if (details.name === 'hex-valid') {
      isValid = details.value;
    }
  };
  const initialData = {colorpicker: value};
  editor.windowManager.open({
    title: 'Color Picker',
    size: 'normal',
    body: {
      type: 'panel',
      items: [{
        type: 'colorpicker',
        name: 'colorpicker',
        label: 'Color'
      }]
    },
    buttons: [
      {
        type: 'cancel',
        name: 'cancel',
        text: 'Cancel'
      },
      {
        type: 'submit',
        name: 'save',
        text: 'Save',
        primary: true
      }
    ],
    initialData,
    onAction,
    onSubmit,
    onClose: noop,
    onCancel: () => {
      callback(Optional.none());
    }
  });
};
const register$c = editor => {
  if (!isForecolorPickerOn(editor) && !isBackcolorPickerOn(editor)
    && getForecolorMap(editor).length === 0 && getBackcolorMap(editor).length === 0) {
    return;
  }
  registerCommands(editor);
  if (isForecolorPickerOn(editor) || getForecolorMap(editor).length > 0) {
    // eslint-disable-next-line
    const lastForeColor = Cell(fallbackColor);
    registerTextColorButton(editor, 'bfh_forecolor', 'forecolor', 'Text color', lastForeColor);
    registerTextColorMenuItem(editor, 'bfh_forecolor', 'forecolor', 'Text color');
  }
  if (isBackcolorPickerOn(editor) || getBackcolorMap(editor).length > 0) {
    // eslint-disable-next-line
    const lastBackColor = Cell(fallbackColor);
    registerTextColorButton(editor, 'bfh_backcolor', 'hilitecolor', 'Background color', lastBackColor);
    registerTextColorMenuItem(editor, 'bfh_backcolor', 'hilitecolor', 'Background color');
  }
};

export {
  registerTextColorButton,
  register$c,
  isArrayOf,
  isString,
  mapColors
};