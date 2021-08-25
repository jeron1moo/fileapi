import produce from 'immer';
import {
  SET_DIR,
  SET_FILE_HANDLE,
  SET_DIR_HANDLE,
  SET_VALUE,
  SET_OPTIONS,
  SET_THEME,
  SET_LANGUAGE,
  SET_LOCAL_VALUE,
} from '../constants/editor';

const initialState = {
  fileHandle: null,
  dir: null,
  dirHandle: null,
  value: null,
  localValue: null,
  theme: 'light',
  language: 'javascript',
  options: {
    fontSize: 12,
    acceptSuggestionOnCommitCharacter: true,
    acceptSuggestionOnEnter: 'on',
    accessibilitySupport: 'auto',
    autoIndent: false,
    automaticLayout: true,
    codeLens: true,
    colorDecorators: true,
    contextmenu: true,
    cursorBlinking: 'blink',
    cursorSmoothCaretAnimation: false,
    cursorStyle: 'line',
    disableLayerHinting: false,
    disableMonospaceOptimizations: false,
    dragAndDrop: false,
    fixedOverflowWidgets: false,
    folding: true,
    foldingStrategy: 'auto',
    fontLigatures: false,
    formatOnPaste: false,
    formatOnType: false,
    hideCursorInOverviewRuler: false,
    highlightActiveIndentGuide: true,
    links: true,
    mouseWheelZoom: false,
    multiCursorMergeOverlapping: true,
    multiCursorModifier: 'alt',
    overviewRulerBorder: true,
    overviewRulerLanes: 2,
    quickSuggestions: true,
    quickSuggestionsDelay: 100,
    readOnly: false,
    renderControlCharacters: false,
    renderFinalNewline: true,
    renderIndentGuides: true,
    renderLineHighlight: 'all',
    renderWhitespace: 'none',
    revealHorizontalRightPadding: 30,
    roundedSelection: true,
    rulers: [],
    scrollBeyondLastColumn: 5,
    scrollBeyondLastLine: true,
    selectOnLineNumbers: true,
    selectionClipboard: true,
    selectionHighlight: true,
    showFoldingControls: 'mouseover',
    smoothScrolling: false,
    suggestOnTriggerCharacters: true,
    wordBasedSuggestions: true,
    wordSeparators: '~!@#$%^&*()-=+[{]}|;:\'",.<>/?',
    wordWrap: 'off',
    wordWrapBreakAfterCharacters: '\t})]?|&,;',
    wordWrapBreakBeforeCharacters: '{([+',
    wordWrapBreakObtrusiveCharacters: '.',
    wordWrapColumn: 80,
    wordWrapMinified: true,
    wrappingIndent: 'none',
  },
};

/* eslint-disable no-param-reassign,  */
export default produce((state, { type, payload }) => {
  switch (type) {
    case SET_DIR: {
      state.dir = payload.dir;
      break;
    }
    case SET_FILE_HANDLE: {
      state.fileHandle = payload.fileHandle;
      break;
    }
    case SET_DIR_HANDLE: {
      state.dirHandle = payload.dirHandle;
      break;
    }
    case SET_VALUE: {
      state.value = payload.value;
      break;
    }
    case SET_LOCAL_VALUE: {
      state.localValue = payload.localValue;
      break;
    }
    case SET_OPTIONS: {
      state.options = payload.options;
      break;
    }
    case SET_THEME: {
      state.theme = payload.theme;
      break;
    }
    case SET_LANGUAGE: {
      state.language = payload.language;
      break;
    }
    default:
      break;
  }
}, initialState);
