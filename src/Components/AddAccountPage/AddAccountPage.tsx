import { Button, FormHelperText, Grid, IconButton, TextField } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import classNames from 'classnames';
import * as React from 'react';
import { ComponentClass } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { StringHelper } from '../../Core/StringHelper';
import { IState } from '../../Redux/States/IState';
import { Component } from '../Component';
import * as styles from './AddAccountPage.pcss';
import autobind from 'autobind-decorator';

interface IExternalProps {}

interface IDefaultProps extends IExternalProps {}

interface IReduxProps extends IDefaultProps {
	i18n: any;
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
	private handleNameChange(event: any): void {
		this.setState({
			name: event.target.value
		});
	}

	@autobind
	private handlePasswordChange(event: any): void {
		this.setState({
			password: event.target.value
		});
	}

	@autobind
	private handleAddButtonClick(): void {
		console.log('Send add account request');
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
	i18n: state.i18n
});

const mapDispatchToProps: MapDispatchToProps<Partial<IReduxProps>, IExternalProps> = (): Partial<IReduxProps> => ({});

export const AddAccountPageConnected: ComponentClass<IExternalProps> = connect(
	mapStateToProps,
	mapDispatchToProps
)(AddAccountPage);
