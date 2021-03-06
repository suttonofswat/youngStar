var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
var AssignmentModel = require('../models/AssignmentModel');
var StudentModel = require('../models/StudentModel');
var LetterGradeBoxComponent = require('./LetterGradeBoxComponent');
var ListDetailsComponent = require('./ListDetailsComponent');
window.$ = require('jquery');
window.jQuery = $;

module.exports = React.createClass({
	getInitialState: function(){
		return{
			subject: [],
			student: null
		};
	},
	componentWillMount: function(){
		//setting the child and subject to the state.
		var child =this.props.studentId;
		var targetStudentModel = new StudentModel({objectId: child});

		var query = new Parse.Query(AssignmentModel);
			query
			.equalTo('child', targetStudentModel)
			.equalTo('subjectName', this.props.subject)
			.descending('createdAt')
			.find().then(
				(subject) => {
					var newQuery = new Parse.Query(StudentModel);
						newQuery.get(this.props.studentId).then(
						(student) => {
						this.setState({student: student, subject: subject});
					},
					(err) => {
						console.log(err);
					}
				)
				},
				(err) => {
					console.log(err);
				}
			)
		
	},

    render: function() {
   	//mapping through the subject to return the detailed information about that students subject
    	var subjectAssignment = this.state.subject
		.map(function(assignment) {
			return(
				<ListDetailsComponent assignment={assignment}/>
			)
		});
		
		//checking to make sure the student and subject has loaded.
		if(!this.state.student || !this.state.subject){
			return(
					<div>
						Loading..
					</div>
				)
		}else{
			//getting the sum of all of the grade points, then getting the average grade for that subject.
			
			var myArray = [];
			this.state.subject.forEach(function(index) {
				myArray.push(index.get('assignmentPoints'));
			})
			var totalNumbers = 0
			myArray.length > 0 ? totalNumbers = myArray.reduce(function(a,b) {return a + b;}) : '';
			var averageNum = totalNumbers/myArray.length;

			var avgGrade='';
			if(averageNum === -10 ){
				avgGrade='F';
				console.log(avgGrade);
			}else if(averageNum === -5){
				avgGrade='D';
				console.log(avgGrade);
			}else if(averageNum === 0){
				avgGrade='C';
				console.log(avgGrade);
			}else if(averageNum === 5){
				avgGrade='B';
				console.log(avgGrade);
			}else if(averageNum > 6){
				avgGrade='A';
				console.log(avgGrade);
			}
			return (
            <div>
            	<h1>{this.state.student.get('firstName')}'s {this.props.subject} Assignments</h1>
            	<div className="container">
	            	<div className="row">
	            		<div className="col-sm-4">
			            	<LetterGradeBoxComponent studentId={this.state.student.id} subject={this.props.subject} />
			            </div>
			            <div className="col-sm-4">
			            	<div className="avgGradeBox">
				            	<div className="gradeTxt">Total Points to date: </div>
				            	<div className="grade">{totalNumbers}</div>
			            	</div>
			            </div>
		            </div>
		         </div>
		         <div className="container">
		         	<div className="row">
		         		<div className="col-sm-8">
		         		{subjectAssignment}
            			</div>
            		</div>
            	</div>
            </div>
        	);
		}
        
    }
    
});

