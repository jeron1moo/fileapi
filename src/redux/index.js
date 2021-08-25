import { combineReducers } from 'redux';
import theme from './reducers/theme';
import editor from './reducers/editor';

const rootReducer = combineReducers({
  theme,
  editor,
});

export default rootReducer;
