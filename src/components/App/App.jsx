import { Box, Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { TreeView } from '@material-ui/lab';
import directoryOpen from '../../utils';
import useStyles from './styles';

const App = () => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [dir, setDir] = useState(null);
  const [img, setImg] = useState(null);
  const [fileHandle, setFileHandle] = useState(null);
  const [dirHandle, setDirHandle] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const readFile = async () => {
    const file = await fileHandle.getFile();
    const contents = await file.text();
    setValue(contents);
    setImg(null);
    // const myblob = new Blob([contents], { type: 'image/jpeg' });
    // const objectURL = URL.createObjectURL(myblob);
    // console.log('%cApp.jsx line:39 objectURL', 'color: #007acc;', objectURL);
    // setImg(objectURL);
  };

  useEffect(() => {
    if (fileHandle) readFile(fileHandle);
  }, [fileHandle]);

  const handleClick = async () => {
    setFileHandle(...(await window.showOpenFilePicker()));
  };

  const handleSaveAs = async () => {
    const newHandle = await window.showSaveFilePicker();
    setFileHandle(newHandle);
    const writableStream = await newHandle.createWritable();
    await writableStream.write(value);
    await writableStream.close();
  };

  const writeFile = async () => {
    if (!fileHandle) {
      return handleSaveAs();
    }
    const writable = await fileHandle.createWritable();
    await writable.write(value);
    await writable.close();
    return '';
  };

  const directoryPicker = async () => {
    const dirFolders = await directoryOpen({ options: { recursive: true } });
    setDir(dirFolders);
  };

  const handleTree = async (node) => {
    if (node) {
      setFileHandle(node.fileHandle);
      setDirHandle(node.directoryHandle);
    }
  };

  const renderTree = (nodes) => {
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onClick={() => {
        handleTree(nodes);
      }}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>;
  };

  const handleCreateNew = async () => {
    setFileHandle(null);
    setValue('');
  };

  const handleRemove = async () => {
    if (fileHandle?.name)
      await dirHandle.removeEntry(fileHandle.name, {
        recursive: true,
      });
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const s = e.dataTransfer.items;
    const entry = await s[0].getAsFileSystemHandle();
    if (entry.kind === 'directory') {
      const dirDrop = await directoryOpen({
        dirHandle: entry,
        options: { recursive: true },
      });
      setDir(dirDrop);
    } else {
      setFileHandle(entry);
    }
  };

  return (
    <Box>
      <Box className={classes.acitons}>
        <Button onClick={handleClick}>Open file</Button>
        <Button onClick={directoryPicker}>Open Dir</Button>
        <Button onClick={writeFile}>Save</Button>
        <Button onClick={handleSaveAs}>Save as</Button>
        <Button onClick={handleCreateNew}>Create New</Button>
        <Button onClick={handleRemove}>Remove</Button>
      </Box>
      <Box className={classes.content}>
        <TextField
          className={classes.textEditor}
          value={value}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={20}
          onDrop={handleDrop}
        />
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={[]}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {dir && renderTree(dir)}
        </TreeView>
      </Box>
      {img && <img src={img} alt="fds" />}
    </Box>
  );
};
export default App;
