import { IAccount } from '../../../Models/Account/IAccount';

export interface IUserState {
	accounts: IAccount[];
	activeAccountIndex: number | undefined;
}
