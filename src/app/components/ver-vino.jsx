var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var UserStore = require('../stores/userstore');

var PageHeader = Bootstrap.PageHeader
var Tooltip = Bootstrap.Tooltip
var OverlayTrigger = Bootstrap.OverlayTrigger
var Label = Bootstrap.Label

var Rating = require('react-rating');
var Header = require('./header.jsx');
var history = require('react-router').History;
var VinoStore = require('../stores/vinostore');
var CommentBox = require('./comment-box.jsx');

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
            var bodega = this.state.vino.bodega;
            var ubicacion = bodega.residencia;
            const tooltip = (
                <Tooltip>{this.state.vino.edad.descripcion}</Tooltip>
            );
            return (
                <div>
                    <Header return="/busqueda" text="Ver Vino" back="true"/>
                    <div>
                        <PageHeader className="ver-vino--header">{this.state.vino.nombre+' | '}
                            <small className="ver-vino--descripcion-bodega">{bodega.nombre}</small>
                        </PageHeader>
                        <div className="ver-vino--descripcion">
                            <span className="ver-vino--cosecha">{this.state.vino.cosecha}</span>
                            <img className="ver-vino--descripcion-img" src="http://www.mujeresycia.com/uploads/img/Foto-botella.jpg"/>
                            <span className="ver-vino--descripcion-texto">{this.state.vino.descripcion}</span>
                            <span className="ver-vino--descripcion-envejecimiento">envejecimiento</span>
                            <OverlayTrigger overlay={tooltip}>
                                <Label className="ver-vino--descripcion-label" bsStyle="warning">
                                    <span className="ver-vino--descripcion-edad">{this.state.vino.edad.nombre}</span>
                                </Label>
                            </OverlayTrigger>
                            <span className="ver-vino--descripcion-precio-label">precio sugerido</span>
                            <span className="ver-vino--descripcion-precio">$79.99</span>
                            <div className="ver-vino--descripcion-rating">
                                "Como calificaría a este vino?"<Rating fractions={2} onChange={this.onRate}/>
                            </div>
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
                        <div className="ver-vino--bodega">
                            <span className="ver-vino--bodega-etiqueta">Bodega</span>
                            <span className="ver-vino--bodega-nombre">{bodega.nombre}</span>
                            <div className="ver-vino--bodega-texto">{bodega.descripcion}</div>
                            <span className="ver-vino--bodega-anio-label">fundada en </span>
                            <span className="ver-vino--bodega-anio">{bodega.anio}</span>
                            <span className="ver-vino--bodega-link-label">sitio web</span>
                            <a href={bodega.link} target="_blank" className="ver-vino--bodega-link">{bodega.link}</a>
                            <span className="ver-vino--bodega-ubicacion">ubicación</span>
                            <span className="ver-vino--bodega-ciudad">
                                {ubicacion.ciudad + " | "+ ubicacion.provincia.descripcion}
                            </span>
                            <span className="ver-vino--bodega-pais">{ubicacion.pais}</span>
                        </div>
                    </div>
                    <CommentBox vino={this.state.vino} />
                </div>
            );
        }

        return null;
    },

    onRate: function(rating) {
        var request =
        {
            rate: rating,
            usuario: (UserStore.getUserSession()).id,
            vino: this.state.vino.id
        };

        $.ajax({
            url: "http://localhost:8080/vino/rate",
            async: false,
            method: "POST",
            crossOrigin: true,
            contentType:"application/json",
            dataType: "json",
            data: JSON.stringify(request)
        }).done(function( data ) {
            console.log("RATEDDDDDDDDDDDDD:");
            return true;
        }).fail( function(xhr, textStatus, errorThrown) {
            console.log("Fail:"+textStatus);
            return;
        });
        return;
    }
});

module.exports = VerVino;
