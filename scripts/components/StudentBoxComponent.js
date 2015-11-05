var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
require('bootstrap');
var StudentModel = require('../models/StudentModel');

module.exports = React.createClass({

	render: function(){
		return (
			<div>
				<h3>{this.props.child.get('firstName')}</h3>
				<a href={'#pointBoard/'+this.props.child.id}>work!</a>
			</div>


		);
	}
	
	
})