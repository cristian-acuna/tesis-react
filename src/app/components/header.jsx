var React = require('react');
var Bootstrap = require('react-bootstrap');


var Header = React.createClass({
    render: function () {
        return (
            <header>
                <a href="#" className={(this.props.back==="true"?"":" hidden")}><span className="icon-nav glyphicon glyphicon-chevron-left"/></a>
                <span className="header-title">{this.props.text}</span>
            </header>
        );
    }
});

module.exports = Header;
