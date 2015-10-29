var React = require('react');
var Label = require('react-bootstrap').Label;
var Glyphicon = require('react-bootstrap').Glyphicon;

var SelectedFilter = React.createClass({
    render: function () {
            return <Label className="buscador--selected-item"
                          onClick={this.props.deleteFiltro.bind(null,this.props.filtro.filtro)}
                          bsStyle="info">
                <Glyphicon style={{marginRight: 10 + 'px'}} glyph="remove" />
                {this.props.filtro.valor}</Label>;
    }
});

module.exports = SelectedFilter;

