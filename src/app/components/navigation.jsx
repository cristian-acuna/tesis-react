var React = require('react');
var Bootstrap = require('react-bootstrap');

var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var Navigation = React.createClass({

    handleClick: function(tab){
        this.props.changeTab(tab);
    },

    render: function() {
        return (
            <Navbar className="navbar navbar-inverse">
                <a className="navigation-title" href="\">{this.props.projectName}</a>
                <Nav className="nav navbar-nav">
                    <NavItem onSelect={this.handleClick.bind(this, 0)}  className="active">Home</NavItem>
                    <NavItem onSelect={this.handleClick.bind(this, 1)}>Busqueda</NavItem>
                    <NavItem onSelect={this.handleClick.bind(this, 2)}>Wishlist</NavItem>
                    <DropdownButton eventKey={3} title="Mis Vinos">
                        <MenuItem eventKey="1">Agregar ...</MenuItem>
                        <MenuItem eventKey="2">Recomendacion</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </DropdownButton>
                </Nav>
            </Navbar>
        );
    }
});

module.exports = Navigation;
