var React = require('react');
var Bootstrap = require('react-bootstrap');
var Home = require('./home-container.jsx');
var Login = require('./login.jsx');
var PageSlider = require('./pageslider-react.jsx');


var Content = React.createClass({

    mixins: [PageSlider],

    componentDidMount: function() {
        router.addRoute('', function() {
            this.slidePage(<Home key="home"/>);
        }.bind(this));
        router.addRoute('page1', function() {
            this.slidePage(<Login key="page1"/>);
        }.bind(this));

        router.start();
    }
});

module.exports = Content;