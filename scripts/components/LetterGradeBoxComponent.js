var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
var AssignmentModel = require('../models/AssignmentModel');
var StudentModel = require('../models/StudentModel');
module.exports = React.createClass({
	getInitialState: function(){
		return{
			subject: [],
			student: null
		};
	},
	componentWillMount: function(){
		console.log('componentWillMount', this.props);
		//setting the child and subject to the state.
		var child =this.props.studentId;
		var targetStudentModel = new StudentModel({objectId: child});

		var query = new Parse.Query(AssignmentModel);
			query
			.equalTo('child', targetStudentModel)
			.equalTo('subjectName', this.props.subject)
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
			
			if(averageNum <= -5){
				avgGrade='F';
				
			}else if(averageNum < 0 && averageNum > -5){
				avgGrade='D';
				
			}else if(averageNum >= 0 && averageNum < 5){
				avgGrade='C';
				
			}else if(averageNum >= 5 && averageNum < 10){
				avgGrade='B';
				
			}else if(averageNum >= 10){
				avgGrade='A';
				
			}
			return (
            <div className="avgGradeBox">
            	<div className="gradeTxt">Average {this.props.subject} Grade:</div>
            	<div className="grade">{avgGrade}</div>
            </div>
        	);
		}
        
    }
});

