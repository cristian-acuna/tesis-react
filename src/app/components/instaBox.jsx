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


var InstantBox = React.createClass({
    getInitialState:function(){
        return{
            bodegas: VinoStore.getBodegas(),
            edades: VinoStore.getEdades(),
            tipos: VinoStore.getTipos(),
            uvas: VinoStore.getUvas(),
            query:'',
            filteredData: this.props.data,
        }
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            filteredData: nextProps.data
        });
    },

    doSearch:function(queryText){
        var queryResult=[];
        var filter={};
        this.props.data.forEach(function(vino){
            if(vino.nombre.toLowerCase().indexOf(queryText.toLowerCase())!=-1)
                queryResult.push(vino);
        });

        this.setState({
            query:queryText,
            filteredData: queryResult
        })
    },

    handleUva:function(e){
        var queryResult=[];
        this.props.data.forEach(function(vino){
            if(vino.uva.nombre.toLowerCase().indexOf(e.target.text.toLowerCase())!=-1)
                queryResult.push(vino);
        });
        this.setState({filteredData: queryResult});
    },

    handleTipo:function(e){
        var queryResult=[];
        this.props.data.forEach(function(vino){
            if(vino.tipoVino.nombre.toLowerCase().indexOf(e.target.text.toLowerCase())!=-1)
                queryResult.push(vino);
        });
        this.setState({filteredData: queryResult});
    },

    handleEdad:function(e){
        var queryResult=[];
        this.props.data.forEach(function(vino){
            if(vino.edad.nombre.toLowerCase().indexOf(e.target.text.toLowerCase())!=-1)
                queryResult.push(vino);
        });
        this.setState({filteredData: queryResult});
    },

    handleBodega:function(e){
        var queryResult=[];
        this.props.data.forEach(function(vino){
            if(vino.bodega.nombre.toLowerCase().indexOf(e.target.text.toLowerCase())!=-1)
                queryResult.push(vino);
        });
        this.setState({filteredData: queryResult});
    },

    render:function(){
        return (
            <div className="InstantBox">
                <SearchBox query={this.state.query} doSearch={this.doSearch}/>
                <Button className="buscador--filtro" onClick={ ()=> this.setState({ open: !this.state.open })}>
                    <Glyphicon style={{marginRight: 10 + 'px'}} glyph="ok" />
                    busqueda avanzada
                </Button>
                    <Panel className="buscador--filtro-panel" collapsible expanded={this.state.open}>
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
                <Button style={{width: 170 + 'px', backgroundColor: 'mediumpurple', color: 'whitesmoke'}}>
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
    doSearch:function(){
        var query = React.findDOMNode(this.refs.searchInput).value;
        this.props.doSearch(query);
    },
    render:function(){
        return (
            <input className="form-control buscador--input" type="text" ref="searchInput" placeholder="Ingrese un nombre de vino" value={this.props.query} onChange={this.doSearch}/>
        );
    }
});

var DisplayTable = React.createClass({
    render:function(){
        if(this.props.data.length!=0) {
            return (
                <div>
                    {this.props.data.map(function (vino, i) {
                        return <ListItem key={i} data={vino}/>;
                    })
                    }
                </div>
            );
        }
        return null;
    }
});

module.exports = InstantBox;