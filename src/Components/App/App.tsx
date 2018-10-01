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
import { AddBox, ExitToApp, InsertChart } from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import autobind from 'autobind-decorator';
import classNames from 'classnames';
import * as React from 'react';
import { ComponentClass } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { setLocale, Translate } from 'react-redux-i18n';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { Action } from 'redux-actions';
import { ActionAlias } from '../../Core/Delegates/ActionAliases';
import { setDrawerOpened } from '../../Redux/Actions/DrawerActions';
import { IState } from '../../Redux/States/IState';
import { Component } from '../Component';
import * as styles from './App.pcss';

interface IExternalProps {}

interface IDefaultProps extends IExternalProps {}

interface IReduxProps extends IDefaultProps {
	drawerOpened: boolean;
	setDrawerOpened(value: boolean): void;
	setLocale(value: string): void;
}

type ActualProps = IReduxProps;

interface IInternalState {
	pageTitle: string;
}

class App extends Component<IExternalProps, IInternalState, ActualProps> {
	public static readonly defaultProps: IDefaultProps = {};

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
								<Typography variant="title" color="inherit" noWrap={true}>
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
						<Link to="add_account" onClick={this.setPageTitle.bind(this, 'addAccount')}>
							<ListItem button={true}>
								<ListItemIcon>
									<AddBox />
								</ListItemIcon>
								<ListItemText primary={<Translate value="drawer_menu_addAccount" />} />
							</ListItem>
						</Link>
						<ListItem button={true}>
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
							(languageName: string): JSX.Element => (
								<ListItem button={true} onClick={this.languagesHandlers.get(languageName)}>
									<ListItemText
										primary={<Translate value={`drawer_menu_language_${languageName}`} />}
									/>
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
}

const mapStateToProps: MapStateToProps<Partial<IReduxProps>, IExternalProps, IState> = (
	state: IState
): Partial<IReduxProps> => ({
	drawerOpened: state.drawer.drawerOpened
});

const mapDispatchToProps: MapDispatchToProps<Partial<IReduxProps>, IExternalProps> = (
	dispatch: Dispatch
): Partial<IReduxProps> => ({
	setDrawerOpened: (value: boolean): Action<boolean> => dispatch(setDrawerOpened(value)),
	// tslint:disable-next-line:no-any
	setLocale: (value: string): Action<string> => dispatch(setLocale(value) as any)
});

export const AppConnected: ComponentClass<IExternalProps> = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
