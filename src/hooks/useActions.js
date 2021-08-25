import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as theme from '../redux/actions/theme';
import * as editor from '../redux/actions/editor';

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => bindActionCreators({ ...editor, ...theme }, dispatch),
    [dispatch],
  );
};

export default { useActions };
