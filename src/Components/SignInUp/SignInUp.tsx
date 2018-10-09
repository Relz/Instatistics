import * as React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import { ComponentClass } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IState } from '../../Redux/States/IState';
import { Component } from '../Component';
import {
	Button,
	FormHelperText,
	Grid,
	IconButton,
	ListItem,
	ListItemText,
	Paper,
	TextField,
	Typography
} from '@material-ui/core';
import { setLocale, Translate } from 'react-redux-i18n';
import autobind from 'autobind-decorator';
import * as styles from './SignInUp.pcss';
import { StringHelper } from '../../Core/StringHelper';
import classNames from 'classnames';
import { InsertChart } from '@material-ui/icons';
import { ActionAlias } from '../../Core/Delegates/ActionAliases';
import { Action } from 'redux-actions';
import { Dispatch } from 'redux';
import { XMLHttpRequestHelper } from '../../Core/XMLHttpRequestHelper';

interface IExternalProps {}

interface IDefaultProps extends IExternalProps {}

interface IReduxProps extends IDefaultProps {
	i18n: any;
	setLocale(value: string): void;
}

type ActualProps = IReduxProps;

interface IInternalState {
	name: string;
	password: string;
	showSignInUpDisablingExplanation: boolean;
}

class SignInUp extends Component<IExternalProps, IInternalState, ActualProps> {
	public static readonly defaultProps: IDefaultProps = {};

	private static readonly languagesNames: string[] = ['en', 'ru'];

	private readonly languagesHandlers: Map<string, ActionAlias> = new Map<string, ActionAlias>();

	public constructor(props: IExternalProps) {
		super(props);

		this.state = {
			name: '',
			password: '',
			showSignInUpDisablingExplanation: false
		};

		SignInUp.languagesNames.forEach(
			(languageName: string): void => {
				this.languagesHandlers.set(languageName, this.handleChooseLanguage.bind(this, languageName));
			}
		);
	}

