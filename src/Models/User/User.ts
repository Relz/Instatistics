import { IUser } from './IUser';

export class User implements IUser {
	public readonly login: string;
	public readonly token: string;

	public constructor(login: string = '', token: string = '') {
		this.login = login;
		this.token = token;
	}
}
