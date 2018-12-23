import { IMetric } from './Metric/IMetric';

export interface IStatistics {
	login: string;
	metrics: IMetric[];
}
