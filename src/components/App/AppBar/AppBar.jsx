import {
  AppBar,
  Box,
  Button,
  IconButton,
  Popover,
  Switch,
  Toolbar,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { useActions } from '../../../hooks/useActions';
import directoryOpen from '../../../utils';

const images = ['image/jpeg'];

const NavBar = () => {
  const classes = useStyles();
  const { fileHandle, dirHandle, value, localValue } = useSelector(
    (state) => state.editor,
  );
  const { applyTheme, setFileHandle, setDir, setValue } = useActions();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const readFile = async () => {
    const file = await fileHandle.getFile();
    if (images.includes(file.type)) {
      // const im = URL.createObjectURL(file);
      return null; // setImg(im);
    }
    const contents = await file.text();
    return setValue(contents);
  };

  const handleOpen = async () => {
    const [s] = await window.showOpenFilePicker();
    setFileHandle(s);
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
    await writable.write(localValue);
    await writable.close();
    return '';
  };

  const directoryPicker = async () => {
    const dirFolders = await directoryOpen({ options: { recursive: true } });
    setDir(dirFolders);
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

  useEffect(() => {
    if (fileHandle) readFile(fileHandle);
  }, [fileHandle]);

  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Button
          aria-describedby={id}
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Open Popover
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box className={classes.acitons}>
            <Button onClick={handleOpen}>Open file</Button>
            <Button onClick={directoryPicker}>Open Dir</Button>
            <Button onClick={writeFile}>Save</Button>
            <Button onClick={handleSaveAs}>Save as</Button>
            <Button onClick={handleCreateNew}>Create New</Button>
            <Button onClick={handleRemove}>Remove</Button>
          </Box>
        </Popover>
        <Switch
          onChange={applyTheme}
          name="themeSwitch"
          className={classes.navTheme}
        />
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
