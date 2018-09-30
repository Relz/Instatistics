import { Action, Reducer } from 'redux-actions';
import { BaseReducer } from './BaseReducer';
import { IDrawerState } from '../States/DrawerState/IDrawerState';
import { DrawerState } from '../States/DrawerState/DrawerState';
import { DrawerActionType } from '../ActionTypes/DrawerActionType';

const baseReducer: BaseReducer<IDrawerState> = new BaseReducer<IDrawerState>(new DrawerState());

baseReducer.handleAction(
	DrawerActionType.SetDrawerOpened,
	(drawerState: IDrawerState, action: Action<boolean>): IDrawerState => {
		return {
			...drawerState,
			drawerOpened: action.payload === undefined ? false : action.payload
		};
	}
);

// tslint:disable-next-line: no-any
export const drawerReducer: Reducer<IDrawerState, any> = baseReducer.combineActionHandles();
