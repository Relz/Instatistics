import { IMetric } from '../Statistics/Metric/IMetric';

export interface IAccount {
	readonly login: string;
	readonly password: string;
	readonly metrics: IMetric[];
}
