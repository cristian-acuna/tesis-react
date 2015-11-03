var React = require('react');
var Reflux = require('reflux');

var Header = require('./header.jsx');
var VinoItem = require('./vinos-list-item.jsx');
var InstantBox = require('./instaBox.jsx');
var Link = require('react-router').Link;

var VinoActions = require('../actions/vinoactions');
var VinoStore = require('../stores/vinostore');

var Wishlist = React.createClass({

    mixins: [ history, Reflux.connect(VinoStore,"onGetVinos")],

    getInitialState: function() {
        return {
            wishlist: []
        };
    },

    componentDidMount: function() {
        var currentUser = {
            id: 1
        };
        $.ajax({
            url: "http://localhost:8080/wishlist/listar",
            async:false,
            method: "GET",
            contentType:"application/json",
            dataType: "json",
            data : currentUser
        }).done(function( data ) {
                this.setState({
                    wishlist: data
                });
        }.bind(this));

        return;
    },

    render: function () {
        return (
            <div>
                <Header return="/" text="Wishlist" back="true"/>
                <div className="busqueda-filtro">
                    <div className="busqueda-descripcion">
                        <h1>Esta es su Wishlist</h1>

                        <p>La Wishlist de Somellier le permite mantener todos aquellos vinos que ha descubierto vagando
                            por las paginas de Somellier o tal vez en una charla con amigos. Todos los vinos que agregue
                            desde la seccion Buscar seran almacenados aqui mientras ud asi lo desee. Uselo como un
                            recordatorio de cuales vinos probar en su proxima cena con amigos o para conocer mas
                            informacion sobre estos.</p>
                    </div>
                </div>
                <div className="busqueda-resultados">
                    <InstantBox data={this.state.wishlist}/>
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

module.exports = Wishlist;