import { Action, Reducer } from 'redux-actions';
import { DrawerActionType } from '../ActionTypes/DrawerActionType';
import { DrawerState } from '../States/DrawerState/DrawerState';
import { IDrawerState } from '../States/DrawerState/IDrawerState';
import { BaseReducer } from './BaseReducer';

const baseReducer: BaseReducer<IDrawerState> = new BaseReducer<IDrawerState>(new DrawerState());

baseReducer.handleAction(
	DrawerActionType.SetDrawerOpened,
	(drawerState: IDrawerState, action: Action<boolean>): IDrawerState => ({
		...drawerState,
		drawerOpened: action.payload === undefined ? false : action.payload
	})
);

// tslint:disable-next-line: no-any
export const drawerReducer: Reducer<IDrawerState, any> = baseReducer.combineActionHandles();
