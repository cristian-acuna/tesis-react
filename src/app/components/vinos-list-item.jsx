var React = require('react/addons');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');

var Label = Bootstrap.Label;
var Input = Bootstrap.Input;
var Button = Bootstrap.Button;
var Glyphicon = Bootstrap.Glyphicon;

var history = require('react-router').History;
var VinoActions = require('../actions/vinoactions');
var VinoStore = require('../stores/vinostore');

var WineItem = React.createClass({

    mixins: [history, Reflux.connect(VinoStore,"onVinoElegido")],

    render: function () {
        var content = {};
        var deleteButton =
            <Button onClick={this.deleteWish} className="comment--button" bsStyle="link">
                <Glyphicon glyph="trash"/>
            </Button>

        if(this.props.data.nombre !== undefined) {
            content = (
                <div className="vino-list-item">
                <div className="vino-list-item--container">
                    {this.props.puedeBorrar ? deleteButton : null}
                    <span className="vino-list-item--name">{this.props.data.nombre}</span>
                    <Label className="vino-list-item--grapes">{this.props.data.uva.nombre}</Label>
                    <div className="vino-list-item--description">{this.props.data.descripcion}</div>
                    <div className="vino-list-item--location">
                        <span>{this.props.data.bodega.residencia.provincia.descripcion + "  |  "}</span>
                        <span className="vino-list-item--location-country">{this.props.data.bodega.residencia.pais}</span>
                    </div>
                    <div className="vino-list-item--year">
                        <span className="vino-list-item--year-text">{"- "+this.props.data.cosecha+" -"}</span>
                    </div>
                    <div className="vino-list-item--button">
                        <Input type="submit" onClick={this.openDetail} className="vino-list-item--button-style" value="ver mas &raquo;"/>
                    </div>
                </div>
                </div>
            );
        } else {
            content = (<h2>Empty</h2>);
        }

        return content;
    },

    openDetail:function(){
        VinoActions.vinoElegido(this.props.data);
        this.history.pushState(null, `/ver`);
    },

    deleteWish:function(){
        var wishToDelete = {
            usuario: 1,
            vino: this.props.data.id
        };

        $.ajax({
            url: "http://localhost:8080/wishlist/wish",
            async: false,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data : JSON.stringify(wishToDelete)
        }).done(function( data ) {
            VinoActions.setWishlist(data);
        }.bind(this));
    }
});

module.exports = WineItem;