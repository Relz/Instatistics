import { IDrawerState } from './IDrawerState';

export class DrawerState implements IDrawerState {
	private _drawerOpened: boolean = true;
	public get drawerOpened(): boolean {
		return this._drawerOpened;
	}

	public set drawerOpened(value: boolean) {
		this._drawerOpened = value;
	}
}
