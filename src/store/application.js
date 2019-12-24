import { combineReducers } from 'redux';
import { action as apiAction } from 'store/api';
import creator from 'redux-boilerplate-reduction';

// Actions

const APP_CLOSE = 'app/applicationClosed';
const APP_INIT = 'app/applicationInitialized';
const APP_LOADED = 'app/applicationLoaded';
const APP_DATA_LOAD = 'app/applicationDataLoad';
const APP_DATA_LOADED = 'app/applicationDataLoaded';
const APP_DATA_FAILED = 'app/applicationDataFailed';

export const action = {
	initialize: creator.action.eventHandler(APP_INIT),
	close: creator.action.eventHandler(APP_CLOSE),
	load: creator.action.eventHandler(APP_DATA_LOAD, { url: 'http://jsonplaceholder.typicode.com/posts' })
};

export const reducer = combineReducers({
	initialized: creator.reducer.fromObject({
		[APP_INIT]: (state) => true,
		[APP_CLOSE]: (state) => false
	}, false),
	posts: creator.reducer.fromObject({
		[APP_DATA_LOADED]: (state, action) => ([ ...action.payload ])
	}, [])
});

export const middleware = creator.middleware.fromObject({
	[APP_INIT]: (dispatch) => dispatch({ type: APP_LOADED }),
	[APP_DATA_LOAD]: (dispatch, action) => dispatch(apiAction.get({ url: action.url, onSuccess: APP_DATA_LOADED, onError: APP_DATA_FAILED }))
});
