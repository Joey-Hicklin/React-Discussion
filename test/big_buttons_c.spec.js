import React from 'react';

import SmartBigButtons from '../dev/js/containers/big_buttons_c';

const wrapper = mount(
	<Provider store={store}>
		<SmartBigButtons
			location = {{...fakeLocation}}
			params = {{...fakeParams}}
		/>
	</Provider>
);

describe('<SmartBigButtons/>', function () {

	it('renders without exploding', () => {
		expect(wrapper).to.have.length(1);
	});
});
