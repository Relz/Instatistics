import { IAccount } from '../../../Models/Account/IAccount';
import { IUser } from '../../../Models/User/IUser';
import { User } from '../../../Models/User/User';
import { IUserState } from './IUserState';

export class UserState implements IUserState {
	private _accounts: IAccount[] = [];
	public get accounts(): IAccount[] {
		return this._accounts;
	}

	public set accounts(value: IAccount[]) {
		this._accounts = value;
	}

	private _activeAccountIndex?: number;
	public get activeAccountIndex(): number | undefined {
		return this._activeAccountIndex;
	}

	public set activeAccountIndex(value: number | undefined) {
		this._activeAccountIndex = value;
	}

	private _user: IUser = new User();
	public get user(): IUser {
		return this._user;
	}

	public set user(value: IUser) {
		this._user = value;
	}
}
