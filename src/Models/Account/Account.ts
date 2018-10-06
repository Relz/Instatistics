import { IAccount } from './IAccount';

export class Account implements IAccount {
	public readonly login: string;
	public readonly password: string;

	public constructor(login: string, password: string) {
		this.login = login;
		this.password = password;
	}
}
