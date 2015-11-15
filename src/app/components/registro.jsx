var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var Ajax = require('../data/ajax.jsx');

var Input = require('react-bootstrap').Input;
var FormData = require('react-form-data');
var Header = require('./header.jsx');
var Panel = require('react-bootstrap').Panel;
var InputPassword = require('react-ux-password-field');

var history = require('react-router').History;
var provincias = require('../data/provincias')


var Registro = React.createClass({

    mixins: [ FormData, history],

    getInitialState: function() {
        return {data: []};
    },

    render: function () {
        console.log(provincias);
        return (
            <div>
                <Header return="/" text="Registro" back="true" />
                <Panel className="registro-form" footer="nuevo usuario">
                    <form onChange={this.updateFormData} onSubmit={this.handleSubmit}>
                        <Input name="nombre" type="text" label="nombre" placeholder="Ingrese su nombre"/>
                        <Input name="apellido" type="text" label="apellido" placeholder="Ingrese su apellido"/>
                        <Input name="email" type="email" label="direccion de e-mail" placeholder="Ingrese su e-mail"/>
                        <InputPassword strengthLang={['Inseguro', 'Poco seguro', 'Mejor', 'Muy seguro', 'Indecifrable']} name="password" className="password-field" label="clave" placeholder="Ingrese una clave"/>
                        <Input groupClassName="ciudad-field" name="ciudad" type="text" label="ciudad" placeholder="ciudad de recidencia"/>
                        <Input name="provincia" type="select" label="provincia" placeholder="Seleccione ...">
                            {provincias.map(function(provincia){return (<option value={provincia.value}>{provincia.provincia}</option>)})}
                        </Input>
                        <Input name="pais" type="text" label="pais" placeholder="Ingrese el pais"/>

                        <Input type="submit" className="btn btn-login" value="registrar"/>
                    </form>
                </Panel>

            </div>
        );
    },

    handleSubmit: function() {
        Ajax.call("http://localhost:8080/registrar","GET", this.formData, null);
        this.history.pushState(null, `/`);
    }
});

module.exports = Registro;
