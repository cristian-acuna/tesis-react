var React = require('react');
var Input = require('react-bootstrap').Input;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var SplitButton = require('react-bootstrap').SplitButton;
var MenuItem = require('react-bootstrap').MenuItem;
var ListItem = require('./vinos-list-item.jsx');


var InstantBox = React.createClass({
    componentWillReceiveProps(nextProps) {
        this.setState({
            filteredData: nextProps.data
        });
    },

    doSearch:function(queryText){
        var queryResult=[];
        this.props.data.forEach(function(vino){
            if(vino.nombre.toLowerCase().indexOf(queryText.toLowerCase())!=-1)
                queryResult.push(vino);
        });

        this.setState({
            query:queryText,
            filteredData: queryResult
        })
    },

    getInitialState:function(){
        return{
            query:'',
            filteredData: this.props.data
        }
    },
    render:function(){
        return (
            <div className="InstantBox">
                <SearchBox query={this.state.query} doSearch={this.doSearch}/>
                <ButtonToolbar className="buscador--filtro">
                    <SplitButton bsStyle="primary" title="Filtros" dropdown pullRight id="split-button-dropdown-pull-right">
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </SplitButton>
                </ButtonToolbar>
                <DisplayTable data={this.state.filteredData}/>
            </div>
        );
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