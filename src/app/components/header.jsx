var React = require('react');
var Bootstrap = require('react-bootstrap');
var Link = require('react-router').Link;


var Header = React.createClass({
    render: function () {
        return (
            <header className="header">
                <Link to="/" className={(this.props.back==="true"?"":" hidden")}><span className="icon-nav glyphicon glyphicon-chevron-left"/></Link>
                <span className="header-title">{this.props.text}</span>
            </header>
        );
    }
});

module.exports = Header;
