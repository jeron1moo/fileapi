import { Route, Switch } from 'react-router-dom';
import React from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import DiffEditor from '../DiffEditor';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={CodeEditor} />
      <Route exact path="/diff" component={DiffEditor} />
    </Switch>
  );
};

export default Routes;
