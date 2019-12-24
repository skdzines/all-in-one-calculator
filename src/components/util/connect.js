import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

const ConnectWrapper = (component, mapToProps) => {
	const mapStateToProps = (state) => {
		let mappedState = {};
		(mapToProps.state || []).forEach(item => {
			mappedState[item] = state[item];
		});
		return mappedState;
	}

	const mapDispatchToProps = (dispatch) => {
		if(mapToProps.actions) {
			let actions = {};
			Object.keys(mapToProps.actions).forEach(actionObjectName => {
				actions[actionObjectName] = bindActionCreators(mapToProps.actions[actionObjectName], dispatch);
			});
			return { actions };
		}
		return {};
	}

	return connect(mapStateToProps, mapDispatchToProps)(component);
}

export default ConnectWrapper;
