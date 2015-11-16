var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var moment = require('moment');
var Ajax = require('../data/ajax.jsx');

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

    getInitialState: function() {
        return {
            image_uri: '',
            vinoImgs: [],
            bodegas: [],
            edades: [],
            tipos: [],
            uvas: [],
            vinoId: '',
            showModal: false,
            formError: {
                nombre: '',
                bodega: '',
                uva: '',
                tipo: '',
                edad: ''
            }
        };
    },

    componentDidMount: function() {
        this.setState({
            bodegas: VinoStore.getBodegas(),
            uvas: VinoStore.getUvas(),
            edades: VinoStore.getEdades(),
            tipos: VinoStore.getTipos()
        });
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
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="nuevo-vino-form--main-info">
                            <div  className="nuevo-vino-form--main-info-name">
                                <Input ref="inputNombre"
                                       name="nombre"
                                       type="text"
                                       label={this.isRequired('Nombre')}
                                       bsStyle=""
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
                                       label={this.isRequired('Bodega')}
                                       onBlur={this.onValidateBodega}
                                       bsStyle={this.state.formError.bodega} hasFeedback
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
                                   label={this.isRequired('Uva')}
                                   onBlur={this.onValidateUva}
                                   bsStyle={this.state.formError.uva} hasFeedback
                                   placeholder="Seleccione ...">
                                <option value="placeholder">Seleccione la uva ...</option>
                                {this.state.uvas.map(function(uva){return (<option value={uva.id}>{uva.nombre}</option>)})}
                            </Input>
                            <Input ref="inputTipo"
                                   className="form-input-separation"
                                   name="tipoVino"
                                   type="select"
                                   label={this.isRequired('Tipo de vino')}
                                   onBlur={this.onValidateTipo}
                                   bsStyle={this.state.formError.tipo} hasFeedback
                                   placeholder="Seleccione ...">
                                <option value="placeholder">Seleccione el tipo de vino...</option>
                                {this.state.tipos.map(function(tipo){return (<option value={tipo.id}>{tipo.nombre}</option>)})}
                            </Input>
                            <Input ref="inputEdad"
                                   className="form-input-separation"
                                   name="edad"
                                   type="select"
                                   label={this.isRequired('Edad')}
                                   onBlur={this.onValidateEdad}
                                   bsStyle={this.state.formError.edad} hasFeedback
                                   placeholder="Seleccione ...">
                                <option value="placeholder">Seleccione la edad ...</option>
                                {this.state.edades.map(function(edad){return (<option value={edad.id}>{edad.nombre}</option>)})}
                            </Input>
                            <Input ref="inputCosecha"
                                   className="form-input-separation"
                                   name="cosecha"
                                   type="select"
                                   label={this.isRequired('Cosecha')}>
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

    isRequired: function (label) {
        return <span><span style={{color: 'red'}}>* </span>{label}</span>;
    },

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

    onVinoElegido: function(vino) {
        this.setState({ vinoId: vino.id });
            this.popularVino(vino);
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

    onValidateBodega: function (e) {
        var form = this.state.formError;
        (e.target.value == 'placeholder') ?
            form.bodega = 'error' :
            form.bodega = ''
        this.setState({formError: form})
    },

    onValidateUva: function (e) {
        var form = this.state.formError;
        (e.target.value == 'placeholder') ?
            form.uva = 'error' :
            form.uva = ''
        this.setState({formError: form})
    },

    onValidateTipo: function (e) {
        var form = this.state.formError;
        (e.target.value == 'placeholder') ?
            form.tipo = 'error' :
            form.tipo = ''
        this.setState({formError: form})
    },

    onValidateEdad: function (e) {
        var form = this.state.formError;
        (e.target.value == 'placeholder')?
            form.edad = 'error' :
            form.edad = ''
        this.setState({formError: form})
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },


    handleSubmit: function(e) {
        e.preventDefault();
        hasOwnValue = function(object, val) {
            for(var prop in object) {
                if(object.hasOwnProperty(prop) && object[prop] === val) {
                    return true;
                }
            }
            return false;
        };

        var request =
        {
            id: this.state.vinoId,
            nombre:this.refs.inputNombre.getInputDOMNode().value || 'placeholder',
            descripcion:this.refs.inputDescripcion.getInputDOMNode().value,
            cosecha:this.refs.inputCosecha.getInputDOMNode().value,
            graduacion:this.refs.inputGraduacion.getInputDOMNode().value,
            tipoVino: parseInt(this.refs.inputTipo.getInputDOMNode().value) || 'placeholder',
            bodega: parseInt(this.refs.inputBodega.getInputDOMNode().value) || 'placeholder',
            uva: parseInt(this.refs.inputUva.getInputDOMNode().value) || 'placeholder',
            edad: parseInt(this.refs.inputEdad.getInputDOMNode().value) || 'placeholder',
            imagen: this.state.image_uri,
            usuario: 1
        };

        if (!hasOwnValue(request,'placeholder')) {
            Ajax.call("http://localhost:8080/vino/registrar","POST", JSON.stringify(request), this.setVino);
            this.history.pushState(null, `/busqueda`);
        } else {
            console.log('Aun hay datos requeridos sin completar, verifique su informacion ingresada');
        }
    },

    setVino: function (data) { VinoActions.saveVino(data); }
});

module.exports = NuevoVino;
