import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { AppConnected } from './App';

describe('AppConnected component', () => {
	let appComponent: ShallowWrapper<undefined, undefined>;
	beforeEach(() => (appComponent = shallow(<AppConnected />)));
	it('Should render without error', () => expect(appComponent.length).toBe(1));
});
