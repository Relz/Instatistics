// tslint:disable: no-any

import { History } from 'history';
import { i18nReducer, loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import { routerMiddleware } from 'react-router-redux';
import {
	applyMiddleware,
	combineReducers,
	createStore,
	Middleware,
	Reducer,
	ReducersMapObject,
	Store,
	StoreEnhancer
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { translations } from '../Translations/Translations';
import { drawerReducer } from './Reducers/drawerReducer';
import { IState } from './States/IState';

export class StoreHelper {
	private static readonly _locale: string = 'ru';

	private static readonly _vendorReducers: ReducersMapObject = {
		i18n: i18nReducer
	};

	private static readonly _reducers: ReducersMapObject = {
		drawer: drawerReducer
	};

	private static readonly _vendorMiddlewares: Middleware[] = [thunk];

	private static readonly _middlewares: Middleware[] = [];

	public static createStore(history: History): Store<IState> {
		const store: Store<IState> = createStore(StoreHelper.createReducer(), StoreHelper.createMiddleware(history));
		StoreHelper.applyTranslation(store);

		return store;
	}

	private static createReducer(): Reducer<IState> {
		return combineReducers({
			...StoreHelper._vendorReducers,
			...StoreHelper._reducers
		} as any);
	}

	private static createMiddleware(history: History): StoreEnhancer {
		let result: StoreEnhancer = applyMiddleware(
			routerMiddleware(history),
			...StoreHelper._vendorMiddlewares,
			...StoreHelper._middlewares
		);

		if (process.env.NODE_ENV !== 'production') {
			result = composeWithDevTools(result);
		}

		return result;
	}

	private static applyTranslation(store: Store<IState>): void {
		syncTranslationWithStore(store);
		store.dispatch(loadTranslations(translations) as any);
		store.dispatch(setLocale(StoreHelper._locale) as any);
	}
}
