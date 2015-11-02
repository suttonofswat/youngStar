var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
var AssignmentModel = require('../models/AssignmentModel');
var StudentModel = require('../models/StudentModel');
module.exports = React.createClass({
	render: function(){
		return (
			<div>
				Letter Grade:
				{this.props.letterGrade}
			</div>
		);
	}
});

