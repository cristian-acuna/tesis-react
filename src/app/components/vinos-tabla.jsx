var React = require('react/addons');
var Bootstrap = require('react-bootstrap');

var ListItem = require('./vinos-list-item.jsx');

var VinosTabla = React.createClass({
    render:function(){
        if(this.props.data.length!=0) {
            return (
                <div>
                    {this.props.data.map(function (vino, i) {return <ListItem deleteWish={this.props.deleteWish} puedeBorrar={this.props.onWishlist} key={i} data={vino}/>;}.bind(this))}
                </div>
            );
        }
        return null;
    }
});

module.exports = VinosTabla;