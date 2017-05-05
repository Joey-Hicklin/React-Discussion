export const fakeLocation = {
	action: 'PUSH',
	hash: '',
	key: 'y2moll',
	pathname: '/a1',
	query: {},
	search: ''
}

export const fakeParams = {
	focusPath: 'a1'
}

export const fakeStore = {
	topics: {
		a1: {
			_id: '58e6b7d57fa99835a04970fc',
			content: 'content',
			dates_discussed: [
				'2017-05-01T07:00:00.000Z'
			],
			postNum: {
				agree: 1,
				neutral: 1,
				disagree: 1
			}
		}
	},
	tracker: {
		main: 'a1',
		topicIsFetching: false,
		topicPostIsFetching: false,
		postNumIsFetching: false,
		postIsFetching: false,
		shownPosts: [{
			_id: '590a356d28ead3431c947ea4',
			author: '58c05407e19b2436746268ee',
			date_posted: '2017-05-08T05:42:46.132Z',
			response_main: '58e6b7d57fa99835a04970fc',
			response_statement: '58e6b7d57fa99835a04970fc',
			response_in: 0,
			expiration: '2017-05-08T06:59:59.999Z',
			overall_rating: 0,
			statements: [{
				_id: '590a356d28ead3431c947ea1',
				order: 0,
				content: 'content',
				current_edit: true,
				edit_num: 0,
				ratings: {
					RI: [{
						user: '58c05407e19b2436746268e6',
						_id: '590a356d28ead3431c947ebb'
					}],
					NH: [{
						user: '58c05407e19b2436746268e6',
						_id: '590a356d28ead3431c947ebb'
					}],
					WS: [{
						user: '58c05407e19b2436746268e6',
						_id: '590a356d28ead3431c947ebb'
					}],
				}
			}]
		}],
	},
	posts: {
		a90a356d28ead3431c947ea4: {
			author: '58c05407e19b2436746268ee',
			date_posted: '2017-05-08T05:42:46.132Z',
			response_main: '58e6b7d57fa99835a04970fc',
			response_statement: '58e6b7d57fa99835a04970fc',
			response_in: 0,
			expiration: '2017-05-08T06:59:59.999Z',
			overall_rating: 0,
			statements: [{
				_id: '590a356d28ead3431c947ea1',
				order: 0,
				content: 'content',
				current_edit: true,
				edit_num: 0,
				ratings: {
					RI: [{
						user: '58c05407e19b2436746268e6',
						_id: '590a356d28ead3431c947ebb'
					}],
					NH: [{
						user: '58c05407e19b2436746268e6',
						_id: '590a356d28ead3431c947ebb'
					}],
					WS: [{
						user: '58c05407e19b2436746268e6',
						_id: '590a356d28ead3431c947ebb'
					}],
				}
			}]
		}
	}
}

export const fakeProps = Object.assign({}, {
	location: {...fakeLocation},
	params: {...fakeParams},
	...fakeStore
});
