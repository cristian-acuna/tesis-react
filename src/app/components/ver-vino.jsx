var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');

var PageHeader = Bootstrap.PageHeader
var Carousel = require('./carousel.jsx')
var Header = require('./header.jsx');
var history = require('react-router').History;
var VinoStore = require('../stores/vinostore');


var VerVino = React.createClass({

    mixins: [history, Reflux.listenTo(VinoStore, 'onVinoElegido')],

    getInitialState: function () {
        return {
            vino: {}
        };
    },

    onVinoElegido: function(vino) {
        this.setState({ vino: vino });
    },

    render: function () {
        if (this.state.vino.bodega) {
            return (
                <div>
                    <Header return="/busqueda" text="Ver Vino" back="true"/>
                    <div>
                        <PageHeader className="ver-vino--header">{this.state.vino.nombre+' | '}
                            <small className="ver-vino--descripcion-bodega">{this.state.vino.bodega.nombre}</small>
                        </PageHeader>
                        <div className="ver-vino--descripcion">
                            <span className="ver-vino--cosecha">{this.state.vino.cosecha}</span>
                            <img className="ver-vino--descripcion-img" src="http://www.mujeresycia.com/uploads/img/Foto-botella.jpg"/>
                            <span className="ver-vino--descripcion-texto">{this.state.vino.descripcion}</span>
                        </div>
                        <div className="ver-vino--tipo">
                            <span className="ver-vino--tipo-etiqueta">tipo de vino</span>
                            <span className="ver-vino--tipo-nombre">{this.state.vino.tipoVino.nombre}</span>
                            <div className="ver-vino--tipo-texto">{this.state.vino.tipoVino.descripcion}</div>
                        </div>
                        <div className="ver-vino--uva">
                            <span className="ver-vino--uva-etiqueta">uva</span>
                            <span className="ver-vino--uva-nombre">{this.state.vino.uva.nombre}</span>
                            <div className="ver-vino--uva-texto">{this.state.vino.uva.descripcion}</div>
                        </div>
                    </div>

                </div>
            );
        }

        return null;
    }
});

module.exports = VerVino;
