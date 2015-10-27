var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var moment = require('moment');
var Dropzone = require('react-dropzone');

var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var Glyphicon = require('react-bootstrap').Glyphicon;
var FormData = require('react-form-data');
var Header = require('./header.jsx');
var NuevaBodega = require('./nueva-bodega.jsx');
var Panel = require('react-bootstrap').Panel;

var VinoActions = require('../actions/vinoactions');
var VinoStore = require('../stores/vinostore');

var history = require('react-router').History;
var provincias = require('../data/provincias')


var NuevoVino = React.createClass({

    mixins: [ FormData, history, Reflux.connect(VinoStore,"onSaveBodega")],

    onDrop: function (files) {
        this.setState({
            vinoImgs: files
        });
        console.log('IMAGEN VINO: ', files);
    },

    getBase64Image: function (img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    },

    getInitialState: function() {
        return {
            vinoImgs: {},
            bodegas: [],
            edades: [],
            tipos: [],
            uvas: [],
            showModal: false
        };
    },

    componentDidMount: function() {
        $.ajax({
            url: "http://localhost:8080/bodega/listar",
            method: "GET",
            contentType:"application/json",
            dataType: "json"
        }).done(function( data ) {
            VinoActions.getBodegas(data);
                this.setState({
                    bodegas: data
                });
            return true;
        }.bind(this));

        $.ajax({
            url: "http://localhost:8080/vino/uvas",
            method: "GET",
            contentType:"application/json",
            dataType: "json"
        }).done(function( data ) {
                this.setState({
                    uvas: data
                });
            return true;
        }.bind(this));

        $.ajax({
            url: "http://localhost:8080/vino/edades",
            method: "GET",
            contentType:"application/json",
            dataType: "json"
        }).done(function( data ) {
                this.setState({
                    edades: data
                });
            return true;
        }.bind(this));

        $.ajax({
            url: "http://localhost:8080/vino/tipos",
            method: "GET",
            contentType:"application/json",
            dataType: "json"
        }).done(function( data ) {
                this.setState({
                    tipos: data
                });
            return true;
        }.bind(this));

        return;
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
                <Modal keyboard={false} show={this.state.showModal} onHide={this.close}>
                    <NuevaBodega onClose={this.close}/>
                </Modal>
                <Header return="/busqueda" text="Nuevo Vino" back="true" />
                <div className="nuevo-vino-form-container">
                    <form className="form-horizontal" onChange={this.updateFormData} onSubmit={this.handleSubmit}>
                        <div className="nuevo-vino-form--main-info">
                            <div  className="nuevo-vino-form--main-info-name">
                                <Input name="nombre" type="text" label="Nombre" placeholder="Ingrese el nombre"/>
                                <Input rows="8" name="descripcion" type="textarea" label="Descripcion" placeholder="Ingrese una descripcion"/>
                                <Input name="bodega" type="select" label="Bodega" placeholder="Seleccione ...">
                                    <option value="placeholder">Seleccione a que bodega pertenece ...</option>
                                    {this.state.bodegas.map(function(bodega){return (<option value={bodega.id}>{bodega.nombre}</option>)})}
                                </Input>
                                <span className="bodega-input-text">No encuentra una bodega en la lista?<Button onClick={this.open} className="btn-agregar" bsSize="xsmall">Agregar bodega</Button></span>
                            </div>
                            <div className="nuevo-vino-form--main-info-visor">
                                <Dropzone className="nuevo-vino-form--main-info-visor-drop" onDrop={this.onDrop}>
                                    <div>Intente arrastrar una imagen aqui, o clickee para seleccionar una.</div>
                                </Dropzone>
                                {this.state.vinoImgs.length > 0 ?
                                    <div>
                                        {this.state.vinoImgs.map((file) =>
                                            <img ref="imgInput" className="nuevo-vino-form--main-info-visor-img" src={file.preview} />
                                        )}
                                    </div> : null
                                }
                            </div>

                        </div>
                        <div className="nuevo-vino-form--more-info">
                            <Input className="form-input-separation" name="uva" type="select" label="Uva" placeholder="Seleccione ...">
                                <option value="placeholder">Seleccione la uva ...</option>
                                {this.state.uvas.map(function(uva){return (<option value={uva.id}>{uva.nombre}</option>)})}
                            </Input>
                            <Input className="form-input-separation" name="tipoVino" type="select" label="Tipo de vino" placeholder="Seleccione ...">
                                <option value="placeholder">Seleccione el tipo de vino...</option>
                                {this.state.tipos.map(function(tipo){return (<option value={tipo.id}>{tipo.nombre}</option>)})}
                            </Input>
                            <Input className="form-input-separation" name="edad" type="select" label="Edad" placeholder="Seleccione ...">
                                <option value="placeholder">Seleccione la edad ...</option>
                                {this.state.edades.map(function(edad){return (<option value={edad.id}>{edad.nombre}</option>)})}
                            </Input>
                            <Input className="form-input-separation" name="cosecha" type="select" label="Cosecha">
                                {options}
                            </Input>
                            <Input className="form-input-separation" groupClassName="nuevo-vino-form--graduacion" addonAfter={innerGlyphicon} name="graduacion" type="text" label="% alc" placeholder="Ingrese la graduacion alcoholica"/>
                            <Input type="submit" className="btn btn-nuevo" value="Guardar"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    },

    handleSubmit: function() {
        var image = React.findDOMNode(this.refs.imgInput);
        console.log(image);

        var request =
        {
            nombre:this.formData.nombre,
            descripcion:this.formData.descripcion,
            cosecha:this.formData.cosecha,
            graduacion:this.formData.graduacion,
            tipoVino: parseInt(this.formData.tipoVino),
            bodega: parseInt(this.formData.bodega),
            uva: parseInt(this.formData.uva),
            edad: parseInt(this.formData.edad)
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
            return true;
        }).fail( function(xhr, textStatus, errorThrown) {
            console.log("Fail:"+textStatus);
            return;
        });
        this.history.pushState(null, `/`);
        return;
    }
});

module.exports = NuevoVino;
