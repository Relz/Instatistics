import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import * as React from 'react';
import { ComponentClass } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { Dispatch } from 'redux';
import { Action } from 'redux-actions';
import { IAccount } from '../../Models/Account/IAccount';
import { IStatistics } from '../../Models/Statistics/IStatistics';
import { setAccountStatistics } from '../../Redux/Actions/UserActions';
import { IState } from '../../Redux/States/IState';
import { Component } from '../Component';
import { Scale } from '@devexpress/dx-react-chart';
import { Chart, ArgumentAxis, ValueAxis, SplineSeries } from '@devexpress/dx-react-chart-material-ui';

interface IExternalProps {}

interface IDefaultProps extends IExternalProps {}

interface IReduxProps extends IDefaultProps {
	account?: IAccount;
	// tslint:disable-next-line:no-any
	i18n: any;
	setAccountStatistics(value: IStatistics): void;
}

type ActualProps = IReduxProps;

interface IInternalState {}

class StatisticsPage extends Component<IExternalProps, IInternalState, ActualProps> {
	public static readonly defaultProps: IDefaultProps = {};

	public constructor(props: IExternalProps) {
		super(props);

		this.state = {};

		this.properties.setAccountStatistics({
			login: 'login1',
			metrics: [
				{
					metricName: 'metric_name_likes',
					values: [1, 2, 3],
					dateTimes: [new Date(), new Date(), new Date()]
				}
			]
		});
	}

	public render(): JSX.Element {
		console.log(this.properties.account);
		const chartData: any[] = [
			{ month: 'Jan', count: 50 },
			{ month: 'Feb', count: 100 },
			{ month: 'March', count: 150 },
			{ month: 'April', count: 300 },
			{ month: 'May', count: 300 },
			{ month: 'June', count: 450 }
		];

		return (
			<div>
				<Typography variant="title" noWrap={true}>
					<Translate value="service_name" />
				</Typography>
				<Paper>
					<Chart data={chartData} width={650} height={500}>
						<ArgumentAxis showGrids />
						<ValueAxis />

						<SplineSeries valueField="month" argumentField="count" />

						<Scale />
					</Chart>
				</Paper>
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<Partial<IReduxProps>, IExternalProps, IState> = (
	state: IState
): Partial<IReduxProps> => {
	const account: IAccount | undefined =
		state.user.activeAccountIndex === undefined ? undefined : state.user.accounts[state.user.activeAccountIndex];
	return {
		i18n: state.i18n,
		account: account
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
