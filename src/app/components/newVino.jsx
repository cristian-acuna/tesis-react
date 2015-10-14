var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var moment = require('moment');

var Input = require('react-bootstrap').Input;
var FormData = require('react-form-data');
var Header = require('./header.jsx');
var Panel = require('react-bootstrap').Panel;
var InputPassword = require('react-ux-password-field');

var VinoActions = require('../actions/vinoactions');
var VinoStore = require('../stores/vinostore');

var history = require('react-router').History;
var provincias = require('../data/provincias')


var NewVino = React.createClass({

    mixins: [ FormData, history, Reflux.connect(VinoStore,"onSaveBodega")],

    getInitialState: function() {
        return {
            bodegas: [],
            edades: [],
            tipos: [],
            uvas: []
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
            if (this.isMounted()) {
                this.setState({
                    bodegas: data
                });
            }
            return true;
        }.bind(this));

        $.ajax({
            url: "http://localhost:8080/vino/uvas",
            method: "GET",
            contentType:"application/json",
            dataType: "json"
        }).done(function( data ) {
            if (this.isMounted()) {
                this.setState({
                    uvas: data
                });
            }
            return true;
        }.bind(this));

        $.ajax({
            url: "http://localhost:8080/vino/edades",
            method: "GET",
            contentType:"application/json",
            dataType: "json"
        }).done(function( data ) {
            if (this.isMounted()) {
                this.setState({
                    edades: data
                });
            }
            return true;
        }.bind(this));

        $.ajax({
            url: "http://localhost:8080/vino/tipos",
            method: "GET",
            contentType:"application/json",
            dataType: "json"
        }).done(function( data ) {
            if (this.isMounted()) {
                this.setState({
                    tipos: data
                });
            }
            return true;
        }.bind(this));

        return;
    },

    render: function () {
        var options = [];
        for (var i=moment().format('YYYY') ; i>1970 ; i--) {
            options.push(
                <option value={i}>{i}</option>
            )
        }
        return (
            <div>
                <Header return="/busqueda" text="Nuevo Vino" back="true" />
                <div className="nuevo-vino-form-container">
                <form className="form-horizontal" onChange={this.updateFormData} onSubmit={this.handleSubmit}>
                    <Input labelClassName="col-xs-2" wrapperClassName="col-xs-10" name="nombre" type="text" label="nombre" placeholder="Ingrese el nombre"/>
                    <Input rows="8" labelClassName="col-xs-2" wrapperClassName="col-xs-10" name="descripcion" type="textarea" label="descripcion" placeholder="Ingrese una descripcion"/>
                    <Input labelClassName="col-xs-2" wrapperClassName="col-xs-10" name="bodega" type="select" label="bodega" placeholder="Seleccione ...">
                        {this.state.bodegas.map(function(bodega){return (<option value={bodega.id}>{bodega.nombre}</option>)})}
                    </Input>
                    <Input labelClassName="col-xs-2" wrapperClassName="col-xs-10" name="uva" type="select" label="uva" placeholder="Seleccione ...">
                        {this.state.uvas.map(function(uva){return (<option value={uva.id}>{uva.nombre}</option>)})}
                    </Input>
                    <Input labelClassName="col-xs-2" wrapperClassName="col-xs-10" name="tipoVino" type="select" label="tipo" placeholder="Seleccione ...">
                        {this.state.tipos.map(function(tipo){return (<option value={tipo.id}>{tipo.nombre}</option>)})}
                    </Input>
                    <Input labelClassName="col-xs-2" wrapperClassName="col-xs-10" name="edad" type="select" label="edad" placeholder="Seleccione ...">
                        {this.state.edades.map(function(edad){return (<option value={edad.id}>{edad.nombre}</option>)})}
                    </Input>
                    <Input labelClassName="col-xs-2" wrapperClassName="col-xs-10" name="cosecha" type="select" label="cosecha">
                        {options}
                    </Input>
                    <Input labelClassName="col-xs-2" wrapperClassName="col-xs-10" name="graduacion" type="text" label="graduacion" placeholder="Ingrese la graduacion"/>
                    <Input type="submit" className="btn btn-nuevo" value="Guardar"/>
                    </form>
                </div>
            </div>
        );
    },

    handleSubmit: function() {
        console.log(this.formData);
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
        }
        ;
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
            return true;;
        })
            .fail( function(xhr, textStatus, errorThrown) {
                console.log("Fail:"+textStatus);
                return;
            });
        this.history.pushState(null, `/`);
        return;
    }
});

module.exports = NewVino;
