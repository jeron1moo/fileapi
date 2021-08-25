import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  codeEditor: {
    width: '100%',
    color: theme.palette.primary.contrastText,
  },
  textEditor: {
    widht: '300px',
    height: 'auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  foldersTree: {
    minWidth: '250px',
    padding: '20px 10px',
    overflow: 'hidden',
  },
  settings: {
    minWidth: '300px',
  },
  editor: {
    width: '100%',
    height: '91vh',
    padding: '20px 10px',
  },
}));
