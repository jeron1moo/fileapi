/* eslint-disable no-restricted-syntax */

const getFiles = async (dirHandle, recursive, path = dirHandle.name) => {
  const dirs = [];
  const files = [];
  for await (const entry of dirHandle.values()) {
    const nestedPath = `${path}/${entry.name}`;
    if (entry.kind === 'file') {
      files.push(
        entry.getFile().then(async (file) => {
          file.directoryHandle = dirHandle;
          file.fileHandle = await dirHandle.getFileHandle(file.name);
          return Object.defineProperty(file, 'webkitRelativePath', {
            configurable: true,
            enumerable: true,
            get: () => nestedPath,
          });
        }),
      );
    } else if (entry.kind === 'directory' && recursive) {
      dirs.push(getFiles(entry, recursive, nestedPath));
    }
  }
  return {
    name: dirHandle.name,
    id: dirHandle.name,
    directoryHandle: dirHandle,
    children: [...(await Promise.all(dirs)), ...(await Promise.all(files))],
  };
};

export default async (options = {}) => {
  options.recursive = options.recursive || false;
  const handle = await window.showDirectoryPicker({
    id: options.id,
    startIn: options.startIn,
  });
  return getFiles(handle, options.recursive);
};
