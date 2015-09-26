var React = require('react');
var Bootstrap = require('react-bootstrap');
var Carousel = require('./carousel.jsx')


var Home = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Bienvenido! estas son las recomendaciones de hoy</h1>
                <p className="lead">Use this document as a way to quickly start any new project.
                    <br />
                    All you get is this text and a mostly barebones HTML document.</p>
                    <Carousel />
            </div>
        );
    }
});

module.exports = Home;



