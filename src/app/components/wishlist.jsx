var React = require('react');
var Reflux = require('reflux');

var Header = require('./header.jsx');
var VinosTabla = require('./vinos-tabla.jsx');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

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
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                        <h4>Popover in a modal</h4>

                        <h4>Tooltips in a modal</h4>

                        <hr />

                        <h4>Overflowing text to show scroll behavior</h4>
                        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
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