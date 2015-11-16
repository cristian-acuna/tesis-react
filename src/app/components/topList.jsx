var React = require('react');
var Reflux = require('reflux');
var Ajax = require('../data/ajax.jsx');
var VinoActions = require('../actions/vinoactions');
var history = require('react-router').History;

var Header = require('./header.jsx');
var VinosTabla = require('./vinos-tabla.jsx');
var Bootstrap = require('react-bootstrap');
var PageHeader = Bootstrap.PageHeader;
var Label = Bootstrap.Label;
var Jumbotron = Bootstrap.Jumbotron;
var Button = Bootstrap.Button;
var Glyphicon = Bootstrap.Glyphicon;


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
                    <small className="ver-vino--descripcion-bodega"> Los mejores</small>
                </PageHeader>
                <div className="busqueda-filtro">
                    <div className="busqueda-descripcion">
                        <h1>Estos son los vinos mejor puntuados de Somellier</h1>
                        <p>Te presentamos los mejores 50 vinos de nuestra vinoteca de acuerdo a la opinion de nuestros usuarios y sus calificaciones. Recorda que esta lista es dinamica y se actualiza con cada voto que se ingrese.</p>
                    </div>
                </div>
                <div className="busqueda-resultados">
                    {this.state.topList.map(function (row, index) {
                        return (
                                <div className="top-list--item">
                                    <span className="top-list--position">{index+1}</span>
                                    <div className="top-list--info">
                                        <h1 style={{color: 'white'}}>{row[0].nombre}</h1>
                                        <p style={{width: 500 +'px'}}>{row[0].descripcion}</p>
                                        <p className="top-list--rating"><Label style={{fontSize: 16 +'px'}}>Rating: {row[1]}</Label></p>
                                        <p><Button className="top-list--boton" onClick={this.openDetail.bind(this, row[0])} bsStyle="primary">ver <Glyphicon glyph="chevron-right" /></Button></p>
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
    },

    openDetail:function(vino){
        VinoActions.vinoElegido(vino);
        this.history.pushState(null, `/ver`);
    }
});

module.exports = TopList;