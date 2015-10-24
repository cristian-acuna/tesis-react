var React = require('react');
var Input = require('react-bootstrap').Input;
var ListItem = require('./vinos-list-item.jsx');


var InstantBox = React.createClass({
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

    componentWillReceiveProps: function(nextProps){
        this.setState({
            filteredData: nextProps.data
        });
    },

    render:function(){
        return (
            <div className="InstantBox">
                <SearchBox query={this.state.query} doSearch={this.doSearch}/>
                <DisplayTable data={this.state.filteredData}/>
            </div>
        );
    }
});

var SearchBox = React.createClass({
    doSearch:function(){
        var query = React.findDOMNode(this.refs.searchInput).value;            // this is the search text
        this.props.doSearch(query);
    },
    render:function(){
        return (
            <input className="form-control search-input" type="text" ref="searchInput" placeholder="Ingrese un nombre de vino" value={this.props.query} onChange={this.doSearch}/>
        );
    }
});

var DisplayTable = React.createClass({
    getInitialState:function(){
        return{
            rowsData: []
        }
    },

    componentWillReceiveProps: function(nextProps){
        this.setState({
            rowsData: nextProps.data
        });
    },

    render:function(){
        //Construccion de las filas
        return(
            <div className="">
                {this.state.rowsData.map(function(vino, i){
                    return <ListItem data={vino}/>;
                })}
            </div>
        );
    }
});

module.exports = InstantBox;