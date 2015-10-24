var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var moment = require('moment');

var Input = require('react-bootstrap').Input;
var Panel = require('react-bootstrap').Panel;
var FormData = require('react-form-data');
var Link = require('react-router').Link;
var VinoActions = require('../actions/vinoactions');
var VinoStore = require('../stores/vinostore');


var NuevaBodega = React.createClass({

    mixins: [ FormData, Reflux.connect(VinoStore,"onSaveBodega")],

    render: function () {
        var options = [];
        for (var i=moment().format('YYYY') ; i>1970 ; i--) {
            options.push(
                <option value={i}>{i}</option>
            )
        }

        return (
            <Panel className="bodega-form" footer="nueva bodega">
                <form onChange={this.updateFormData} onSubmit={this.handleSubmit}>
                    <Input name="nombre" type="text" label="nombre" placeholder="Ingrese el nombre de la bodega"/>
                    <Input name="descripcion" type="text" label="reseña" placeholder="Ingrese una reseña"/>
                    <Input className="form-input-separation" name="anio" type="select" label="fecha de fundacion">
                        <option value="placeholder">Seleccione un año ...</option>
                        {options}
                    </Input>
                    <Input name="ciudad" type="text" label="ciudad" placeholder="Ingrese una ciudad"/>
                    <Input name="provincia" type="text" label="provincia" placeholder="Ingrese una provincia"/>
                    <Input name="pais" type="text" label="pais" placeholder="Ingrese un pais"/>
                    <Input name="link" type="text" label="link" placeholder="Ingrese un link"/>
                    <Input type="submit" className="btn btn-login" value="guardar"/>
                </form>
            </Panel>
        );
    },
    handleSubmit: function(e) {
        var request =
        {
            nombre: this.formData.nombre,
            descripcion: this.formData.descripcion,
            anio: this.formData.anio,
            link: this.formData.link,
            residencia: {
                ciudad: this.formData.ciudad,
                provincia: parseInt(this.formData.provincia),
                pais: this.formData.pais
            }
        };
        $.ajax({
            url: "http://localhost:8080/bodega/registrar",
            async: false,
            method: "POST",
            crossOrigin: true,
            contentType:"application/json",
            dataType: "json",
            data: JSON.stringify(request)
        }).done(function( data ) {
            VinoActions.saveBodega(data);
            return true;
        }).fail( function(xhr, textStatus, errorThrown) {
            console.log("Fail:"+textStatus);
        });
        this.props.onClose();
    }
});

module.exports = NuevaBodega;