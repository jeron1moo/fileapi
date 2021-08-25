import { Box, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TreeView, TreeItem } from '@material-ui/lab';
import Editor from '@monaco-editor/react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import Settings from '../../components/App/Settings';
import { useActions } from '../../hooks/useActions';

const CodeEditor = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setFileHandle, setDirHandle, setDiffValue } = useActions();
  const { dir, value, options, theme, language } = useSelector(
    (state) => state.editor,
  );
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (locValue) => {
    setLocalValue(locValue);
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleTree = async (node) => {
    if (node) {
      setFileHandle(node.fileHandle);
      setDirHandle(node.directoryHandle);
    }
  };

  const renderTree = (nodes) => (
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
    </TreeItem>
  );

  // const handleDrop = async (e) => {
  //   e.preventDefault();
  //   const s = e.dataTransfer.items;
  //   const entry = await s[0].getAsFileSystemHandle();
  //   if (entry.kind === 'directory') {
  //     const dirDrop = await directoryOpen({
  //       dirHandle: entry,
  //       options: { recursive: true },
  //     });
  //     setDir(dirDrop);
  //   } else {
  //     setFileHandle(entry);
  //   }
  // };

  const handleDiff = () => {
    setDiffValue(localValue);
    history.push('/diff');
  };

  return (
    <Box className={classes.codeEditor}>
      <Box className={classes.content}>
        {dir && (
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={[]}
            defaultExpandIcon={<ChevronRightIcon />}
            className={classes.foldersTree}
          >
            {renderTree(dir)}
          </TreeView>
        )}
        <Box className={classes.editor}>
          <Editor
            height="100%"
            width="100%"
            value={localValue}
            theme={theme}
            defaultLanguage="javascript"
            laguage={language}
            onChange={handleChange}
            options={options}
            // onDrop={handleDrop}
          />
        </Box>
        <Button onClick={handleDiff}>Diff</Button>
        <Settings />
      </Box>
    </Box>
  );
};

export default CodeEditor;
