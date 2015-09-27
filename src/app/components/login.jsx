var React = require('react');
var Bootstrap = require('react-bootstrap');
var Input = require('react-bootstrap').Input;
var Panel = require('react-bootstrap').Panel;
var FormData = require('react-form-data');
var Header = require('./header.jsx');


var Login = React.createClass({

    mixins: [ FormData ],

    render: function () {
        return (
            <div>
                <Header text="login" back="true"/>
                <Panel className="login-form" footer="login">
                    <form onChange={this.updateFormData} onSubmit={this.handleSubmit}>
                        <Input name="email" type="email" label="Usuario" placeholder="Ingrese su usuario o e-mail"/>
                        <Input name="password" type="password" label="Password" placeholder="Password"/>
                        <Input type="checkbox" label="Recordarme"/>
                        <Input type="submit" className="btn btn-login" value="login"/>
                    </form>
                    <a className="login-link-resistrarse">Registrarse</a>
                </Panel>
            </div>

                );
        },
    handleSubmit: function() {
        if (!this.formData.usuario || !this.formData.password) {
            return;
        }
        this.handleCommentSubmit(this.formData);
    },

    handleCommentSubmit: function(datosLogin) {
        $.ajax({
            url: "http://localhost:8080/login",
            type: 'POST',
            contentType:"application/json; charset=utf-8",
            data : JSON.stringify(datosLogin)
        }).done(function( data ) {
            console.log("done:"+data);
        })
            .fail( function(xhr, textStatus, errorThrown) {
            });
    },
    getInitialState: function() {
        return {data: []};
    }
});

module.exports = Login;