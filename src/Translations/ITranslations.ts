import { TranslationObjects } from 'react-redux-i18n';
import { ITranslation } from './ITranslation';

export interface ITranslations extends TranslationObjects {
	en: ITranslation;
	ru: ITranslation;
}
