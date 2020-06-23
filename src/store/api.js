import { combineReducers } from 'redux';
import creator from 'common/creator';

const API_FETCH_BEGIN = 'api/beginFetch';
const API_FETCH_END = 'api/endFetch';

const API_FORM_SUBMIT = 'api/FORM_submit';
const API_FORM_SUBMIT_COMPLETE = 'api/FORM_submitComplete';

const API_REST_CREATE = 'api/REST_create';
const API_REST_CREATE_COMPLETE = 'api/REST_createComplete';

const API_REST_READ = 'api/REST_read';
const API_REST_READ_COMPLETE = 'api/REST_readComplete';

const API_REST_UPDATE = 'api/REST_update';
const API_REST_UPDATE_COMPLETE = 'api/REST_updateComplete';

const API_REST_DELETE = 'api/REST_delete';
const API_REST_DELETE_COMPLETE = 'api/REST_deleteComplete';

export const action = {
	submitForm: creator.action.callable(API_FORM_SUBMIT), // url, form, onSuccess, onError
	add: creator.action.callable(API_REST_CREATE), // url, data, onSuccess, onError
	get: creator.action.callable(API_REST_READ), // url, onSuccess, onError
	edit: creator.action.callable(API_REST_UPDATE), // url, data, onSuccess, onError
	remove: creator.action.callable(API_REST_DELETE), // url, onSuccess, onError
};

const increment = state => state + 1;
const decrement = state => state - 1;

export const reducer = combineReducers({
	activeRequests: creator.reducer.fromObject({
		[API_FETCH_BEGIN]: increment,
		[API_FETCH_END]: decrement,
	}, 0)
});

const defaultFetchOptions = {
	mode: 'cors',
	cache: 'no-cache',
	credentials: 'same-origin',
};

export const middleware = creator.middleware.fromObject({
	[API_FORM_SUBMIT]: (dispatch, action) => {
		const { url, form, onSuccess, onError } = action;

		dispatch({ type: API_FETCH_BEGIN });

		fetch(url, {
			...defaultFetchOptions,
			method: 'POST',
			headers: { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' },
			body: (form instanceof FormData) ? form : new FormData(form),
			...(action.override || {})
		}).then(response => response.json())
			.then(data => dispatch({ type: onSuccess, payload: data }))
			.catch(error => dispatch({ type: onError, payload: error }))
			.finally(() => dispatch({ type: API_FETCH_END }));
	},
	[API_REST_CREATE]: (dispatch, action) => {
		const { url, data, onSuccess, onError } = action;

		dispatch({ type: API_FETCH_BEGIN });

		fetch(url, {
			...defaultFetchOptions,
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			body: JSON.stringify(data),
			...(action.override || {})
		}).then(response => response.json())
			.then(data => dispatch({ type: onSuccess, payload: data }))
			.catch(error => dispatch({ type: onError, payload: error }))
			.finally(() => dispatch({ type: API_FETCH_END }));
	},
	[API_REST_READ]: (dispatch, action) => {
		const { url, onSuccess, onError } = action;

		dispatch({ type: API_FETCH_BEGIN });

		fetch(url, {
			...defaultFetchOptions,
			method: 'GET',
			headers: { 'Accept': 'application/json' },
			...(action.override || {})
		}).then(response => response.json())
			.then(data => dispatch({ type: onSuccess, payload: data }))
			.catch(error => dispatch({ type: onError, payload: error }))
			.finally(() => dispatch({ type: API_FETCH_END }));
	},
	[API_REST_UPDATE]: (dispatch, action) => {
		const { url, data, onSuccess, onError } = action;

		dispatch({ type: API_FETCH_BEGIN });

		fetch(url, {
			...defaultFetchOptions,
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			body: JSON.stringify(data),
			...(action.override || {})
		}).then(response => response.json())
			.then(data => dispatch({ type: onSuccess, payload: data }))
			.catch(error => dispatch({ type: onError, payload: error }))
			.finally(() => dispatch({ type: API_FETCH_END }));
	},
	[API_REST_DELETE]: (dispatch, action) => {
		const { url, onSuccess, onError } = action;

		dispatch({ type: API_FETCH_BEGIN });

		fetch(url, {
			...defaultFetchOptions,
			method: 'DELETE',
			...(action.override || {})
		}).then(response => response.json())
			.then(data => dispatch({ type: onSuccess, payload: data }))
			.catch(error => dispatch({ type: onError, payload: error }))
			.finally(() => dispatch({ type: API_FETCH_END }));
	},
});
