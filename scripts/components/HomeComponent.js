var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

module.exports = React.createClass({
	render: function(){
		return (
		<div>
			<section id="home-slider">
					<div className="main-slider">
					    <div className="slide-text">
					        <h1>Turning youngsters into youngStars</h1>
					        <p>Rewarding children for good grades and hard work</p>
					        <div className="btnMargin">
					        	<a href='#register' className="orangeBtn add">Register Today</a>
					        </div>
					    </div>
					    <img src="../images/hill.png" className="hidden-xs hidden-sm img-responsive slider-hill" alt="slider image"></img>
					    <img src="../images/house.png" className="img-responsive slider-house" alt="slider image"></img>
					    <img src="../images/birds1.png" className="hidden-xs slider-birds1" alt="slider image"></img>
					    <img src="../images/birds2.png" className="slider-birds2" alt="slider image"></img>
					    <img src="../images/sun.png" className="hidden-xs slider-sun" alt="slider image"></img>
					</div>
					
			</section>
			<section id="services">

					<div className="container">

						<div className="row">

							<div className="col-sm-4 text-center">

								<div className="single-service">

									    <img src="../images/home-outline.png" alt=""></img>

										<h2>Teaching Responseability</h2>

										<p>Students will come home with graded assignments and enter them into their point board.</p>
								</div>

							</div>

							<div className="col-sm-4 text-center">

								<div className="single-service">

								    <img src="../images/parent-outline.png" alt=""></img>

									<h2>Earning Good Grades</h2>

									<p>Students will get certain points for each grade. As and Bs will grant them positive points towards rewards, while Ds and Fs will give negative points.</p>

								</div>

							</div>

							<div className="col-sm-4 text-center padding wow fadeIn" data-wow-duration="1000ms" data-wow-delay="900ms">

								<div className="single-service">

								    <img src="../images/graduate-outline.png" alt=""></img>

									<h2>Celebrating with Rewards</h2>

									<p>Once students get to a certain point amount, they can redeem their points for rewards!</p>

								</div>
						</div>
					</div>
				</div>
			</section>
       </div>
 
		);
	}
	
})