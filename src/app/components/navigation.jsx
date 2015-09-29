var React = require('react');
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;
var Link = require('react-router').Link;
var Router = require('react-router');



var Navigation = React.createClass({

    handleClick: function(tab){
        this.props.changeTab(tab);
    },

    render: function() {
        return (
            <Navbar className="navbar navbar-inverse">
                <a className="navigation-title" href="/">{this.props.projectName}</a>
                <Nav className="nav navbar-nav">
                    <Link className="bar-item" to={`/`}><span className="icon-nav glyphicon glyphicon-home"/>Home</Link>
                    <Link className="bar-item" to={`/busqueda`}><span className="icon-nav glyphicon glyphicon-search"/>Busqueda</Link>
                    <Link className="bar-item" to={`/`}><span className="icon-nav glyphicon glyphicon-glass"/>Wishlist</Link>
                    <DropdownButton eventKey={3} title="Mis Vinos">
                        <MenuItem onSelect={this.handleClick.bind(this, 3)}>Agregar ...</MenuItem>
                        <MenuItem eventKey="2">Recomendacion</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </DropdownButton>
                </Nav>
                <Nav className="nav navbar-nav navbar-right">
                    <Link className="bar-item" to={`/login`}><span className="icon-nav glyphicon glyphicon-user"/>Usuario</Link>
                </Nav>

            </Navbar>
        );
    }
});

module.exports = Navigation;
