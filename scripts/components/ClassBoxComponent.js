var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var StudentModel = require('../models/StudentModel');
var AssignmentModel = require('../models/AssignmentModel');
var LetterGradeBoxComponent = require('./LetterGradeBoxComponent');
require('bootstrap');

module.exports = React.createClass({
	//class box with modal and form

	render: function(){
		return (
			<div className="col-sm-6">
				<div className="subBox">
						<div className="row">
								<div className="col-sm-8">
								<h3 className="subjectTitle">{this.props.subject}</h3>
								</div>
								<div className="col-sm-2">
								<button type="button" id="orangeBtn" className="btn btn-primary btn-small" onClick={this.onModalLaunch}>+</button>
								</div>
						</div>
							<div ref="classBox" className="modal fade bs-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel">
								<div className="modal-dialog modal-lg">
									<div className="modal-content">
										<form className="form-horizontal" onSubmit={this.onAddAssignment}>
											<h3>Add New {this.props.subject} Grade</h3>
											<input type="text" ref="assignmentName" className="form-control" placeholder="Assignment Name" />
											<div className="form-group" id="dropdown">
	  												<select ref="assignmentType" className="form-control">
														<option disabled selected>Assignment Type</option>
														<option>Homework</option>
														<option>Project</option>
														<option>Test</option>
													</select>
											</div>
											<input type="text" ref="grade" className="form-control" placeholder="Grade" />
											<textarea className="form-control" ref="notes" rows="3" placeholder="Notes"></textarea>
											<button ref="addAssignmentButton">Add Assignment</button>
										</form>
									</div>
								</div>
							</div>
							<LetterGradeBoxComponent studentId={this.props.student.id} subject={this.props.subject} />
							<button className="viewAllAssign"><a href={`#assignmentDetails/${this.props.student.id}/${this.props.subject}`}>VIEW ALL ASSIGNMENTS</a></button>
				</div>
			</div>


		);
	},
	onModalLaunch: function() {
		//getting the modal to show
		$(this.refs.classBox).modal('show');
		this.refs.grade.value = '';
		
	},
	onAddAssignment: function(e){
	//creating points based on the grade given
		console.log(this.props);
		e.preventDefault();
		var gradePts = 0;
		if(this.refs.grade.value.toUpperCase() === 'A'){

			gradePts = parseFloat(10);
		
		}else if(this.refs.grade.value.toUpperCase() === 'B'){
			gradePts = parseFloat(5);
			
		}else if(this.refs.grade.value.toUpperCase() === 'D'){
			gradePts = parseFloat(-5);
			
		}else if(this.refs.grade.value.toUpperCase() === 'C'){
			gradePts = parseFloat(0);
		
		}else if(this.refs.grade.value.toUpperCase() === 'F'){
			gradePts = parseFloat(-10);
			
		}else{
			console.log('please enter in a grade a-f');
		}
	//on submit, having the form save the new assignment model to the server
		var newAssignment = new AssignmentModel({
			assignmentName: this.refs.assignmentName.value,
			assignmentNotes: this.refs.notes.value,
			assignmentType: this.refs.assignmentType.value,
			child: this.props.student,
			assignmentGrade: this.refs.grade.value,
			assignmentPoints: parseFloat(gradePts),
			subjectName: this.props.subject

		})
		newAssignment.save();

		$(this.refs.classBox).modal('hide');
		this.props.dispatcher.trigger('assignmentSubmit', gradePts);
		
		$(this.refs.addAssignmentButton).effect('transfer', {to: '#totalPoints', className: 'ui-effects-transfer'}, 1200)
		
		if(gradePts > 0){
			setTimeout(function(){
	  			$('#totalPoints').animate({fontSize: '3em', color: '#FCDB02'})
			}, 1000);
		}else{
			setTimeout(function(){
	  			$('#totalPoints').animate({fontSize: '.75em', color: '#660000'})
			}, 1000);
		}

		setTimeout(function(){
  			$('#totalPoints').animate({fontSize: '30px', color: '#000'})
		}, 1700);

	//having the points also saved to the student model's total points
		var totalPoints = this.props.student.get('points') + gradePts;
		this.props.student.save({points: totalPoints});

	}
	
	
	
})