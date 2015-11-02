var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var UserStore = require('../stores/userstore');

var PageHeader = Bootstrap.PageHeader;
var Tooltip = Bootstrap.Tooltip;
var OverlayTrigger = Bootstrap.OverlayTrigger;
var Label = Bootstrap.Label;
var Glyphicon = Bootstrap.Glyphicon;
var Popover = Bootstrap.Popover;
var Button = Bootstrap.Button;
var Collapse = Bootstrap.Collapse;
var Input = Bootstrap.Input;


var Rating = require('react-rating');
var Header = require('./header.jsx');
var history = require('react-router').History;
var VinoStore = require('../stores/vinostore');
var CommentBox = require('./comment-box.jsx');

var VerVino = React.createClass({

    mixins: [history, Reflux.listenTo(VinoStore, 'onVinoElegido')],

    getInitialState: function () {
        return {
            open: '',
            msjWish: '',
            wish: 'star-empty',
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
            const tooltipCosto = (
                <Tooltip >Desde aqui puede compartir el costo con el cual adquirio este vino. El valor que ingrese junto con el de otros usuarios se computan para recomendarle a ud el mejor precio promedio al que deberia adquirir este vino. Ni un peso mas.</Tooltip>
            );
            const tooltipFav = (
                <Tooltip>Haciendo click aqui puede agregar este vino a su Wishlist personal. Su Wishlist le permitira llevar un registro de aquellos hallazgos que le gustaria recordar para proximas ocaciones. Puede acceder a esta seccion desde la barra superior de navegacion.</Tooltip>
            );
            const innerButton = <Button>
                <Glyphicon style={{marginRight: 10 + 'px'}} glyph="usd" />
                Ok
            </Button>;
            return (
                <div>
                    <Header return="/busqueda" text="Ver Vino" back="true"/>
                    <div>
                        <PageHeader className="ver-vino--header">{this.state.vino.nombre+' | '}
                            <small className="ver-vino--descripcion-bodega">{bodega.nombre}</small>
                        </PageHeader>
                        <div className="ver-vino--descripcion">
                            <span className="ver-vino--cosecha">{this.state.vino.cosecha}</span>

                            <OverlayTrigger trigger="click" rootClose placement="left" overlay={<Popover title="Aviso"><strong>{this.state.msjWish}</strong> Visite Wishlist para ver sus vinos.</Popover>}>
                            <OverlayTrigger overlay={tooltipFav}>
                                <span onClick={this.onWish} className="ver-vino--wishlist"><Glyphicon glyph={this.state.wish}/></span>
                            </OverlayTrigger>
                            </OverlayTrigger>
                            <img className="ver-vino--descripcion-img" src="http://www.mujeresycia.com/uploads/img/Foto-botella.jpg"/>
                            <span className="ver-vino--descripcion-texto">{this.state.vino.descripcion}</span>
                            <span className="ver-vino--descripcion-envejecimiento">envejecimiento</span>
                            <OverlayTrigger overlay={tooltip}>
                                <Label className="ver-vino--descripcion-label" bsStyle="warning">
                                    <span className="ver-vino--descripcion-edad">{this.state.vino.edad.nombre}</span>
                                </Label>
                            </OverlayTrigger>
                            <div className="ver-vino--costear-container">
                                <OverlayTrigger placement="left" overlay={tooltipCosto}>
                                    <Button bsStyle="default" className="ver-vino--costear-boton" onClick={ ()=> this.setState({ open: !this.state.open })}>
                                        Costear Vino
                                    </Button>
                                </OverlayTrigger>
                                <Collapse in={this.state.open}>
                                    <div className="ver-vino--costear-area">
                                        <Input bsSize="small" type="text" placeholder="Ingrese un precio" buttonAfter={innerButton} />
                                    </div>
                                </Collapse>
                            </div>
                            <span className="ver-vino--descripcion-precio-label">precio sugerido</span>
                            <span className="ver-vino--descripcion-precio">$79.99</span>
                            <OverlayTrigger trigger="click" rootClose placement="left" overlay={<Popover title={<strong>"Gracias por tu calificacion!!"</strong>}>Tu opinion contribuye a mejorar la experiencia Somellier.</Popover>}>
                                <div className="ver-vino--descripcion-rating">
                                    "Como calificaría a este vino?"<Rating fractions={2} onChange={this.onRate}/>
                                </div>
                            </OverlayTrigger>
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

    onWish: function(rating) {
        var request =
        {
            usuario: 1,
            vino: this.state.vino.id
        };
        this.ajaxCall("http://localhost:8080/vino/wish","POST", JSON.stringify(request));
        this.setState({
            wish: this.state.wish == 'star'? 'star-empty':'star'
        });

        this.setState({
            msjWish: this.state.wish == 'star'? 'El vino ha sido removido de su Wishlist':'El vino ha sido guardado en su Wishlist!'
        });

    },

    onRate: function(rating) {
        var request =
        {
            rate: rating,
            usuario: 1,/*(UserStore.getUserSession()).id,*/
            vino: this.state.vino.id
        };
        this.ajaxCall("http://localhost:8080/vino/rate","POST", JSON.stringify(request));
    },

    ajaxCall: function (url, method, object) {
        $.ajax({
            url: url,
            async:false,
            method: method,
            contentType:"application/json",
            dataType: "json",
            data : object
        }).done(function( data ) {});
    }
});

module.exports = VerVino;
