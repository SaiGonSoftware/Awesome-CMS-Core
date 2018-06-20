import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from './Store/ConfigureStore';

const store = configureStore();

render(
    <Provider store={store}></Provider>, document.getElementById('app'));