var React = require('react');
var Header = require('./header.jsx');
var VinoItem = require('./vinos-list-item.jsx');
var tableData = require('../data/data');
var InstantBox = require('./instaBox.jsx');

var Buscador = React.createClass({
    render: function () {
        return (
            <div>
                <div className="busqueda-filtro">
                    <Header text="Buscar" back="true"/>
                </div>
                <div className="busqueda-resultados">
                    <InstantBox data={tableData}/>
                </div>
            </div>
        );
    }
});

module.exports = Buscador;