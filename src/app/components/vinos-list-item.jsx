var React = require('react/addons');
var Bootstrap = require('react-bootstrap');
var Label = require('react-bootstrap').Label;
var Input = require('react-bootstrap').Input;
var Link = require('react-bootstrap').Link;


var WineItem = React.createClass({

    getInitialState:function(){
        return{
            vino: this.props.data
        }
    },
    render: function () {
        var content = {};
        if(this.props.data != undefined) {
            content = (
                <div className="vino-list-item">
                <div className="vino-list-item--container">
                    <span className="vino-list-item--name">{this.props.data.name}</span>
                    <Label className="vino-list-item--grapes">{this.props.data.grapes}</Label>
                    <div className="vino-list-item--description">{this.props.data.description}</div>
                    <div className="vino-list-item--location">
                        <span>{this.props.data.region + "  |  "}</span>
                        <span className="vino-list-item--location-country">{this.props.data.country}</span>
                    </div>
                    <div className="vino-list-item--year">
                        <span className="vino-list-item--year-text">{"- "+this.props.data.year+" -"}</span>
                    </div>
                    <div className="vino-list-item--button">

                        <Input type="submit" className="vino-list-item--button-style" value="ver mas &raquo;"/>

                    </div>
                </div>
                </div>

            );
        } else {
            content = (<h2>Empty</h2>);
        }

        return content;
    }
});

module.exports = WineItem;