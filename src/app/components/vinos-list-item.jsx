var React = require('react');
var Bootstrap = require('react-bootstrap');

var WineItem = React.createClass({

    render: function () {
        return (
            <div className="col-xs-4">
                <h2>CSS</h2>
                <p>CSS is used for describing the presentation of web pages. The CSS tutorial section will help you learn the essentials of CSS, so that you can fine control the style and layout of your HTML document.</p>
                <p><a href="http://www.tutorialrepublic.com/css-tutorial/" target="_blank" className="btn btn-success">ver detalle &raquo;</a></p>
            </div>
        );
    }
});

module.exports = WineItem;