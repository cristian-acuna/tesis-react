var React = require('react');

var VinoStore = require('../stores/vinostore');

var Input = require('react-bootstrap').Input;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var SplitButton = require('react-bootstrap').SplitButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Dropdown = require('react-bootstrap').Dropdown;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Button = require('react-bootstrap').Button;
var Panel = require('react-bootstrap').Panel;
var ListItem = require('./vinos-list-item.jsx');
var SelectedFilter = require('./selectedFIlter.jsx');

var InstantBox = React.createClass({
    getInitialState:function(){
        return{
            selectedValues: [],
            bodegas: VinoStore.getBodegas(),
            edades: VinoStore.getEdades(),
            tipos: VinoStore.getTipos(),
            uvas: VinoStore.getUvas(),
            query:'',
            filteredData: this.props.data,
            bodega:'',
            edad:'',
            uva:'',
            tipo:''
        }
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            filteredData: nextProps.data
        });
    },

    doSearch:function(queryText){
        var searchCriteria = {
            queryText: queryText,
            bodega: this.state.bodega,
            edad: this.state.edad,
            uva: this.state.uva,
            tipo: this.state.tipo
        };

        $.ajax({
            url: "http://localhost:8080/vino/filtrar",
            asyc: false,
            method: "GET",
            contentType:"application/json",
            dataType: "json",
            data : searchCriteria
        }).done(function( data ) {
            this.setState({
                query:queryText,
                filteredData: data
            })
        }.bind(this));
    },

    selectValue: function(filtro, valor) {
        var selectedValues = this.state.selectedValues;
        var exists = false;
        this.state.selectedValues.map(function (item, index) {exists = item.filtro == filtro;}, this);

        if (!exists) {
            var filterItem = {
                filtro: filtro,
                valor: valor
            };
            selectedValues.push(filterItem);
            this.setState({
                selectedValues: selectedValues
            });
        }
    },

    handleUva:function(e){
        this.setState({uva: e.target.text});
        this.selectValue("uva", e.target.text);
    },

    handleTipo:function(e){
        this.setState({tipo: e.target.text});
        this.selectValue("tipo", e.target.text);
    },

    handleEdad:function(e){
        this.setState({edad: e.target.text});
        this.selectValue("edad", e.target.text);
    },

    handleBodega:function(e){
        this.setState({bodega: e.target.text});
        this.selectValue("bodega", e.target.text);
    },

    deleteFiltro:function(unselected){
        var newData = this.state.selectedValues.slice(); //copy array
        var unselectedIndex = this.state.selectedValues.map(function (item, index) {
            item.filtro == unselected? newData.splice(index, 1):''}, this); //delete item
        this.setState({selectedValues: newData}); //update state
        var stateObject = function() {
            returnObj = {};
            returnObj[unselected] = '';
            return returnObj;
        }.bind(unselected)();

        this.setState( stateObject );
    },

    render:function(){
        return (
            <div className="buscador--container">
                <SearchBox query={this.state.query} doSearch={this.doSearch}/>
                <Button bsStyle="link" className="buscador--filtro" onClick={ ()=> this.setState({ open: !this.state.open })}>
                    <Glyphicon style={{marginRight: 10 + 'px'}} glyph="ok" />
                    busqueda avanzada
                </Button>
                <span className="buscador--filtro-labels">
                    {
                        this.state.selectedValues.map(function (item, index) {
                            return <SelectedFilter index={index} filtro={item} deleteFiltro={this.deleteFiltro} />;
                        }, this)
                    }
                </span>
                    <Panel header="" className="buscador--filtro-panel" collapsible expanded={this.state.open}>
                        {this.renderListItems("uva",this.state.uvas, this.handleUva)}
                        {this.renderListItems("tipo de vino",this.state.tipos, this.handleTipo)}
                        {this.renderListItems("añejamiento",this.state.edades, this.handleEdad)}
                        {this.renderListItems("bodega",this.state.bodegas, this.handleBodega)}
                    </Panel>
                <DisplayTable data={this.state.filteredData}/>
            </div>
        );
    },

    renderListItems:function(criteria, collection, callBack ){
        return (
            <Dropdown className="buscador--filtro-combos" onSelect={callBack}>
                <Button style={{width: 170 + 'px'}}>
                    {criteria}
                </Button>
                <Dropdown.Toggle/>
                <Dropdown.Menu>
                    {collection.map(function (item, i) {return <MenuItem name={criteria} key={i}>{item.nombre}</MenuItem>;})}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
});

var SearchBox = React.createClass({
    getInitialState:function(){
        return{
            query: ''
        }
    },

    handleInput:function(event){
        this.setState(
            { query: event.target.value }
        )
    },

    doSearch:function(){
        this.props.doSearch(this.state.query);
    },

    render:function(){
        const innerButton = <Button onClick={this.doSearch}>
            <Glyphicon style={{marginRight: 10 + 'px'}} glyph="search" />
            buscar
        </Button>;

        return (
            <span className="buscador--search-container">
                <Input bsSize="small" type="text" onChange={this.handleInput} placeholder="Ingrese un nombre de vino" buttonAfter={innerButton} />
            </span>
        );
    }
});

var DisplayTable = React.createClass({
    render:function(){
        if(this.props.data.length!=0) {
            return (
                <div>
                    {this.props.data.map(function (vino, i) {return <ListItem key={i} data={vino}/>;})}
                </div>
            );
        }
        return null;
    }
});

module.exports = InstantBox;