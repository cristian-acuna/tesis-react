var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var Ajax = require('../data/ajax.jsx');

var Button = Bootstrap.Button;
var Glyphicon = Bootstrap.Glyphicon;
var Input = Bootstrap.Input;

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

        Ajax.call("http://localhost:8080/vino/comentarios","GET", commentsCriteria,  this.setComentarios);
    },

    render: function () {
        const innerButton = <Button onClick={this.doComment}>
                                <Glyphicon style={{marginRight: 10 + 'px'}} glyph="comment" />comentar
                            </Button>;
        return (
            <div className="comment-box">
                <div>
                    <span className="comment-box--input">
                        <Input bsSize="small" ref="commentInput" type="text" placeholder="Ingrese su comentario" buttonAfter={innerButton} />
                    </span>
                </div>
                {this.state.comentarios.map(
                    function (comentario, i) {
                        const trashComponent =
                        <p>
                            <Button onClick={this.deleteComment} className="comment--button" bsStyle="link">
                                <Glyphicon glyph="trash" id={comentario.id}/>
                            </Button>
                        </p>;
                        return <div className="comment">
                                    <span>
                                        <b style={{color: 'mediumpurple'}}>
                                            {comentario.usuario.nombre+' '+comentario.usuario.apellido}
                                        </b> comento:
                                    </span>
                                    <p style={{fontSize: '12px'}}>
                                        <i>
                                            {comentario.comentario}
                                        </i>
                                    </p>
                                    <span className="comment--fecha">
                                        Fecha de comentario: {comentario.fecha}
                                    </span>
                                    {comentario.usuario.id == 1? trashComponent : null}
                               </div>;
                    }.bind(this)
                )}
            </div>
        );
    },

    doComment: function () {
        var request =
        {
            comentario: this.refs.commentInput.getInputDOMNode().value,
            usuario: 1,
            vino: this.props.vino.id
        };

        Ajax.call("http://localhost:8080/vino/comentar","POST", JSON.stringify(request), this.setComentarios);
    },

    deleteComment: function (event) {
        var commentsCriteria = {
            id: event.target.id,
            idVino: this.props.vino.id
        };

        Ajax.call("http://localhost:8080/vino/descomentar","GET", commentsCriteria, this.setComentarios);
    },

    setComentarios: function (data) {
        this.setState({
            comentarios: data
        });
        this.refs.commentInput.getInputDOMNode().value="";
    }

/*    ajaxCall: function (url, method, object) {
        $.ajax({
            url: url,
            async:false,
            method: method,
            contentType:"application/json",
            dataType: "json",
            data : object
        }).done(function( data ) {
            this.setState({
                comentarios: data
            });
            this.refs.commentInput.getInputDOMNode().value="";
        }.bind(this));
    }*/
});

module.exports = CommentBox;
