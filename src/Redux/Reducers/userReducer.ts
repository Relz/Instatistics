import { Action, Reducer } from 'redux-actions';
import { IAccount } from '../../Models/Account/IAccount';
import { UserActionType } from '../ActionTypes/UserActionType';
import { IUserState } from '../States/UserState/IUserState';
import { UserState } from '../States/UserState/UserState';
import { BaseReducer } from './BaseReducer';
import { User } from '../../Models/User/User';

const baseReducer: BaseReducer<IUserState> = new BaseReducer<IUserState>(new UserState());

baseReducer.handleAction(
	UserActionType.AddAccount,
	(userState: IUserState, action: Action<IAccount>): IUserState => ({
		...userState,
		accounts: action.payload === undefined ? userState.accounts : [...userState.accounts, action.payload]
	})
);

baseReducer.handleAction(
	UserActionType.SetAccounts,
	(userState: IUserState, action: Action<IAccount[]>): IUserState => ({
		...userState,
		accounts: action.payload === undefined ? [] : action.payload
	})
);

baseReducer.handleAction(
	UserActionType.SetActiveAccountIndex,
	(userState: IUserState, action: Action<number | undefined>): IUserState => ({
		...userState,
		activeAccountIndex: action.payload
	})
);

baseReducer.handleAction(
	UserActionType.SetToken,
	(userState: IUserState, action: Action<string>): IUserState => {
		const token: string = action.payload === undefined ? '' : action.payload;
		localStorage.setItem('token', token);

		return {
			...userState,
			user: new User(userState.user.login, token)
		};
	}
);

// tslint:disable-next-line: no-any
export const userReducer: Reducer<IUserState, any> = baseReducer.combineActionHandles();
