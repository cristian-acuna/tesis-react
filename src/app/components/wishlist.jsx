var React = require('react');
var Reflux = require('reflux');
var Ajax = require('../data/ajax.jsx');

var Header = require('./header.jsx');
var VinosTabla = require('./vinos-tabla.jsx');
var Bootstrap = require('react-bootstrap')
var Modal = Bootstrap.Modal;
var Button = Bootstrap.Button;
var Rating = require('react-rating');
var Glyphicon = Bootstrap.Glyphicon;
var Input = Bootstrap.Input;
var VinoActions = require('../actions/vinoactions');
var VinoStore = require('../stores/vinostore');

var Wishlist = React.createClass({

    mixins: [ history, Reflux.listenTo(VinoStore,"onSetWishlist")],

    getInitialState: function() {
        return {
            wishlist: [],
            showModal: false,
            rating: 2.5,
            vino:{}
        };
    },

    close() {
        this.setState({ showModal: false });
    },

    open(idVino) {
        this.setState({
            showModal: true,
            vino: idVino
        });
    },

    onSetWishlist: function(wishlist) {
        this.setState({ wishlist: wishlist });
    },

    componentDidMount: function() {
        Ajax.call("http://localhost:8080/wishlist/listar","GET", {id: 1}, this.setWishlist);
    },

    setWishlist: function(data) { this.setState({ wishlist: data }); },

    render: function () {
        return (
            <div>
                <Header return="/" text="Wishlist" back="true"/>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Estas por borrar un vino de tu wishlist?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Queremos conocer tu opinion</h4>
                        <p>En Somellier nos interesa saber que piensan nuestros usuarios sobre cada vino que tienen la oportunidad de probar. Ahora que probablemente ya hayas probado este vino dejanos tus pensamientos y calificacion sobre tu experiencia.</p>
                        <Input ref="commentInput"
                               rows="4"
                               name="descripcion"
                               type="textarea"
                               placeholder="Ingrese un comentario"/>
                        <div className="wishlist--modal-rating">
                            <Rating empty={'glyphicon glyphicon-star-empty'} full={'glyphicon glyphicon-star'} fractions={2} onChange={this.onRate} initialRate={this.state.rating} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="wishlist--modal-boton" onClick={this.onCerrar}>aceptar</Button>
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
                    <VinosTabla ondeleteWish={this.open} onWishlist={true} data={this.state.wishlist}/>
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
    },

    onCerrar: function() {
        var requestRate =
        {
            rate: this.state.rating,
            usuario: 1,/*(UserStore.getUserSession()).id,*/
            vino: this.state.vino
        };

        var requestComment =
        {
            comentario: this.refs.commentInput.getInputDOMNode().value,
            usuario: 1,
            vino: this.state.vino
        };

        var requestWish =
        {
            usuario: 1,
            vino: this.state.vino
        };

        Ajax.call("http://localhost:8080/vino/rate","POST", JSON.stringify(requestRate), null);
        Ajax.call("http://localhost:8080/vino/comentar","POST", JSON.stringify(requestComment), null);
        Ajax.call("http://localhost:8080/wishlist/wish","POST", JSON.stringify(requestWish),null);
        Ajax.call("http://localhost:8080/wishlist/listar","GET", {id: 1}, this.setWishlist);

        this.close();
    },

    onRate: function(rating) {
        this.setState({ rating: rating });
    }
});

module.exports = Wishlist;