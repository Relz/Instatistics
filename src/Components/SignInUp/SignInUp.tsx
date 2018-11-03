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
import { InsertChart } from '@material-ui/icons';
import HelpIcon from '@material-ui/icons/Help';
import autobind from 'autobind-decorator';
import classNames from 'classnames';
import * as React from 'react';
import { ComponentClass } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { setLocale, Translate } from 'react-redux-i18n';
import { Dispatch } from 'redux';
import { Action } from 'redux-actions';
import { ActionAlias } from '../../Core/Delegates/ActionAliases';
import { StringHelper } from '../../Core/StringHelper';
import { XMLHttpRequestHelper } from '../../Core/XMLHttpRequestHelper';
import { setToken } from '../../Redux/Actions/UserActions';
import { IState } from '../../Redux/States/IState';
import { Component } from '../Component';
import * as styles from './SignInUp.pcss';

interface IExternalProps {}

interface IDefaultProps extends IExternalProps {}

interface IReduxProps extends IDefaultProps {
	// tslint:disable-next-line:no-any
	i18n: any;
	setLocale(value: string): void;
	setToken(value: string): void;
}

type ActualProps = IReduxProps;

interface IInternalState {
	name: string;
	nameHelperText: string;
	password: string;
	passwordHelperText: string;
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
			nameHelperText: '',
			password: '',
			passwordHelperText: '',
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
				<Paper className={styles.form}>
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
									helperText={
										this.properties.i18n.translations[this.properties.i18n.locale][
											this.state.nameHelperText
										]
									}
									error={!StringHelper.isEmpty(this.state.nameHelperText)}
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
									helperText={
										this.properties.i18n.translations[this.properties.i18n.locale][
											this.state.passwordHelperText
										]
									}
									error={!StringHelper.isEmpty(this.state.passwordHelperText)}
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
	private handleSignInButtonClick(): void {
		const data: object = {
			email: this.state.name,
			password: this.state.password
		};
		XMLHttpRequestHelper.request(
			'POST',
			'http://localhost:5001/auth/sign-in',
			data,
			(token: string): void => {
				this.properties.setToken(token);
			},
			(failCode: string): void => {
				let nameHelperText: string = '';
				let passwordHelperText: string = '';
				switch (failCode) {
					case '0':
						nameHelperText = 'page_signInUp_form_login_helper_invalid';
						passwordHelperText = '';
						break;
					case '1':
						nameHelperText = 'page_signInUp_form_login_helper_textLength';
						passwordHelperText = 'page_signInUp_form_password_helper_textLength';
						break;
					default:
						nameHelperText = 'page_signInUp_form_login_helper_textRules';
						passwordHelperText = 'page_signInUp_form_password_helper_textRules';
				}
				if (failCode.includes('DuplicateUserName')) {
					nameHelperText = 'page_signInUp_form_login_helper_duplicate';
					passwordHelperText = '';
				}
				this.setState({
					nameHelperText: nameHelperText,
					passwordHelperText: passwordHelperText
				});
			}
		);
	}

	@autobind
	private handleSignUpButtonClick(): void {
		const data: object = {
			email: this.state.name,
			password: this.state.password
		};
		XMLHttpRequestHelper.request(
			'POST',
			'http://localhost:5001/auth/sign-up',
			data,
			(token: string): void => {
				this.properties.setToken(token);
			},
			(failCode: string): void => {
				let nameHelperText: string = '';
				let passwordHelperText: string = '';
				switch (failCode) {
					case '1':
						nameHelperText = 'page_signInUp_form_login_helper_textLength';
						passwordHelperText = 'page_signInUp_form_password_helper_textLength';
						break;
					default:
						nameHelperText = 'page_signInUp_form_login_helper_textRules';
						passwordHelperText = 'page_signInUp_form_password_helper_textRules';
				}
				if (failCode.includes('DuplicateUserName')) {
					nameHelperText = 'page_signInUp_form_login_helper_duplicate';
					passwordHelperText = '';
				}
				this.setState({
					nameHelperText: nameHelperText,
					passwordHelperText: passwordHelperText
				});
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
	setLocale: (value: string): Action<string> => dispatch(setLocale(value) as any),
	setToken: (value: string): Action<string> => dispatch(setToken(value))
});

export const SignInUpConnected: ComponentClass<IExternalProps> = connect(
	mapStateToProps,
	mapDispatchToProps
	// tslint:disable-next-line:no-any
)(SignInUp as any);
