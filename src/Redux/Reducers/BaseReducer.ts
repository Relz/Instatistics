// tslint:disable: no-any

import { Action, handleActions, Reducer, ReducerMap } from 'redux-actions';
import { Function2 } from '../../Core/Delegates/Functions';

export class BaseReducer<TState> {
	private readonly _defaultState: TState;
	private readonly _reducerMap: ReducerMap<TState, any> = {};

	public constructor(defaultState: TState) {
		this._defaultState = defaultState;
	}

	public handleAction(actionType: string, reducer: Function2<TState, Action<any>, TState>): void {
		this._reducerMap[actionType] = reducer;
	}

	public combineActionHandles(): Reducer<TState, any> {
		return handleActions<TState, any>(this._reducerMap, this._defaultState);
	}
}
