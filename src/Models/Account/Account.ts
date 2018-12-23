import { IMetric } from '../Statistics/Metric/IMetric';
import { IAccount } from './IAccount';

export class Account implements IAccount {
	public readonly login: string;
	public readonly password: string;
	public readonly metrics: IMetric[];

	public constructor(login: string, password: string, metrics: IMetric[]) {
		this.login = login;
		this.password = password;
		this.metrics = metrics;
	}
}
