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

export const setDir = (dir) => ({
  type: SET_DIR,
  payload: { dir },
});

export const setFileHandle = (fileHandle) => ({
  type: SET_FILE_HANDLE,
  payload: { fileHandle },
});

export const setDirHandle = (dirHandle) => ({
  type: SET_DIR_HANDLE,
  payload: { dirHandle },
});

export const setValue = (value) => ({
  type: SET_VALUE,
  payload: { value },
});

export const setDiffValue = (localValue) => ({
  type: SET_LOCAL_VALUE,
  payload: { localValue },
});

export const setOptions = (options) => ({
  type: SET_OPTIONS,
  payload: { options },
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: { theme },
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: { language },
});

export default {
  setDir,
  setDirHandle,
  setFileHandle,
  setValue,
  setOptions,
  setTheme,
  setLanguage,
};
