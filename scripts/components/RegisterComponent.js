var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');


module.exports = React.createClass({
	getInitialState: function() {
		return { error: null };
	},
	render: function() {
		var errorElement = null;
		if(this.state.error) {
			errorElement = (
				<p className="red">{this.state.error}</p>
			);
		}
		return (
			<div>
				<h1>Register</h1>
				<div className="col-md-6 col-md-offset-3 box-shadow--8dp formBlock">
						<form className="col s12" onSubmit={this.onRegister}>
								{errorElement}
							<div className="form-group">
								<label htmlFor="inputEmail3" className="col-sm-2 control-label">UserName</label>
								<div className="col-sm-10">
									<input type="text" ref="username" className="form-control" id="inputEmail3" />
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
								<div className="col-sm-10">
									<input type="text" ref="email" className="form-control" id="inputEmail3" />
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
								<div className="col-sm-10">
									<input type="password" ref="password" className="form-control" id="inputPassword3" />
								</div>
							</div>
							<div className="form-group">
								<div className="col-sm-offset-2 col-sm-10">
									<button type="submit" className="btn btn-default">Register</button>
								</div>
							</div>
						</form>
				</div>
			</div>
		);
	},
	onRegister: function(e) {
		e.preventDefault();
		var user = new Parse.User();
		user.signUp(
			{
				username: this.refs.username.value,
				password: this.refs.password.value,
				email: this.refs.email.value
			},
			{
				success: (u) => {
					this.props.router.navigate('addChild', {trigger: true});
					console.log('it worked!')
				},
				error: (u, error) => {
					this.setState({
						error: error.message
					});
				}
			}
		);
	}
});