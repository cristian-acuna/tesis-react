var React = require('react');
var Bootstrap = require('react-bootstrap');
var Input = require('react-bootstrap').Input;
var Jumbotron = require('react-bootstrap').Jumbotron;
var Button = require('react-bootstrap').Button;

var WineItem = React.createClass({

    componentDidMount: function() {
        $.get(this.props.source, function(result) {
            var lastGist = result[0];
            if (this.isMounted()) {
                this.setState({
                    username: lastGist.owner.login,
                    lastGistUrl: lastGist.html_url
                });
            }
        }.bind(this));
    },


    render: function () {
        return (
<Jumbotron className="vino-list-item">
    <h1>Hello, world!</h1>
    <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <p><Button bsStyle="primary">Learn more</Button></p>
</Jumbotron>
        );
    }
});

module.exports = WineItem;