var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');

var Input = require('react-bootstrap').Input;
var Panel = require('react-bootstrap').Panel;
var FormData = require('react-form-data');
var Header = require('./header.jsx');
var Link = require('react-router').Link;
var Ajax = require('react-ajax');
var UserActions = require('../actions/useractions');
var UserStore = require('../stores/userstore');




var Login = React.createClass({

    mixins: [ FormData, Reflux.connect(UserStore,"onLoginUser")],

    render: function () {
        return (
                <Panel className="login-form" footer="login">
                    <form onChange={this.updateFormData} onSubmit={this.handleSubmit.bind(this)}>
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

        this.handleCommentSubmit(this.formData);
    },

    handleCommentSubmit: function(datosLogin) {
        $.ajax({
            url: "http://localhost:8080/login",
            method: "GET",
            contentType:"application/json",
            dataType: "json",
            data : datosLogin
        }).done(function( data ) {
            UserActions.loginUser(data);
            return true;
        })
        .fail( function(xhr, textStatus, errorThrown) {
            console.log("Fail:"+textStatus);
            });
    }
});

module.exports = Login;