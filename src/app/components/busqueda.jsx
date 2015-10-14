var React = require('react');
var Header = require('./header.jsx');
var VinoItem = require('./vinos-list-item.jsx');
var tableData = require('../data/vinos.json');
var InstantBox = require('./instaBox.jsx');
var Link = require('react-router').Link;


var Busqueda = React.createClass({
    render: function () {
        return (
            <div>
                <Header return="/" text="Buscar" back="true"/>

                <div className="busqueda-filtro">
                    <div className="busqueda-descripcion">
                        <h1>Buscador de Somellier</h1>

                        <p>El buscador de Somellier le permite buscar de manera rapida y sencilla el vino que tenga en
                            mente ya sea para conocer datos sobre este, contribuir ya sea dando su puntaje u opinion
                            , o simplemente para descubrir algo
                            nuevo, y porque no, agregarlo a su 'wishlist'.</p>
                    </div>
                    <Link className="btn btn-success btn-lg busqueda-nuevo-btn" to={`/nuevo`}><span className="glyphicon glyphicon-plus"/> Nuevo</Link>

                </div>
                <div className="busqueda-resultados">
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