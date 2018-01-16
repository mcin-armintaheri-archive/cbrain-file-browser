import React from 'react';
import { createEventHandler, componentFromStream, setObservableConfig } from 'recompose';
import I from 'immutable';
import * as most from 'most';

import FileTree from '../file-tree/FileTree';

// use most.js streams to store state.
import mostConfig from 'recompose/mostObservableConfig';
setObservableConfig(mostConfig);

export default componentFromStream(() => {
  const userfiles$ = most.fromPromise(fetch('testresponse.json').then(res => res.json()))
    .map(userfiles => I.Map({ userfiles, root: I.List() }));
  const { handler: setter, stream: state$ } = createEventHandler();
  return state$.merge(userfiles$).map(state => {
    return <FileTree className='file-tree' setter={setter} state={state} />;
  });
})
