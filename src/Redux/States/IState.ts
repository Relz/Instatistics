import { I18nState } from 'react-redux-i18n';
import { IDrawerState } from './DrawerState/IDrawerState';

export interface IState {
	i18n: I18nState;
	drawer: IDrawerState;
}
