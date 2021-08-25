import produce, { setAutoFreeze } from 'immer';
import { APPLY_THEME } from '../constants/theme';
import theme from '../../styles/lightTheme';
import themeDark from '../../styles/darkTheme';

setAutoFreeze(false);

const initialState = {
  ...theme,
};

/* eslint-disable no-param-reassign,  */
export default produce((draft, action) => {
  switch (action.type) {
    case APPLY_THEME: {
      draft.palette =
        draft.palette.type === 'light' ? themeDark.palette : theme.palette;
      break;
    }
    default:
      break;
  }
}, initialState);
