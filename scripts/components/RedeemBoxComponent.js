var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

module.exports = React.createClass({
	render: function(){
		return (
			<div className="redeemBox">
				<div className="thumbnail">
					<div className="container">
						<div className="row">
							<div className="col-xs-8 col-sm-2">
								<h5>{this.props.prize}</h5>
								<p>Cost: {this.props.points} points</p>
							</div>
							<div className="col-xs-4 col-sm-2">
								<button id="orangeBtn" className="btn btn-primary btn-small" onClick={this.onRedeem}>REDEEM</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
	onRedeem:function(){
		// console.log(this.props.student.get('points'));
		var totalPoints = this.props.student.get('points') - this.props.points;
		this.props.student.save({points: totalPoints});
		this.props.dispatcher.trigger('assignmentSubmit');

	}
	
})