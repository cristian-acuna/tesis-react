var React = require('react');
var Header = require('./header.jsx');
var VinoItem = require('./vinos-list-item.jsx');
var tableData = require('../data/vinos.json');
var InstantBox = require('./instaBox.jsx');

var Busqueda = React.createClass({
    render: function () {
        return (
            <div>
                <div className="busqueda-filtro">
                    <Header text="Buscar" back="true"/>
                </div>
                <div className="busqueda-resultados">
                        <div className="container-fluid">
                            <h1>Buscador de Somellier</h1>
                            <p>El buscador de Somellier le permite buscar de manera rapida y sencilla el vino que tenga en su cabeza ya sea para conocer datos sobre este, agregar una puntuación, o comentario, o simplemente para descubrir algo nuevo, y porque no, agregarlo a su 'wishlist'.</p>
                            <p><a href="http://www.tutorialrepublic.com" target="_blank" className="btn btn-success btn-lg">Get started today</a></p>
                        </div>
                    <InstantBox data={tableData}/>
                    <div className="container-fluid">
                        <hr/>
                        <div className="row">
                            <div className="col-xs-12">
                                <footer>
                                    <p>&copy; Copyright 2015</p>
                                </footer>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
                );
    }
});

module.exports = Busqueda;