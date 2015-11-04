var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

module.exports = React.createClass({
	componentWillMount: function(){
		this.props.dispatcher.on('assignmentSubmit', () => {
			this.forceUpdate();
		});
	},
	render: function(){
		var disabledClass='';
		if(this.props.points > this.props.student.get('points')){
			disabledClass='disabled'

		}
		return (
			<div>
				<div id="redeemed" className={disabledClass}>
					<div className="redeemBox">
						<div className="thumbnail">
							<div className="container">
								<div className="row">
									<div className="col-xs-8 col-sm-2">
										<h5>{this.props.prize}</h5>
										<p>Cost: {this.props.points} points</p>
									</div>
									<div className="col-xs-4 col-sm-2">
										<button ref="redeemButton" id="orangeBtn" className="btn btn-primary btn-small" onClick={this.onRedeem}>REDEEM</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div ref="redeemed" className="modal fade bs-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel">
								<div className="modal-dialog modal-lg">
									<div className="modal-content">
										<h1 className="blueHeader">Great Job {this.props.student.get('firstName')}!</h1>
										<div className="redeemSub">For all of your hard work you have earned</div>
										<h3 className="redeemSub">{this.props.prize}</h3>
										<h4 className="redeemSub">Keep up the great work!</h4>
									</div>
								</div>
				</div>
			</div>
		);
	},
	onRedeem:function(){
		$(this.refs.redeemed).modal('show')
		var totalPoints = this.props.student.get('points') - this.props.points;
		this.props.student.save({points: totalPoints});
		this.props.dispatcher.trigger('assignmentSubmit');
			
		

		


	}
	
})