import { Box, Button, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Editor from '@monaco-editor/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../../hooks/useActions';
import useStyles from './styles';

const existsThemes = ['light', 'vs-dark'];

const Settings = () => {
  const classes = useStyles();
  const { options, theme } = useSelector((state) => state.editor);
  const { setOptions, setTheme } = useActions();
  const [value, setValue] = useState(JSON.stringify(options));
  const [curTheme, setCurTheme] = useState(theme);

  const handleChange = (evValue) => {
    setValue(evValue);
  };

  const handleClick = () => {
    setOptions(JSON.parse(value));
    setTheme(curTheme);
  };

  return (
    <>
      <Box className={classes.settings}>
        <Typography>Settings</Typography>
        <Typography>Languages</Typography>
        <Box className={classes.themes}>
          <Typography>Themes</Typography>
          <Autocomplete
            options={existsThemes}
            value={curTheme}
            onChange={(event, newValue) => {
              setCurTheme(newValue);
            }}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField {...params} label="Combo box" variant="outlined" />
            )}
          />
        </Box>
        <Box className={classes.options}>
          <Typography>Options</Typography>
          <Editor
            defaultLanguage="json"
            height="100%"
            width="100%"
            value={value}
            theme={theme}
            options={{
              fontSize: 10,
            }}
            onChange={handleChange}
          />
        </Box>
        <Button onClick={handleClick}>Apply</Button>
      </Box>
    </>
  );
};

export default Settings;
