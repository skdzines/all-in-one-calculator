import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import Main from 'components/main';

import 'sass/styles.scss';

ReactDOM.render(
	<Provider store={ store }>
		<Main />
	</Provider>,
	document.body.appendChild(document.createElement('div'))
);
