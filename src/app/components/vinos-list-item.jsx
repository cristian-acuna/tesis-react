var React = require('react');
var Bootstrap = require('react-bootstrap');
var Label = require('react-bootstrap').Label;


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
                    <span className="vino-list-item--name">{this.props.data.name}</span>
                    <Label bsStyle="default">{this.props.data.grapes}</Label>


                    <div className="vino-list-item--description">{this.props.data.description}</div>

                    <span className="vino-list-item--location">{this.props.data.region + "  |  " + this.props.data.country}</span>
                    <div className="vino-list-item--year">
                        <span className="vino-list-item--year-text">{this.props.data.year}</span>
                    </div>
                    <div className="vino-list-item--button"><a href="http://www.tutorialrepublic.com/css-tutorial/" target="_blank"
                          className="btn btn-success">ver detalle &raquo;</a></div>
                </div>
            );
        } else {
            content = (<h2>Empty</h2>);
        }

        return content;
    }
});

module.exports = WineItem;