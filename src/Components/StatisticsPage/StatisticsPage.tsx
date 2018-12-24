import ReactEcharts from 'echarts-for-react-typescript';
import * as React from 'react';
import { ComponentClass } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'redux-actions';
import { StringHelper } from '../../Core/StringHelper';
import { XMLHttpRequestHelper } from '../../Core/XMLHttpRequestHelper';
import { IAccount } from '../../Models/Account/IAccount';
import { IStatistics } from '../../Models/Statistics/IStatistics';
import { IMetric } from '../../Models/Statistics/Metric/IMetric';
import { setAccountStatistics } from '../../Redux/Actions/UserActions';
import { IState } from '../../Redux/States/IState';
import { Component } from '../Component';

interface IExternalProps {}

interface IDefaultProps extends IExternalProps {}

interface IReduxProps extends IDefaultProps {
	account?: IAccount;
	// tslint:disable-next-line:no-any
	i18n: any;
	token: string;
	setAccountStatistics(value: IStatistics): void;
}

type ActualProps = IReduxProps;

interface IInternalState {}

class StatisticsPage extends Component<IExternalProps, IInternalState, ActualProps> {
	public static readonly defaultProps: IDefaultProps = {};

	public constructor(props: IExternalProps) {
		super(props);

		this.state = {};

		if (this.properties.account !== undefined) {
			XMLHttpRequestHelper.request<undefined, any>(
				'GET',
				`http://localhost:5001/statistics?accountLogin=${this.properties.account.login}`,
				this.properties.token,
				undefined,
				(response: string | any): void => {
					console.log(response);
					if (this.properties.account === undefined) {
						return;
					}
					const responsedAccountMetrics: any = response as any;
					this.properties.setAccountStatistics({
						login: this.properties.account.login,
						metrics: responsedAccountMetrics.metric
					});
				},
				(failCode: string): void => {
					console.log(`Cannot get statistics, fail code: ${failCode}`);
				}
			);
		}
	}

	public render(): JSX.Element {
		console.log(this.properties.account);

		return <ReactEcharts option={this.getTotalChart()} />;
	}

	private getTotalChart(): any {
		return {
			legend: {
				data: this.computeLegend()
			},
			series: this.computeSeries(),
			title: {
				text: this.properties.i18n.translations[this.properties.i18n.locale]['statistics_total_chart_title']
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			tooltip: {
				trigger: 'axis'
			},
			xAxis: [
				{
					data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
					type: 'time'
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			]
		};
	}

	private computeSeries(): any[] {
		if (this.properties.account === undefined) {
			return [];
		}
		console.log(
			this.properties.account.metrics.map(
				(metric: IMetric): any => ({
					areaStyle: { normal: {} },
					data: metric.values.map(StringHelper.toString),
					name: this.properties.i18n.translations[this.properties.i18n.locale][metric.name],
					type: 'line'
				})
			)
		);

		return this.properties.account.metrics.map(
			(metric: IMetric): any => ({
				areaStyle: { normal: {} },
				data: metric.values,
				name: this.properties.i18n.translations[this.properties.i18n.locale][metric.name],
				type: 'line'
			})
		);
	}

	private computeLegend(): any[] {
		if (this.properties.account === undefined) {
			return [];
		}

		return this.properties.account.metrics.map(
			(metric: IMetric): string => this.properties.i18n.translations[this.properties.i18n.locale][metric.name]
		);
	}
}

const mapStateToProps: MapStateToProps<Partial<IReduxProps>, IExternalProps, IState> = (
	state: IState
): Partial<IReduxProps> => {
	const account: IAccount | undefined =
		state.user.activeAccountIndex === undefined ? undefined : state.user.accounts[state.user.activeAccountIndex];

	return {
		account: account,
		i18n: state.i18n,
		token: state.user.user.token
	};
};

const mapDispatchToProps: MapDispatchToProps<Partial<IReduxProps>, IExternalProps> = (
	dispatch: Dispatch
): Partial<IReduxProps> => ({
	setAccountStatistics: (value: IStatistics): Action<IStatistics> => dispatch(setAccountStatistics(value))
});

export const StatisticsPageConnected: ComponentClass<IExternalProps> = connect(
	mapStateToProps,
	mapDispatchToProps
)(StatisticsPage);
