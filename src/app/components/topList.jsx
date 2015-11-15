var React = require('react');
var Reflux = require('reflux');
var Ajax = require('../data/ajax.jsx');

var Header = require('./header.jsx');
var VinosTabla = require('./vinos-tabla.jsx');
var Bootstrap = require('react-bootstrap');
var PageHeader = Bootstrap.PageHeader;
var Jumbotron = Bootstrap.Jumbotron;
var Button = Bootstrap.Button;


var TopList = React.createClass({

    mixins: [ history ],

    getInitialState: function() {
        return {
            topList: []
        };
    },

    componentDidMount: function() {
        Ajax.call("http://localhost:8080/vino/toplist","GET", '', this.setToplist);
    },

    setToplist: function(data) { this.setState({ topList: data }); },

    render: function () {
        return (
            <div>
                <Header text="Top List" back="true"/>
                <PageHeader className="ver-vino--header">Top List |
                    <small className="ver-vino--descripcion-bodega">Los mejores vinos</small>
                </PageHeader>
                <div className="busqueda-filtro">
                    <div className="busqueda-descripcion">
                        <h1>Estos son los vinos Top de Somellier</h1>
                        <p>Te presentamos los mejores 50 vinos de nuestra vinoteca de acuerdo a la opinion de nuestros usuarios y sus calificaciones. Recorda que esta lista es dinamica y se actualiza con cada voto que se ingrese.</p>
                    </div>
                </div>
                <div className="busqueda-resultados">
                    {this.state.topList.map(function (row, index) {
                        return (
                                <div className="top-list--item">
                                    <span className="top-list--position">{index+1}</span>
                                    <div className="top-list--info">
                                        <h1>Hello, world!</h1>
                                        <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                                        <p><Button bsStyle="primary">Learn more</Button></p>
                                    </div>
                                </div>
                        )}.bind(this))}
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
        );
    }
});

module.exports = TopList;