var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var moment = require('moment');
var Dropzone = require('react-dropzone');

var Input = Bootstrap.Input;
var Button = Bootstrap.Button;
var Modal = Bootstrap.Modal;
var Glyphicon = Bootstrap.Glyphicon;
var Header = require('./header.jsx');
var NuevaBodega = require('./nueva-bodega.jsx');
var Panel = Bootstrap.Panel;
var Thumbnail = Bootstrap.Thumbnail;

var VinoActions = require('../actions/vinoactions');
var VinoStore = require('../stores/vinostore');

var history = require('react-router').History;
var provincias = require('../data/provincias')


var NuevoVino = React.createClass({

    mixins: [ history, Reflux.listenTo(VinoStore, 'onVinoElegido')],

    readURL: function (files) {
        var self = this;
        var reader = new FileReader();
        var file = files[0];
        reader.onloadend = function (upload) {
            var codedImg = upload.target.result.replace("data:"+ file.type +";base64,", '');
            self.setState({
                image_uri: codedImg
            });
        };
        reader.readAsDataURL(file);
    },

    getInitialState: function() {
        return {
            image_uri: '',
            vinoImgs: [],
            bodegas: [],
            edades: [],
            tipos: [],
            uvas: [],
            vinoId: '',
            showModal: false
        };
    },

    onVinoElegido: function(vino) {
        this.setState({ vinoId: vino.id });
            this.popularVino(vino);
    },

    componentDidMount: function() {
        this.setState({
            bodegas: VinoStore.getBodegas(),
            uvas: VinoStore.getUvas(),
            edades: VinoStore.getEdades(),
            tipos: VinoStore.getTipos()
        });
    },

    popularVino: function(vino) {
        this.refs.inputNombre.getInputDOMNode().value = vino.nombre;
        this.refs.inputDescripcion.getInputDOMNode().value = vino.descripcion;
        this.refs.inputCosecha.getInputDOMNode().value = vino.cosecha;
        this.refs.inputBodega.getInputDOMNode().value = vino.bodega.id;
        this.refs.inputUva.getInputDOMNode().value = vino.uva.id;
        this.refs.inputTipo.getInputDOMNode().value = vino.tipoVino.id;
        this.refs.inputEdad.getInputDOMNode().value = vino.edad.id;
        this.refs.inputGraduacion.getInputDOMNode().value = vino.graduacion;
        if (vino.imagen) {
            this.setState({
                vinoImgs: [{}]
            });
            this.refs.inputImagen.getDOMNode().src = 'data:image/png;base64,'.concat(vino.imagen);
        }
    },

    onSaveBodega: function(bodegas) {
        this.setState({ bodegas: bodegas });
        this.close();
    },

    onDrop: function (files) {
        this.setState({
            vinoImgs: files
        });
        this.readURL(files);
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    render: function () {
        const innerGlyphicon = <Glyphicon glyph="tint" />;
        var options = [];

        for (var i=moment().format('YYYY') ; i>1970 ; i--) {
            options.push(
                <option value={i}>{i}</option>
            )
        }


        return (
            <div>
                <Modal backdrop={false} keyboard={false} show={this.state.showModal} onHide={this.close}>
                    <NuevaBodega onClose={this.close}/>
                </Modal>
                <Header return="/busqueda" text="Nuevo Vino" back="true" />
                <div className="nuevo-vino-form-container">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="nuevo-vino-form--main-info">
                            <div  className="nuevo-vino-form--main-info-name">
                                <Input ref="inputNombre"
                                       name="nombre"
                                       type="text"
                                       label="Nombre"
                                       placeholder="Ingrese el nombre"/>
                                <Input ref="inputDescripcion"
                                       rows="8"
                                       name="descripcion"
                                       type="textarea"
                                       label="Descripcion"
                                       placeholder="Ingrese una descripcion"/>
                                <Input ref="inputBodega"
                                       name="bodega"
                                       type="select"
                                       label="Bodega"
                                       placeholder="Seleccione ...">
                                    <option value="placeholder">Seleccione a que bodega pertenece ...</option>
                                    {this.state.bodegas.map(function(bodega){return (<option value={bodega.id}>{bodega.nombre}</option>)})}
                                </Input>
                                <span className="bodega-input-text">
                                    No encuentra una bodega en la lista?
                                    <Button onClick={this.open}
                                            className="btn-agregar"
                                            bsSize="xsmall">
                                        Agregar bodega
                                    </Button>
                                </span>
                            </div>
                            <div className="nuevo-vino-form--main-info-visor">
                                {this.state.vinoImgs.length > 0 ?
                                    <div>
                                        <div className="nuevo-vino-form--main-info-visor-frame">
                                            <img ref="inputImagen" className="nuevo-vino-form--main-info-visor-img" src={this.state.vinoImgs[0].preview} />
                                        </div>
                                        <p>Esa imagen se usara como portada para el vino</p>
                                        <p>
                                            <Button className="nuevo-vino-form--main-info-visor-boton" bsStyle="default" onClick={ ()=> this.setState({ vinoImgs: [], image_uri: null })}>Eliminar</Button>&nbsp;
                                        </p>
                                    </div> :
                                    <Dropzone className="nuevo-vino-form--main-info-visor-drop" onDrop={this.onDrop}>
                                        <div>Intente arrastrar una imagen aqui, o clickee para seleccionar una.</div>
                                    </Dropzone>
                                }
                            </div>
                        </div>
                        <div className="nuevo-vino-form--more-info">
                            <Input ref="inputUva"
                                   className="form-input-separation"
                                   name="uva"
                                   type="select"
                                   label="Uva"
                                   placeholder="Seleccione ...">
                                <option value="placeholder">Seleccione la uva ...</option>
                                {this.state.uvas.map(function(uva){return (<option value={uva.id}>{uva.nombre}</option>)})}
                            </Input>
                            <Input ref="inputTipo"
                                   className="form-input-separation"
                                   name="tipoVino"
                                   type="select"
                                   label="Tipo de vino"
                                   placeholder="Seleccione ...">
                                <option value="placeholder">Seleccione el tipo de vino...</option>
                                {this.state.tipos.map(function(tipo){return (<option value={tipo.id}>{tipo.nombre}</option>)})}
                            </Input>
                            <Input ref="inputEdad"
                                   className="form-input-separation"
                                   name="edad"
                                   type="select"
                                   label="Edad"
                                   placeholder="Seleccione ...">
                                <option value="placeholder">Seleccione la edad ...</option>
                                {this.state.edades.map(function(edad){return (<option value={edad.id}>{edad.nombre}</option>)})}
                            </Input>
                            <Input ref="inputCosecha"
                                   className="form-input-separation"
                                   name="cosecha"
                                   type="select"
                                   label="Cosecha">
                                {options}
                            </Input>
                            <Input ref="inputGraduacion"
                                   className="form-input-separation"
                                   groupClassName="nuevo-vino-form--graduacion"
                                   type="number"
                                   min="0"
                                   step="0.05"
                                   data-number-to-fixed="2"
                                   data-number-stepfactor="100"
                                   addonAfter={innerGlyphicon}
                                   name="graduacion"
                                   label="% alc"
                                   placeholder="Ingrese la graduacion alcoholica"/>
                            <Input type="submit" className="btn btn-nuevo" value="Guardar"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    },

    handleSubmit: function() {
        var request =
        {
            id: this.state.vinoId,
            nombre:this.refs.inputNombre.getInputDOMNode().value,
            descripcion:this.refs.inputDescripcion.getInputDOMNode().value,
            cosecha:this.refs.inputCosecha.getInputDOMNode().value,
            graduacion:this.refs.inputGraduacion.getInputDOMNode().value,
            tipoVino: parseInt(this.refs.inputTipo.getInputDOMNode().value),
            bodega: parseInt(this.refs.inputBodega.getInputDOMNode().value),
            uva: parseInt(this.refs.inputUva.getInputDOMNode().value),
            edad: parseInt(this.refs.inputEdad.getInputDOMNode().value),
            imagen: this.state.image_uri,
            usuario: 1
        };

        $.ajax({
            url: "http://localhost:8080/vino/registrar",
            async: false,
            method: "POST",
            crossOrigin: true,
            contentType:"application/json",
            dataType: "json",
            data: JSON.stringify(request)
        }).done(function( data ) {
            VinoActions.saveVino(data);
        }).fail( function(xhr, textStatus, errorThrown) {
            console.log("Fail:"+textStatus);
        });
        this.history.pushState(null, `/busqueda`);
    }
});

module.exports = NuevoVino;
