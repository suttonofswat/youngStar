var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
var AssignmentModel = require('../models/AssignmentModel');
var divStyle = {
  	textAlign: 'right'
  	};

module.exports = React.createClass({
	
    render: function() {
			return (
            <div className="assignmentDetails">
					<div className="container">
			         	<div className="header row">
			         		<div className="col-xs-6 col-sm-8">
			         			<h3>{this.props.assignment.get('assignmentName')}</h3>
			         		</div>
	            			<div style={divStyle} className="col-sm-2 col-sm-offset-2">
	            				<button id="orangeBtn" className="detailsBtn btn btn-primary btn-small" onClick={this.onToggle}><span className="plus">+</span></button>
	            			</div>
	            		</div>
	            	</div>
	            	<div className="toggle" id={this.props.assignment.id}>
	            		<div className="container">
	            			<div className="row">
	            				<div className="col-sm-3">
					            	
						            	<div className="detailsHead">Grade: </div>
						            	<div className="detailsTxt">{this.props.assignment.get('assignmentGrade')}</div>
					            	
					            </div>
					            <div className="col-sm-3">
					            
						            	<div className="detailsHead">Points: </div>
						            	<div className="detailsTxt">{this.props.assignment.get('assignmentPoints')}</div>
					            	
					            </div>
					            <div className="col-sm-3">
						            	<div className="detailsHead">Date: </div>
						            	<div className="detailsTxt">{this.props.assignment.get('createdAt').toDateString()}</div>
					            
					            </div>
					            <div className="col-sm-3">
						            	<div className="detailsHead">Category: </div>
						            	<div className="detailsTxt">{this.props.assignment.get('assignmentType')}</div>
					            </div>
				            </div>
				         </div>
				         <div className="container">
				         	<div className="detailsNotesBox">
				         		<div className="detailsNotes"> Notes: </div>
								<span>{this.props.assignment.get('assignmentNotes')}</span>
							</div>
						</div>
	            	</div>
				</div>
        	);

        
    },
    onToggle: function(){
    	console.log(this.props.assignment);
    	$('#'+this.props.assignment.id).toggle('slow');
    }
  
});

