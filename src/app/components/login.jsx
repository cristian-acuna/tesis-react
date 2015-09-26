var React = require('react');
var Bootstrap = require('react-bootstrap');
var Input = require('react-bootstrap').Input;
var Panel = require('react-bootstrap').Panel;

var Login = React.createClass({
    render: function () {
        return (
                    <Panel className="login-form" footer="login">
                        <form onSubmit={this.handleSubmit}>
                            <input type="email" label="Usuario" placeholder="Ingrese su usuario o e-mail" ref="usuario" />
                            <input type="password" label="Password" placeholder="Password" ref="password"/>
                            <Input type="checkbox" label="Recordarme" />
                            <Input type="submit" className="btn btn-login" value="login" />

                        </form>
                    </Panel>
                );
        },
    handleSubmit: function(e) {
        e.preventDefault();
        var usuario = React.findDOMNode(this.refs.usuario).value.trim();
        var password = React.findDOMNode(this.refs.password).value.trim();
        if (!usuario || !password) {
            return;
        }
        this.handleCommentSubmit({usuario: usuario, password: password});
        React.findDOMNode(this.refs.usuario).value = '';
        React.findDOMNode(this.refs.password).value = '';
    },

    handleCommentSubmit: function(datosLogin) {
        var comments = this.state.data;
        var nuevosDatos = comments.concat([datosLogin]);
        this.setState({data: nuevosDatos});
        $.ajax({
            url: "http://localhost:8080/login"
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