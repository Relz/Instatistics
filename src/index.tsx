import { createBrowserHistory, History } from 'history';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Store } from 'redux';
import { AuthorizationManagerConnected } from './Components/AuthorizationManager/AuthorizationManager';
import './Index.pcss';
import { IState } from './Redux/States/IState';
import { StoreHelper } from './Redux/StoreHelper';

const history: History = createBrowserHistory();
const store: Store<IState> = StoreHelper.createStore(history);

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<AuthorizationManagerConnected />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);
