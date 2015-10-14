var React = require('react');
var Bootstrap = require('react-bootstrap');
var Carousel = require('./carousel.jsx')
var Header = require('./header.jsx');


var ViewVino = React.createClass({
    render: function () {
        return (
            <div>
                <Header return="/busqueda" text="Nuevo Vino" back="true" />
                <div>

                </div>

            </div>
        );
    }
});

module.exports = ViewVino;



