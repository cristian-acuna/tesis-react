var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');

var Tooltip = Bootstrap.Tooltip;
var OverlayTrigger = Bootstrap.OverlayTrigger;
var Label = Bootstrap.Label;
var Jumbotron = Bootstrap.Jumbotron;
var Button = Bootstrap.Button;
var Glyphicon = Bootstrap.Glyphicon;
var Input = Bootstrap.Input;

var Rating = require('react-rating');
var Header = require('./header.jsx');
var history = require('react-router').History;
var VinoStore = require('../stores/vinostore');

var CommentBox = React.createClass({

    getInitialState: function () {
        return {
            comentario: '',
            comentarios: []
        };
    },

    componentDidMount: function() {
        var commentsCriteria = {
            id: this.props.vino.id
        };

        $.ajax({
            url: "http://localhost:8080/vino/comentarios",
            async:false,
            method: "GET",
            contentType:"application/json",
            dataType: "json",
            data : commentsCriteria
        }).done(function( data ) {
                this.setState({
                    comentarios: data
                });
            return true;
        }.bind(this));
    },

    render: function () {
        const innerButton = <Button onClick={this.doComment}>
                                <Glyphicon style={{marginRight: 10 + 'px'}} glyph="comment" />
                                comentar
                            </Button>;
        return (
            <div className="comment-box">
                <div>
                    <span className="comment-box--input">
                        <Input bsSize="small" onChange={this.handleInput} type="textarea" placeholder="Ingrese su comentario" buttonAfter={innerButton} />
                    </span>
                </div>
                {this.state.comentarios.map(
                    function (comentario, i) {
                        return  <div className="comment">
                                    <span><b>{comentario.usuario.nombre+' '+comentario.usuario.apellido}</b> comento:</span>
                                    <p style={{fontSize: '12px'}}><i>{comentario.comentario}</i></p>
                                    <span className="comment--fecha">Fecha de comentario: {comentario.fecha}</span>
                                    <p><Button className="comment--button" bsStyle="link"><Glyphicon glyph="trash" /></Button></p>
                                </div>;
                    }
                )}
            </div>
        );
    },

    handleInput:function(event){
        this.setState(
            { comentario: event.target.value }
        )
    },

    doComment: function () {
        var request =
        {
            comentario: this.state.comentario,
            usuario: 1,
            vino: this.props.vino.id
        };

        $.ajax({
            url: "http://localhost:8080/vino/comentar",
            async: false,
            method: "POST",
            crossOrigin: true,
            contentType:"application/json",
            dataType: "json",
            data: JSON.stringify(request)
        }).done(function( data ) {
            this.setState({
                arrayvar: this.state.comentarios.concat([newelement])
            })
            console.log("RATEDDDDDDDDDDDDD:");

            return true;
        }).fail( function(xhr, textStatus, errorThrown) {
            console.log("Fail:"+textStatus);
        });
    }
});

module.exports = CommentBox;
