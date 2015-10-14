var React = require('react');
var Bootstrap = require('react-bootstrap');
var Link = require('react-router').Link;


var Header = React.createClass({
    render: function () {
        return (
            <header className="header">
                <ul className="breadcrumb">
                    <Link to={this.props.return} className={(this.props.back==="true"?"":" hidden")}><span className="icon-nav glyphicon glyphicon-chevron-left"/></Link>
                    <li><a href="#">Home</a></li>
                    <li className="active">{this.props.text}</li>
                </ul>
            </header>
        );
    }
});

module.exports = Header;
