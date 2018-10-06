import { createBrowserHistory, History } from 'history';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Store } from 'redux';
import { AppConnected } from './Components/App/App';
import { SignInUpConnected } from './Components/SignInUp/SignInUp';
import { StringHelper } from './Core/StringHelper';
import './Index.pcss';
import { IState } from './Redux/States/IState';
import { StoreHelper } from './Redux/StoreHelper';

const history: History = createBrowserHistory();
const store: Store<IState> = StoreHelper.createStore(history);

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			{StringHelper.isEmpty(store.getState().user.user.login) ? <SignInUpConnected /> : <AppConnected />}
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);
