import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  TextField,
} from '@material-ui/core';
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
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const readFile = async () => {
    const file = await fileHandle.getFile();
    const contents = await file.text();
    setValue(contents);
    setImg(null);
    // const myblob = new Blob([contents], {
    //   type: 'image/jpeg',
    // });

    // const reader = new FileReader();
    // const f = reader.readAsDataURL(myblob);
    // console.log('%cApp.jsx line:32 reader', 'color: #007acc;', f);
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

  const writeFile = async () => {
    const writable = await fileHandle.createWritable();
    await writable.write(value);
    await writable.close();
  };

  const directoryPicker = async () => {
    const s = await directoryOpen({ recursive: true });
    setDir(s);
  };

  const handleTree = async (file) => {
    if (file) {
      setFileHandle(file);
    }
  };

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onClick={() => handleTree(nodes.fileHandle)}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const handleSaveAs = async () => {
    const newHandle = await window.showSaveFilePicker();
    const writableStream = await newHandle.createWritable();
    await writableStream.write(value);
    await writableStream.close();
  };
  const handleCreateNew = () => {};

  return (
    <Box>
      <Box className={classes.acitons}>
        <Button onClick={handleClick}>Open file</Button>
        <Button onClick={directoryPicker}>Open Dir</Button>
        <Button onClick={writeFile}>Save</Button>
        <Button onClick={handleSaveAs}>Save as</Button>
        <Button onClick={handleCreateNew}>Create New</Button>
      </Box>
      <Box className={classes.content}>
        <TextField
          className={classes.textEditor}
          value={value}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={20}
        />
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={['components']}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {dir && renderTree(dir)}
        </TreeView>
      </Box>
      {img && (
        <ImageList rowHeight={160} className={classes.imageList} cols={3}>
          <ImageListItem>
            <img src={img.name} alt="fds" />
          </ImageListItem>
        </ImageList>
      )}
    </Box>
  );
};
export default App;
