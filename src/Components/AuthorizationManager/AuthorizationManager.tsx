import * as React from 'react';
import { ComponentClass } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { Action } from 'redux-actions';
import { StringHelper } from '../../Core/StringHelper';
import { setToken } from '../../Redux/Actions/UserActions';
import { IState } from '../../Redux/States/IState';
import { AppConnected } from '../App/App';
import { Component } from '../Component';
import { SignInUpConnected } from '../SignInUp/SignInUp';

interface IExternalProps {}

interface IDefaultProps extends IExternalProps {}

interface IReduxProps extends IDefaultProps {
	token: string;
	setToken(value: string): void;
}

type ActualProps = IReduxProps;

class AuthorizationManager extends Component<IExternalProps, {}, ActualProps> {
	public static readonly defaultProps: IDefaultProps = {};

	public constructor(props: IExternalProps) {
		super(props);

		const nullableToken: string | null = localStorage.getItem('token');
		if (nullableToken !== null) {
			this.properties.setToken(nullableToken);
		}
	}

	public render(): JSX.Element {
		return StringHelper.isEmpty(this.properties.token) ? <SignInUpConnected /> : <AppConnected />;
	}
}

const mapStateToProps: MapStateToProps<Partial<IReduxProps>, IExternalProps, IState> = (
	state: IState
): Partial<IReduxProps> => ({
	token: state.user.user.token
});

const mapDispatchToProps: MapDispatchToProps<Partial<IReduxProps>, IExternalProps> = (
	dispatch: Dispatch
): Partial<IReduxProps> => ({
	setToken: (value: string): Action<string> => dispatch(setToken(value))
});

export const AuthorizationManagerConnected: ComponentClass<IExternalProps> = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
	// tslint:disable-next-line:no-any
)(AuthorizationManager) as any);
