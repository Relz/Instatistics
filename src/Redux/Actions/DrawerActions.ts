import { Action, ActionFunction1, createAction } from 'redux-actions';
import { DrawerActionType } from '../ActionTypes/DrawerActionType';

export const setDrawerOpened: ActionFunction1<boolean, Action<boolean>> = createAction<boolean>(
	DrawerActionType.SetDrawerOpened
);
