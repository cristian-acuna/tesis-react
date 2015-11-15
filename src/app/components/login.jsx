var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var Ajax = require('../data/ajax.jsx');

var Input = require('react-bootstrap').Input;
var Panel = require('react-bootstrap').Panel;
var FormData = require('react-form-data');
var Header = require('./header.jsx');
var Link = require('react-router').Link;
var UserActions = require('../actions/usuarioactions');


var Login = React.createClass({

    mixins: [ FormData ],

    render: function () {
        return (
                <Panel className="login-form" footer="login">
                    <form onChange={this.updateFormData} onSubmit={this.handleSubmit}>
                        <Input name="email" type="email" label="Usuario" placeholder="Ingrese su usuario o e-mail"/>
                        <Input name="password" type="password" label="Password" placeholder="Password"/>
                        <Input type="checkbox" label="Recordarme"/>
                        <Input type="submit" className="btn btn-login" value="login"/>
                    </form>
                    <Link className="login-link-registrarse" onClick={this.props.onClose} to={`/registro`}>Registrarse</Link>
                </Panel>
                );
        },
    handleSubmit: function(e) {
        e.preventDefault();
        if (!this.formData.email || !this.formData.password) {
            return;
        }

        Ajax.call("http://localhost:8080/login","GET", this.formData,  this.setLoguedInUser);
    },

    setLoguedInUser: function (data) { UserActions.loginUser(data); }
});

module.exports = Login;