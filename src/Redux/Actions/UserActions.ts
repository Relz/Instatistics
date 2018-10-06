import { Action, ActionFunction1, createAction } from 'redux-actions';
import { IAccount } from '../../Models/Account/IAccount';
import { UserActionType } from '../ActionTypes/UserActionType';

export const setAccounts: ActionFunction1<IAccount[], Action<IAccount[]>> = createAction<IAccount[]>(
	UserActionType.SetAccounts
);

export const setActiveAccountIndex: ActionFunction1<number | undefined, Action<number | undefined>> = createAction<
	number | undefined
>(UserActionType.SetActiveAccountIndex);

export const addAccount: ActionFunction1<IAccount, Action<IAccount>> = createAction<IAccount>(
	UserActionType.AddAccount
);
