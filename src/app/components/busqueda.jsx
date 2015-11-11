var React = require('react');
var Reflux = require('reflux');
var Ajax = require('../data/ajax.jsx');

var Header = require('./header.jsx');
var Buscador = require('./buscador.jsx');
var Link = require('react-router').Link;

var VinoActions = require('../actions/vinoactions');

var Busqueda = React.createClass({

    mixins: [ history ],

    getInitialState: function() {
        return {
            vinos: []
        };
    },

    componentDidMount: function() {
        Ajax.call("http://localhost:8080/vino/listar","GET", '', this.setVinos);
    },

    setVinos: function(data) {
        VinoActions.getVinos(data);
        if (this.isMounted()) {
            this.setState({
                vinos: data
            });
        }
    },

    render: function () {
        return (
            <div>
                <Header return="/" text="Buscar" back="true"/>
                <div className="busqueda-filtro">
                    <div className="busqueda-descripcion">
                        <h1>Buscador de Somellier</h1>
                        <p>El buscador de Somellier le permite buscar de manera rapida y sencilla el vino que tenga en
                            mente para conocer datos sobre este, contribuir ya sea dando su puntaje u opinion
                            , o simplemente para descubrir algo
                            nuevo, y porque no, agregarlo a su 'wishlist'.</p>
                    </div>
                    <Link className="btn btn-success btn-lg busqueda-nuevo-btn" to={`/nuevo`}><span className="glyphicon glyphicon-plus"/> Nuevo</Link>
                </div>
                <div className="busqueda-resultados">
                    <Buscador data={this.state.vinos}/>
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