	public render(): JSX.Element {
		return (
			<Grid container={true} direction="column" justify="center" alignItems="center">
				<Grid item={true} container={true} direction="row" justify="center" alignItems="center">
					<InsertChart fontSize="large" />
					<div>
						<Typography variant="title" color="inherit">
							<Translate value="service_name" />
						</Typography>
					</div>
				</Grid>
				<Paper className={styles.form} elevation={1}>
					<Grid
						item={true}
						container={true}
						direction="column"
						justify="center"
						alignItems="flex-start"
						spacing={8}
						className={classNames(styles.autoWidth)}
					>
						<Grid item={true}>
							<Typography variant="title" color="inherit">
								<Translate value="page_signInUp_form_title" />
							</Typography>
						</Grid>
						<Grid
							item={true}
							container={true}
							direction="column"
							justify="center"
							alignItems="stretch"
							className={classNames(styles.autoWidth)}
						>
							<Grid item={true}>
								<TextField
									label={
										this.properties.i18n.translations[this.properties.i18n.locale][
											'page_signInUp_form_login_label'
										]
									}
									value={this.state.name}
									onChange={this.handleNameChange}
									margin="normal"
									required={true}
									className={styles.input}
								/>
							</Grid>
							<Grid item={true}>
								<TextField
									type="password"
									label={
										this.properties.i18n.translations[this.properties.i18n.locale][
											'page_signInUp_form_password_label'
										]
									}
									value={this.state.password}
									onChange={this.handlePasswordChange}
									margin="normal"
									required={true}
									className={styles.input}
								/>
							</Grid>
							<Grid
								item={true}
								container={true}
								direction="row"
								justify="space-between"
								alignItems="center"
							>
								<Grid
									item={true}
									container={true}
									alignItems="flex-start"
									direction="column"
									justify="flex-start"
									className={styles.autoWidth}
								>
									<Grid
										item={true}
										container={true}
										alignItems="flex-start"
										direction="row"
										justify="space-between"
										className={styles.autoWidth}
									>
										<Grid
											item={true}
											container={true}
											alignItems="center"
											direction="row"
											justify="flex-start"
											className={styles.autoWidth}
										>
											<Grid item={true}>
												<Button
													variant="contained"
													size="medium"
													color="primary"
													onClick={this.handleSignInButtonClick}
													disabled={StringHelper.isAnyEmpty(
														this.state.name,
														this.state.password
													)}
												>
													<Translate value="page_signInUp_form_signInButton_text" />
												</Button>
											</Grid>
											<Grid item={true}>
												<IconButton
													aria-label="Show disabling explanation icon button"
													className={classNames(
														!StringHelper.isAnyEmpty(
															this.state.name,
															this.state.password
														) && styles.hidden
													)}
													onClick={this.handleShowSignInUpDisablingExplanation}
												>
													<HelpIcon fontSize="small" />
												</IconButton>
											</Grid>
										</Grid>
										<Grid
											item={true}
											container={true}
											alignItems="center"
											direction="row"
											justify="flex-start"
											className={styles.autoWidth}
										>
											<Grid item={true}>
												<Button
													variant="contained"
													size="medium"
													color="primary"
													onClick={this.handleSignUpButtonClick}
													disabled={StringHelper.isAnyEmpty(
														this.state.name,
														this.state.password
													)}
												>
													<Translate value="page_signInUp_form_signUpButton_text" />
												</Button>
											</Grid>
											<Grid item={true}>
												<IconButton
													aria-label="Show disabling explanation icon button"
													className={classNames(
														!StringHelper.isAnyEmpty(
															this.state.name,
															this.state.password
														) && styles.hidden
													)}
													onClick={this.handleShowSignInUpDisablingExplanation}
												>
													<HelpIcon fontSize="small" />
												</IconButton>
											</Grid>
										</Grid>
									</Grid>
									<Grid item={true}>
										<FormHelperText
											error={true}
											className={classNames(
												(!this.state.showSignInUpDisablingExplanation ||
													!StringHelper.isAnyEmpty(this.state.name, this.state.password)) &&
													styles.hidden
											)}
										>
											<Translate value="page_signInUp_form_signInUpButton_disabledHelpText" />
										</FormHelperText>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
				<Grid
					item={true}
					container={true}
					direction="row"
					justify="center"
					alignItems="center"
					className={styles.languages}
				>
					{SignInUp.languagesNames.map(
						(languageName: string, index: number): JSX.Element => (
							<ListItem
								key={index}
								button={true}
								onClick={this.languagesHandlers.get(languageName)}
								selected={this.properties.i18n.locale === languageName}
								className={styles.autoWidth}
							>
								<ListItemText primary={<Translate value={`language_${languageName}`} />} />
							</ListItem>
						)
					)}
				</Grid>
			</Grid>
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
	private handleSignInButtonClick(): void {
		const data = {
			email: this.state.name,
			password: this.state.password
		};
		XMLHttpRequestHelper.request(
			'POST',
			'http://localhost:5001/auth/sign-in',
			data,
			(token: string): void => {
				console.log(token);
			},
			(progressEvent: ProgressEvent): void => {
				console.log(progressEvent);
			}
		);
	}

	@autobind
	private handleSignUpButtonClick(): void {
		const data = {
			email: this.state.name,
			password: this.state.password
		};
		XMLHttpRequestHelper.request(
			'POST',
			'http://localhost:5001/auth/sign-up',
			data,
			(token: string): void => {
				console.log(token);
			},
			(progressEvent: ProgressEvent): void => {
				console.log(progressEvent);
			}
		);
	}

	@autobind
	private handleShowSignInUpDisablingExplanation(): void {
		this.setState({
			showSignInUpDisablingExplanation: true
		});
	}

	private handleChooseLanguage(language: string): void {
		this.properties.setLocale(language);
	}
}

const mapStateToProps: MapStateToProps<Partial<IReduxProps>, IExternalProps, IState> = (
	state: IState
): Partial<IReduxProps> => ({ i18n: state.i18n });

const mapDispatchToProps: MapDispatchToProps<Partial<IReduxProps>, IExternalProps> = (
	dispatch: Dispatch
): Partial<IReduxProps> => ({
	// tslint:disable-next-line:no-any
	setLocale: (value: string): Action<string> => dispatch(setLocale(value) as any)
});

export const SignInUpConnected: ComponentClass<IExternalProps> = connect(
	mapStateToProps,
	mapDispatchToProps
	// tslint:disable-next-line:no-any
)(SignInUp as any);
