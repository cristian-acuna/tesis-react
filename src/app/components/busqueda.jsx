var React = require('react');
var Bootstrap = require('react-bootstrap');
var Carousel = require('./carousel.jsx')
var Header = require('./header.jsx');
var VinoItem = require('./vinos-list-item.jsx');


var Busqueda = React.createClass({
    render: function () {
        return (
            <div>
                <Header text="Buscar" back="true"/>
                <VinoItem />
                <VinoItem />
                <VinoItem />
                <VinoItem />
                <VinoItem />
                <VinoItem />
            </div>
        );
    }
});

module.exports = Busqueda;