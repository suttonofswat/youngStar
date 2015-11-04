var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');

module.exports = React.createClass({
	
    render: function() {
			return (
            	<div className="container">
            		<div className="row">
            			<div className="col-sm-4">
            				<div className="footerTxt">@2015 youngStars</div>
            			</div>
            			<div className="col-sm-4">
            				<div className="footerTxt">Built by Lesile Sutton</div>
            			</div>
            			<div className="col-sm-4">
            				<div className="footerTxt">Design by Eric Malcolm</div>
            			</div>
            		</div>
            	</div>

        	);

        
    }

  
});

