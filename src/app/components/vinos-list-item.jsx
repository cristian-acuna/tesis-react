var React = require('react/addons');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');

var Label = Bootstrap.Label;
var Input = Bootstrap.Input;
var Button = Bootstrap.Button;
var Glyphicon = Bootstrap.Glyphicon;

var history = require('react-router').History;
var VinoActions = require('../actions/vinoactions');

var WineItem = React.createClass({

    mixins: [ history ],

    render: function () {
        var content = {};
        var deleteButton =
            <Button onClick={this.deleteWish} className="comment--button" bsStyle="link">
                <Glyphicon glyph="trash"/>
            </Button>
        var editButton =
            <Button onClick={this.editarVino} className="vino-list-item--edit" bsStyle="link">
                <Glyphicon glyph="pencil"/>
            </Button>
        var decodedImg = 'data:image/png;base64,'.concat(this.props.data.imagen);

        if(this.props.data.nombre !== undefined) {
            content = (
                <div className="vino-list-item">
                <div className="vino-list-item--container">
                    {this.props.puedeBorrar ? deleteButton : null}
                    <span className="vino-list-item--name">{this.props.data.nombre}</span>
                    <Label className="vino-list-item--grapes">{this.props.data.uva.nombre}</Label>
                    <div className="vino-list-item--frame">
                        <img className="vino-list-item--image" src={decodedImg} />
                    </div>
                    <div className="vino-list-item--description">{this.props.data.descripcion}</div>
                    <div className="vino-list-item--location">
                        <span>{this.props.data.bodega.residencia.provincia.descripcion + "  |  "}</span>
                        <span className="vino-list-item--location-country">{this.props.data.bodega.residencia.pais}</span>
                    </div>
                    <div className="vino-list-item--year">
                        <span className="vino-list-item--year-text">{"- "+this.props.data.cosecha+" -"}</span>
                    </div>
                    {editButton}
                    <div className="vino-list-item--button">
                        <Input type="submit"
                               onClick={this.openDetail}
                               className="vino-list-item--button-style"
                               value="ver mas &raquo;"/>
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
        this.props.ondeleteWish(this.props.data.id);
    },

    editarVino:function(){
        VinoActions.vinoElegido(this.props.data);
        this.history.pushState(null, `/nuevo`);
    }
});

module.exports = WineItem;