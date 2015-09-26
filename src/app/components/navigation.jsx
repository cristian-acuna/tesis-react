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
                    <NavItem onSelect={this.handleClick.bind(this, 0)}><span className="icon-nav glyphicon glyphicon-home"/>Home</NavItem>
                    <NavItem onSelect={this.handleClick.bind(this, 1)}><span className="icon-nav glyphicon glyphicon-search"/>Busqueda</NavItem>
                    <NavItem onSelect={this.handleClick.bind(this, 2)}><span className="icon-nav glyphicon glyphicon-glass"/>Wishlist</NavItem>
                    <DropdownButton eventKey={3} title="Mis Vinos">
                        <MenuItem onSelect={this.handleClick.bind(this, 3)}>Agregar ...</MenuItem>
                        <MenuItem eventKey="2">Recomendacion</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </DropdownButton>
                </Nav>
                <Nav className="nav navbar-nav navbar-right">
                    <NavItem onSelect={this.handleClick.bind(this, 1)}><span className="icon-nav glyphicon glyphicon-user"/>Usuario</NavItem>
                </Nav>

            </Navbar>
        );
    }
});

module.exports = Navigation;
