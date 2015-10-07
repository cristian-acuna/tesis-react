var React = require('react/addons');
var Input = require('react-bootstrap').Input;
var ListItem = require('./vinos-list-item.jsx');


var InstantBox = React.createClass({
    doSearch:function(queryText){
        var queryResult=[];
        this.props.data.forEach(function(vino){
            if(vino.name.toLowerCase().indexOf(queryText.toLowerCase())!=-1)
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
                <h2>Instant Search</h2>
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
            <input type="text" ref="searchInput" placeholder="Ingrese un nombre de vino" value={this.props.query} onChange={this.doSearch}/>
        );
    }
});

var DisplayTable = React.createClass({
    render:function(){
        //Construccion de las filas
        return(
            <div className="">
                {this.props.data.map(function(vino, i){
                    return <ListItem data={vino}/>;
                })}
            </div>
        );
    }
});


module.exports = InstantBox;