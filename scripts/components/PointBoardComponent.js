var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
var StudentModel = require('../models/StudentModel');
var ClassBoxComponent = require('./ClassBoxComponent');
var RedeemBoxComponent = require('./RedeemBoxComponent');

module.exports = React.createClass({
	getInitialState: function(){
		return{
			student: null
		}
	},
	componentWillMount: function() {
	//once new grade is added, dispatcher will update the grade automatically without a refresh
		this.dispatcher = {};
   		_.extend(this.dispatcher, Backbone.Events);
		this.dispatcher.on('assignmentSubmit', () => {
      	this.forceUpdate();
   	 });
		this.props.router.on('route', () => {
			this.fetchBoard();
		});
		this.fetchBoard();
	},
	render: function(){
		//checking to make sure the student and subject has loaded.
		if(!this.state.student){
			return(
					<div>
						Loading..
					</div>
				)
		}else{
		//passing through information about the student and subject to the classboxcomponent.
			console.log(this.state.student);
			return (
				<div>
					<div className="container">
						<div className="row">
							<span className="kHead col-sm-8"><h2>{this.state.student.get('firstName')}s Star Board</h2></span>
							<span className="currentPts col-sm-4"><h2 ref="currentPts" id="totalPoints">Current Points: {this.state.student.get('points')}</h2></span>
						</div>					
					</div>
					<hr />
					<div className="container">
						<div className="row">
							<div className="col-sm-8" id="subjectBoxes">
										<ClassBoxComponent dispatcher={this.dispatcher} student={this.state.student} subject="Math"/>
										<ClassBoxComponent dispatcher={this.dispatcher} student={this.state.student} subject="Science"/>
										<ClassBoxComponent dispatcher={this.dispatcher} student={this.state.student} subject="Reading"/>
										<ClassBoxComponent dispatcher={this.dispatcher} student={this.state.student} subject="Social Studies"/>
							</div>
							<div className="col-sm-4" id="redeemHolder">
								<RedeemBoxComponent dispatcher={this.dispatcher} student={this.state.student} points="40" prize="an Afternoon Activity"/>
								<RedeemBoxComponent dispatcher={this.dispatcher} student={this.state.student} points="60" prize="Your Favorite Dinner"/>
								<RedeemBoxComponent dispatcher={this.dispatcher} student={this.state.student} points="80" prize="Movie Night of Your Choice"/>
								<RedeemBoxComponent dispatcher={this.dispatcher} student={this.state.student} points="100" prize="a Yogurt Trip"/>
							</div>
						</div>
					</div>
				</div>
					

			);
		}
	},
	fetchBoard: function(){
	//setting the state for the student
		var query = new Parse.Query(StudentModel);
			query.get(this.props.studentId).then(
				(student) => {
					this.setState({student: student});
				},
				(err) => {
					console.log(err);
				}
			)
	

	}

	
	
});