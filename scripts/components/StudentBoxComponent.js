var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
require('bootstrap');
var StudentModel = require('../models/StudentModel');

module.exports = React.createClass({

	render: function(){
		return (
			<div className="dashboardPg col-sm-4">
				<div className="subBox">
						<div className="row">
								<div className="col-xs-10 col-sm-2">
								<h3 className="subjectTitle">{this.props.child.get('firstName')}</h3>
								</div>
						</div>
							<button className="orangeBtn dash"><a href={'#pointBoard/'+this.props.child.id}>VIEW BOARD</a></button>
				</div>
			</div>



		);
	}
	
	
})