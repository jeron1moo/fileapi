import { Box } from '@material-ui/core';
import { DiffEditor } from '@monaco-editor/react';
import React from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';

const CodeEditor = () => {
  const classes = useStyles();
  const { value, localValue } = useSelector((state) => state.editor);
  return (
    <Box className={classes.codeEditor}>
      <DiffEditor
        height="90vh"
        widht="1000px"
        defaultLanguage="javascript"
        original={value}
        modified={localValue}
      />
    </Box>
  );
};

export default CodeEditor;
