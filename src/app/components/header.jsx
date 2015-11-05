var React = require('react');
var history = require('react-router').History;
var Bootstrap = require('react-bootstrap');
var Button = Bootstrap.Button;


var Header = React.createClass({

    mixins: [history],

    render: function () {
        return (
            <header className="header">
                <ul className="breadcrumb">
                    <Button bsStyle="link" bsSize="xsmall" onClick={this.history.goBack} className={(this.props.back==="true"?"":" hidden")}><span className="icon-nav glyphicon glyphicon-chevron-left"/></Button>
                    <li><a href="#">Home</a></li>
                    <li className="active">{this.props.text}</li>
                </ul>
            </header>
        );
    }
});

module.exports = Header;
