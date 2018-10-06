import { Typography } from '@material-ui/core';
import * as React from 'react';
import { ComponentClass } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { IState } from '../../Redux/States/IState';
import { Component } from '../Component';

interface IExternalProps {}

interface IDefaultProps extends IExternalProps {}

interface IReduxProps extends IDefaultProps {}

type ActualProps = IReduxProps;

interface IInternalState {}

class WelcomePage extends Component<IExternalProps, IInternalState, ActualProps> {
	public static readonly defaultProps: IDefaultProps = {};

	public constructor(props: IExternalProps) {
		super(props);
	}

	public render(): JSX.Element {
		return (
			<div>
				<Typography variant="body2" color="inherit">
					<Translate value="page_welcome_body_choose" />
					<br />
					<Translate value="page_welcome_body_add" />
				</Typography>
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<Partial<IReduxProps>, IExternalProps, IState> = (): Partial<IReduxProps> => ({});

const mapDispatchToProps: MapDispatchToProps<Partial<IReduxProps>, IExternalProps> = (): Partial<IReduxProps> => ({});

export const WelcomePageConnected: ComponentClass<IExternalProps> = connect(
	mapStateToProps,
	mapDispatchToProps
)(WelcomePage);
