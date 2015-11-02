var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var StudentModel = require('../models/StudentModel');



module.exports = React.createClass({
	getInitialState: function(){
		return{
			allStudents: []
		}
	},
	//on load, fetching the students from parse and forcing the nav to update with that info.
	componentWillMount: function() {
		this.fetchStudents();
		this.props.router.on('route', () => {
			this.forceUpdate();
		});

		this.props.router.on('login', () => {
			this.fetchStudents();
			console.log('test')
			
		});
			

	},
	render: function(){
		var currentUser = Parse.User.current();
		var Links = [];
		var BtnLinks = [];
	//pushing links to the navigation based on who is logged in
		if(!currentUser){
			Links.push(this.createNavLink('login', 'Login'));
			Links.push(this.createNavLink('register', 'Register'));
		}
		else {

	//mapping over students, the push to Links get first name
				this.state.allStudents.map((a) => {
					BtnLinks.push(
						<li className="boardLinks" key={a.id}><a href={'#pointBoard/'+a.id}>{a.get('firstName')}s Board</a></li>
						);

				})
			
					Links.push(<li className="greyBtn" key={'logout'}><a href='#' onClick={this.onLogout}>LOGOUT</a></li>);
				}

		return (
			<div>
				<nav className="navbar navbar-default">
						<div className="container-fluid">
							<div className="navbar-header">
								<button type="button" id="navCollapse" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>
								<a className="navbar-brand" href="#"></a>
							</div>


							<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
								<ul>
									<div className="visible-xs">
										{BtnLinks}
									</div>
									<div className="mainNavLinks">
										{Links}
									</div>

								</ul>
							</div>
						</div>
					</nav>
					<div className="navbar subnav hidden-xs" role="navigation">
						<div className="navbar-inner">
							<div className="container"> 
								<h3 className="kBoard">Kids Boards:</h3>
								<ul className="kLinks"> 
										<h4>{BtnLinks}</h4>
								</ul>	
							</div>
						</div>
					</div>
			</div>
		);
	},
	//when logout is clicked, routing the user to register page. 
	onLogout: function(e) {
		e.preventDefault();
		Parse.User.logOut();
		this.props.router.navigate('register', {trigger: true});
	},
	createNavLink: function(url, label) {
		var currentUrl = Backbone.history.getFragment();
		if(currentUrl === url){
			return (<li key={url} className="active"><a href={'#'+url}>{label}</a></li>);
		}
		else{
			return(<li key={url}><a href={'#'+url}>{label}</a></li>);
		}
	},
	fetchStudents: function(){
	//finding the children assoicated with the logged in parent
			var query = new Parse.Query(StudentModel);
			query.equalTo('parent', Parse.User.current());
			query.find().then(
					(students) =>{
						this.setState({allStudents: students})
					}

				);
	}



})