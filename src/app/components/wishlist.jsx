var React = require('react');
var Reflux = require('reflux');

var Header = require('./header.jsx');
var VinosTabla = require('./vinos-tabla.jsx');

var VinoActions = require('../actions/vinoactions');
var VinoStore = require('../stores/vinostore');

var Wishlist = React.createClass({

    mixins: [ history, Reflux.listenTo(VinoStore,"onSetWishlist")],

    getInitialState: function() {
        return {
            wishlist: []
        };
    },

    onSetWishlist: function(wishlist) {
        this.setState({ wishlist: wishlist });
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

                        <p>La Wishlist le permite mantener todos aquellos vinos que ha descubierto vagando
                            por las paginas de Somellier o tal vez en una charla con amigos y que siente curiosidad de
                            probar en el futuro. Todos los vinos que agregue
                            desde la seccion Buscar seran almacenados aqui mientras ud asi lo desee. Uselo como un
                            recordatorio de cuales vinos probar en su proxima ocacion especial o para conocer mas
                            informacion sobre estos. Una vez que haya probado uno de ellos, puede eliminar ese
                            vino de la lista y de paso nos cuenta como fue su experiencia en unas palabras y dando un
                            puntaje.</p>
                    </div>
                </div>
                <div className="busqueda-resultados">
                    <VinosTabla onWishlist={true} data={this.state.wishlist}/>
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