import {
	AppBar,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Toolbar,
	Typography
} from '@material-ui/core';
import { AddBox, ExitToApp, InsertChart, Person } from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import autobind from 'autobind-decorator';
import classNames from 'classnames';
import { History } from 'history';
import * as React from 'react';
import { ComponentClass } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { setLocale, Translate } from 'react-redux-i18n';
import { Link, Route, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { Action } from 'redux-actions';
import { ActionAlias } from '../../Core/Delegates/ActionAliases';
import { Account } from '../../Models/Account/Account';
import { IAccount } from '../../Models/Account/IAccount';
import { setDrawerOpened } from '../../Redux/Actions/DrawerActions';
import { setAccounts, setActiveAccountIndex, setToken } from '../../Redux/Actions/UserActions';
import { IState } from '../../Redux/States/IState';
import { AddAccountPageConnected } from '../AddAccountPage/AddAccountPage';
import { Component } from '../Component';
import { WelcomePageConnected } from '../WelcomePage/WelcomePage';
import * as styles from './App.pcss';

interface IExternalProps {}

interface IDefaultProps extends IExternalProps {
	accounts: IAccount[];
}

interface IReduxProps extends IDefaultProps {
	activeAccountIndex?: number;
	drawerOpened: boolean;
	locale: string;
	setAccounts(value: IAccount[]): void;
	setActiveAccountIndex(value: number | undefined): void;
	setDrawerOpened(value: boolean): void;
	setLocale(value: string): void;
	setToken(value: string): void;
}

interface IActualProps extends IReduxProps {
	history: History;
}

interface IInternalState {
	pageTitle: string;
}

class App extends Component<IExternalProps, IInternalState, IActualProps> {
	public static readonly defaultProps: IDefaultProps = {
		accounts: []
	};

	private static readonly languagesNames: string[] = ['en', 'ru'];

	private readonly languagesHandlers: Map<string, ActionAlias> = new Map<string, ActionAlias>();

	public constructor(props: IExternalProps) {
		super(props);

		this.state = {
			pageTitle: 'page_welcome_title'
		};

		App.languagesNames.forEach(
			(languageName: string): void => {
				this.languagesHandlers.set(languageName, this.handleChooseLanguage.bind(this, languageName));
			}
		);

		this.properties.setAccounts([
			new Account('login1', 'password1'),
			new Account('login2', 'password2'),
			new Account('login3', 'password3')
		]);
	}

	public render(): JSX.Element {
		return (
			<div className={styles.root}>
				<AppBar
					className={classNames(styles.appBar, {
						[styles.appBarShift]: this.properties.drawerOpened
					})}
				>
					<Toolbar disableGutters={!this.properties.drawerOpened}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
							className={classNames(styles.menuButton, this.properties.drawerOpened && styles.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="inherit" noWrap={true}>
							<Translate value={this.state.pageTitle} />
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="persistent"
					anchor="left"
					open={this.properties.drawerOpened}
					className={classNames(styles.drawer)}
					classes={{
						paper: styles.drawerPaper
					}}
				>
					<div className={styles.drawerHeader}>
						<Link to="/" className={styles.logoBlock} onClick={this.setPageTitle.bind(this, 'welcome')}>
							<InsertChart />
							<div>
								<Typography
									variant="title"
									color={this.state.pageTitle === 'page_welcome_title' ? 'inherit' : 'default'}
									noWrap={true}
								>
									<Translate value="service_name" />
								</Typography>
							</div>
						</Link>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>
						<Link to="/add_account" onClick={this.setPageTitle.bind(this, 'addAccount')}>
							<ListItem button={true} selected={this.state.pageTitle === 'page_addAccount_title'}>
								<ListItemIcon>
									<AddBox />
								</ListItemIcon>
								<ListItemText primary={<Translate value="drawer_menu_addAccount" />} />
							</ListItem>
						</Link>
						{this.properties.accounts.map(
							(account: IAccount, index: number): JSX.Element => (
								<Link to="/statistics" key={index} onClick={this.handleChooseAccount.bind(this, index)}>
									<ListItem
										button={true}
										selected={
											this.properties.activeAccountIndex === index &&
											this.state.pageTitle === 'page_statistics_title'
										}
									>
										<ListItemIcon>
											<Person />
										</ListItemIcon>
										<ListItemText primary={account.login} />
									</ListItem>
								</Link>
							)
						)}
						<ListItem button={true} onClick={this.handleSignOutClick}>
							<ListItemIcon>
								<ExitToApp />
							</ListItemIcon>
							<ListItemText primary={<Translate value="drawer_menu_signOut" />} />
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListSubheader className={styles.languagesSubheader}>
							<Translate value="drawer_menu_language_title" />
							<Divider />
						</ListSubheader>
						{App.languagesNames.map(
							(languageName: string, index: number): JSX.Element => (
								<ListItem
									key={index}
									button={true}
									onClick={this.languagesHandlers.get(languageName)}
									selected={this.properties.locale === languageName}
								>
									<ListItemText primary={<Translate value={`language_${languageName}`} />} />
								</ListItem>
							)
						)}
					</List>
				</Drawer>
				<main
					className={classNames(styles.content, {
						[styles.contentShift]: this.properties.drawerOpened
					})}
				>
					<div className={styles.drawerHeader} />
					<Route exact={true} path="/" component={WelcomePageConnected} />
					<Route path="/add_account" component={AddAccountPageConnected} />
				</main>
			</div>
		);
	}

	@autobind
	private handleDrawerOpen(): void {
		this.properties.setDrawerOpened(true);
	}

	@autobind
	private handleDrawerClose(): void {
		this.properties.setDrawerOpened(false);
	}

	private setPageTitle(pageName: string): void {
		this.setState({ pageTitle: `page_${pageName}_title` });
	}

	private handleChooseLanguage(language: string): void {
		this.properties.setLocale(language);
	}

	@autobind
	private handleSignOutClick(): void {
		this.properties.history.push('');
		this.properties.setToken('');
	}

	@autobind
	private handleChooseAccount(accountIndex: number): void {
		this.properties.setActiveAccountIndex(accountIndex);
		this.setPageTitle('statistics');
	}
}

const mapStateToProps: MapStateToProps<Partial<IReduxProps>, IExternalProps, IState> = (
	state: IState
): Partial<IReduxProps> => ({
	accounts: state.user.accounts,
	activeAccountIndex: state.user.activeAccountIndex,
	drawerOpened: state.drawer.drawerOpened,
	locale: state.i18n.locale
});

const mapDispatchToProps: MapDispatchToProps<Partial<IReduxProps>, IExternalProps> = (
	dispatch: Dispatch
): Partial<IReduxProps> => ({
	setAccounts: (value: IAccount[]): Action<IAccount[]> => dispatch(setAccounts(value)),
	setActiveAccountIndex: (value: number | undefined): Action<number | undefined> =>
		dispatch(setActiveAccountIndex(value)),
	setDrawerOpened: (value: boolean): Action<boolean> => dispatch(setDrawerOpened(value)),
	// tslint:disable-next-line:no-any
	setLocale: (value: string): Action<string> => dispatch(setLocale(value) as any),
	setToken: (value: string): Action<string> => dispatch(setToken(value))
});

export const AppConnected: ComponentClass<IExternalProps> = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
	// tslint:disable-next-line:no-any
)(App) as any);
