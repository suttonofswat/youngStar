var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
var StudentModel = require('../models/StudentModel');
var StudentBoxComponent = require('./StudentBoxComponent');

module.exports = React.createClass({
	getInitialState: function(){
		return{
			allStudents: []
		}
	},
	componentWillMount: function(){
		//setting the child and subject to the state.
		var query = new Parse.Query(StudentModel);
			query.equalTo('parent', Parse.User.current());
			query.find().then(
					(students) =>{
						this.setState({allStudents: students})
					}

				);
		
	},
    render: function() {
    	console.log(this.state.allStudents);
    		if(!this.state.allStudents){
				return(
						<div>
							Loading..
						</div>
					)
			}else{
				var kidBoards = this.state.allStudents
				.map((child) => {
					return(
						<StudentBoxComponent child={child} />
						)

				})
			return (
			<div>
	            <div>
	            	<h1>View Boards:</h1>
	            	<hr />
	            	{kidBoards}
	            </div>
	            <div className="col-sm-10">
	            	<button className="viewAllAssign new"><a href={'#addChild'}>+Add a youngStar</a></button>
	            </div>
	          </div>
        	);
		}
        
    }
    
});

