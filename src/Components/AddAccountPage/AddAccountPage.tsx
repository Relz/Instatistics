import { Button, FormHelperText, Grid, IconButton, TextField } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import autobind from 'autobind-decorator';
import classNames from 'classnames';
import * as React from 'react';
import { ComponentClass } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { Dispatch } from 'redux';
import { Action } from 'redux-actions';
import { StringHelper } from '../../Core/StringHelper';
import { XMLHttpRequestHelper } from '../../Core/XMLHttpRequestHelper';
import { Account } from '../../Models/Account/Account';
import { IAccount } from '../../Models/Account/IAccount';
import { setAccounts } from '../../Redux/Actions/UserActions';
import { IState } from '../../Redux/States/IState';
import { Component } from '../Component';
import * as styles from './AddAccountPage.pcss';

interface IExternalProps {}

interface IDefaultProps extends IExternalProps {}

interface IReduxProps extends IDefaultProps {
	// tslint:disable-next-line:no-any
	i18n: any;
	token: string;
	setAccounts(value: IAccount[]): void;
}

type ActualProps = IReduxProps;

interface IInternalState {
	name: string;
	password: string;
	showDisablingExplanation: boolean;
}

class AddAccountPage extends Component<IExternalProps, IInternalState, ActualProps> {
	public static readonly defaultProps: IDefaultProps = {};

	public constructor(props: IExternalProps) {
		super(props);

		this.state = {
			name: '',
			password: '',
			showDisablingExplanation: false
		};
	}

	public render(): JSX.Element {
		return (
			<form noValidate={true} autoComplete="off">
				<div>
					<TextField
						label={
							this.properties.i18n.translations[this.properties.i18n.locale][
								'page_addAccount_form_login_label'
							]
						}
						value={this.state.name}
						onChange={this.handleNameChange}
						margin="normal"
						required={true}
					/>
				</div>
				<div>
					<TextField
						label={
							this.properties.i18n.translations[this.properties.i18n.locale][
								'page_addAccount_form_password_label'
							]
						}
						type="password"
						value={this.state.password}
						onChange={this.handlePasswordChange}
						margin="normal"
						required={true}
					/>
				</div>
				<div className={styles.addButtonBlock}>
					<Grid container={true} alignItems="flex-start" direction="column" justify="flex-start">
						<Grid item={true} container={true} alignItems="center" direction="row" justify="flex-start">
							<Grid item={true}>
								<Button
									variant="contained"
									size="medium"
									color="primary"
									onClick={this.handleAddButtonClick}
									disabled={StringHelper.isAnyEmpty(this.state.name, this.state.password)}
								>
									<Translate value="page_addAccount_form_addButton_text" />
								</Button>
							</Grid>
							<Grid item={true}>
								<IconButton
									aria-label="Show disabling explanation icon button"
									className={classNames(
										!StringHelper.isAnyEmpty(this.state.name, this.state.password) && styles.hidden
									)}
									onClick={this.handleShowDisablingExplanation}
								>
									<HelpIcon fontSize="small" />
								</IconButton>
							</Grid>
						</Grid>
						<Grid item={true}>
							<FormHelperText
								error={true}
								className={classNames(
									(!this.state.showDisablingExplanation ||
										!StringHelper.isAnyEmpty(this.state.name, this.state.password)) &&
										styles.hidden
								)}
							>
								<Translate value="page_addAccount_form_addButton_disabledHelpText" />
							</FormHelperText>
						</Grid>
					</Grid>
				</div>
			</form>
		);
	}

	@autobind
	private handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({
			name: event.target.value
		});
	}

	@autobind
	private handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({
			password: event.target.value
		});
	}

	@autobind
	private handleAddButtonClick(): void {
		const data: object = {
			accessToken: '',
			login: this.state.name,
			password: this.state.password,
			socialNetworkAccountId: 0,
			tokenLifetime: ''
		};

		XMLHttpRequestHelper.request(
			'POST',
			'http://localhost:5001/accounts',
			this.properties.token,
			data,
			(response: string): void => {
				console.log(response);
				XMLHttpRequestHelper.request<undefined, any[]>(
					'GET',
					'http://localhost:5001/accounts',
					this.properties.token,
					undefined,
					(response: string | any[]): void => {
						console.log(response);
						const responsedAccounts: any[] = response as any[];
						this.properties.setAccounts(
							responsedAccounts.map(
								(responsedAccount: any): IAccount =>
									new Account(responsedAccount.login, responsedAccount.password, [])
							)
						);
					},
					(failCode: string): void => {
						console.log(`Cannot get instagram accounts, fail code: ${failCode}`);
					}
				);
			},
			(failCode: string): void => {
				console.log(failCode);
			}
		);
	}

	@autobind
	private handleShowDisablingExplanation(): void {
		this.setState({
			showDisablingExplanation: true
		});
	}
}

const mapStateToProps: MapStateToProps<Partial<IReduxProps>, IExternalProps, IState> = (
	state: IState
): Partial<IReduxProps> => ({
	i18n: state.i18n,
	token: state.user.user.token
});

const mapDispatchToProps: MapDispatchToProps<Partial<IReduxProps>, IExternalProps> = (
	dispatch: Dispatch
): Partial<IReduxProps> => ({
	setAccounts: (value: IAccount[]): Action<IAccount[]> => dispatch(setAccounts(value))
});

export const AddAccountPageConnected: ComponentClass<IExternalProps> = connect(
	mapStateToProps,
	mapDispatchToProps
)(AddAccountPage);
