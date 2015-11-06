var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var moment = require('moment');
var Dropzone = require('react-dropzone');

var Input = Bootstrap.Input;
var Button = Bootstrap.Button;
var Modal = Bootstrap.Modal;
var Glyphicon = Bootstrap.Glyphicon;
var FormData = require('react-form-data');
var Header = require('./header.jsx');
var NuevaBodega = require('./nueva-bodega.jsx');
var Panel = Bootstrap.Panel;
var Thumbnail = Bootstrap.Thumbnail;

var VinoActions = require('../actions/vinoactions');
var VinoStore = require('../stores/vinostore');

var history = require('react-router').History;
var provincias = require('../data/provincias')


var NuevoVino = React.createClass({

    mixins: [ FormData, history, Reflux.listenTo(VinoStore,"onSaveBodega")],

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
            showModal: false
        };
    },

    componentDidMount: function() {
        this.setState({
            bodegas: VinoStore.getBodegas()
        });

        this.setState({
            uvas: VinoStore.getUvas()
        });

        this.setState({
            edades: VinoStore.getEdades()
        });

        this.setState({
            tipos: VinoStore.getTipos()
        });
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
                    <form className="form-horizontal" onChange={this.updateFormData} onSubmit={this.handleSubmit}>
                        <div className="nuevo-vino-form--main-info">
                            <div  className="nuevo-vino-form--main-info-name">
                                <Input name="nombre" type="text" label="Nombre" placeholder="Ingrese el nombre"/>
                                <Input rows="8"
                                       name="descripcion"
                                       type="textarea"
                                       label="Descripcion"
                                       placeholder="Ingrese una descripcion"/>
                                <Input name="bodega" type="select" label="Bodega" placeholder="Seleccione ...">
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
                                            <img className="nuevo-vino-form--main-info-visor-img" src={this.state.vinoImgs[0].preview} />
                                        </div>
                                        <p>Esa imagen se usara como portada para el vino</p>
                                        <p>
                                            <Button className="nuevo-vino-form--main-info-visor-boton" bsStyle="default" onClick={ ()=> this.setState({ vinoImgs: [] })}>Eliminar</Button>&nbsp;
                                        </p>
                                    </div> :
                                    <Dropzone className="nuevo-vino-form--main-info-visor-drop" onDrop={this.onDrop}>
                                        <div>Intente arrastrar una imagen aqui, o clickee para seleccionar una.</div>
                                    </Dropzone>
                                }
                            </div>
                        </div>
                        <div className="nuevo-vino-form--more-info">
                            <Input className="form-input-separation"
                                   name="uva"
                                   type="select"
                                   label="Uva"
                                   placeholder="Seleccione ...">
                                <option value="placeholder">Seleccione la uva ...</option>
                                {this.state.uvas.map(function(uva){return (<option value={uva.id}>{uva.nombre}</option>)})}
                            </Input>
                            <Input className="form-input-separation"
                                   name="tipoVino"
                                   type="select"
                                   label="Tipo de vino"
                                   placeholder="Seleccione ...">
                                <option value="placeholder">Seleccione el tipo de vino...</option>
                                {this.state.tipos.map(function(tipo){return (<option value={tipo.id}>{tipo.nombre}</option>)})}
                            </Input>
                            <Input className="form-input-separation"
                                   name="edad"
                                   type="select"
                                   label="Edad"
                                   placeholder="Seleccione ...">
                                <option value="placeholder">Seleccione la edad ...</option>
                                {this.state.edades.map(function(edad){return (<option value={edad.id}>{edad.nombre}</option>)})}
                            </Input>
                            <Input className="form-input-separation" name="cosecha" type="select" label="Cosecha">
                                {options}
                            </Input>
                            <Input className="form-input-separation"
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
            nombre:this.formData.nombre,
            descripcion:this.formData.descripcion,
            cosecha:this.formData.cosecha,
            graduacion:this.formData.graduacion,
            tipoVino: parseInt(this.formData.tipoVino),
            bodega: parseInt(this.formData.bodega),
            uva: parseInt(this.formData.uva),
            edad: parseInt(this.formData.edad),
            imagen: this.state.image_uri
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
        });
        /*this.history.pushState(null, `/`);*/
    }
});

module.exports = NuevoVino;
