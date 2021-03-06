import { Action, ActionFunction1, createAction } from 'redux-actions';
import { IAccount } from '../../Models/Account/IAccount';
import { IStatistics } from '../../Models/Statistics/IStatistics';
import { UserActionType } from '../ActionTypes/UserActionType';

export const addAccount: ActionFunction1<IAccount, Action<IAccount>> = createAction<IAccount>(
	UserActionType.AddAccount
);

export const setAccounts: ActionFunction1<IAccount[], Action<IAccount[]>> = createAction<IAccount[]>(
	UserActionType.SetAccounts
);

export const setAccountStatistics: ActionFunction1<IStatistics, Action<IStatistics>> = createAction<IStatistics>(
	UserActionType.SetAccountStatistics
);

export const setActiveAccountIndex: ActionFunction1<number | undefined, Action<number | undefined>> = createAction<
	number | undefined
>(UserActionType.SetActiveAccountIndex);

export const setToken: ActionFunction1<string, Action<string>> = createAction<string>(UserActionType.SetToken);
