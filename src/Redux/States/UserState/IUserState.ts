import { IAccount } from '../../../Models/Account/IAccount';
import { IUser } from '../../../Models/User/IUser';

export interface IUserState {
	accounts: IAccount[];
	activeAccountIndex: number | undefined;
	user: IUser;
}
