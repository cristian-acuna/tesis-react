var React = require('react');
var Bootstrap = require('react-bootstrap');
var Home = require('./home-container.jsx')


var Container = React.createClass({
    render: function () {
        return (
                <div className="page-container">
                    <Home />
                </div>
        );
    }
});

module.exports = Container;