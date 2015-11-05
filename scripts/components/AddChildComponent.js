var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var StudentModel = require('../models/StudentModel');

module.exports = React.createClass({
	getInitialState: function(){
		return{
			subjects: [],
			rewardsObj: {},
			both: []
			
		};
	},
	render: function(){
		var subjectsRows = this.state.subjects.map(function(subject){
			return(
				<div>
					<div>{subject}</div>
				</div>
			)
		});
		var rewardRows = this.state.both.map(function(reward, index){
			return(
				<div key={"rewards"+index}>{reward.rewards+": "+reward.points}</div>
			)
		});
		
		return (
			<div>
				<h3>Add a youngStar</h3>
						<div className="container">
							<div className="row">
								<label className="col-sm-2 control-label">Childs First Name:</label>
								<div className="col-sm-10">
									<input type="text" ref="firstName" className="form-control" />
								</div>
							</div>
						</div>
						<div className="container">
							<div className="row">
								<label className="col-sm-2 control-label">Classes:</label>
								<div className="col-sm-8">
									<input type="text" ref="subject" className="form-control" />
								</div>
								<div className="col-sm-2">
									<button onClick={this.onAddSubject}>+</button>
								</div>
								<div>
									{subjectsRows}
								</div>
							</div>
						</div>
			
						<div className="container">
							<div className="row">
								<label className="col-sm-2 control-label">Rewards:</label>
								<div className="col-sm-4">
									<input type="text" ref="reward" className="form-control" />
								</div>
								<label className="col-sm-2 control-label">Point Value:</label>
								<div className="col-sm-2">
									<input type="text" ref="points" className="form-control" />
								</div>
								<div className="col-sm-2">
									<button onClick={this.onAddReward}>+</button>
								</div>
							</div>
						</div>
						<div className="container">
							<div className="row">
								<button onClick={this.onAddChild}>Add youngStar</button>
								{rewardRows}
							</div>
						</div>
			</div>
		);
	},
	onAddChild: function(){
		var newChild = new StudentModel({
			firstName: this.refs.firstName.value,
			parent: Parse.User.current(),
			points: 0,
			subjects: this.state.subjects,
			rewards: this.state.both
		})
		newChild.save();
		this.refs.firstName.value = ''; 

	},
	onAddSubject: function(){
		var newSubject = this.refs.subject.value;
		var currentSubjects = this.state.subjects;
		currentSubjects.push(newSubject);
		this.setState({subjects: currentSubjects}),
		this.refs.subject.value = ''; 
	
	},
	onAddReward: function(){
		var rewardsObj = {};
		var rewardsArray = [...this.state.both];
		var newReward = this.refs.reward.value;
		var newPoints = this.refs.points.value;
		rewardsObj.rewards = newReward;
		rewardsObj.points = newPoints;
		rewardsArray.push(rewardsObj);
		this.setState({both: rewardsArray});
	}

	
})