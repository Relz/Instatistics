import { IAccount } from '../../../Models/Account/IAccount';
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
}
