import classNames from 'classnames';
import {
	AppBar,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { ComponentClass } from 'react';
import { Action } from 'redux-actions';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IState } from '../../Redux/States/IState';
import { Component } from '../Component';
import { setDrawerOpened } from '../../Redux/Actions/DrawerActions';
import * as styles from './App.pcss';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { AddBox, ExitToApp, InsertChart } from '@material-ui/icons';

interface IExternalProps {}

interface IDefaultProps extends IExternalProps {}

interface IReduxProps extends IDefaultProps {
	drawerOpened: boolean;
	setDrawerOpened(value: boolean): void;
}

type ActualProps = IReduxProps;

class App extends Component<IExternalProps, {}, ActualProps> {
	public static readonly defaultProps: IDefaultProps = {};

	public constructor(props: IExternalProps) {
		super(props);

		this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
		this.handleDrawerClose = this.handleDrawerClose.bind(this);
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
							Page title
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
						<Link to="/" className={styles.logoBlock}>
							<InsertChart />
							<div>
								<Typography variant="title" color="inherit" noWrap={true}>
									Instatistics
								</Typography>
							</div>
						</Link>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>
						<Link to="add_account">
							<ListItem button={true}>
								<ListItemIcon>
									<AddBox />
								</ListItemIcon>
								<ListItemText primary="Add an account" />
							</ListItem>
						</Link>
						<ListItem button={true}>
							<ListItemIcon>
								<ExitToApp />
							</ListItemIcon>
							<ListItemText primary="Sign out" />
						</ListItem>
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

	private handleDrawerOpen(): void {
		this.properties.setDrawerOpened(true);
	}

	private handleDrawerClose(): void {
		this.properties.setDrawerOpened(false);
	}
}

const mapStateToProps: MapStateToProps<Partial<IReduxProps>, IExternalProps, IState> = (
	state: IState
): Partial<IReduxProps> => ({
	drawerOpened: state.drawer.drawerOpened
});

const mapDispatchToProps: MapDispatchToProps<Partial<IReduxProps>, IExternalProps> = (
	dispatch: Dispatch<boolean>
): Partial<IReduxProps> => ({ setDrawerOpened: (value: boolean): Action<boolean> => dispatch(setDrawerOpened(value)) });

export const AppConnected: ComponentClass<IExternalProps> = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
