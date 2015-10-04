var React = require('react');
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavDropdown = Bootstrap.NavDropdown;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;
var Link = require('react-router').Link;
var history = require('react-router').History;

var Navigation = React.createClass({

    mixins: [ history ],

    handleClick: function(tab){
        this.props.changeTab(tab);
    },

    navigate: function() {
        this.history.pushState(null, `/registro`);
    },

    render: function() {

        var userMenu = (
        <span>
            <span className="icon-nav glyphicon glyphicon-user" />{this.props.user.nombre?this.props.user.nombre:'Usuario'}
        </span>
        );

        return (
            <Navbar className="navbar navbar-inverse">
                <a className="navigation-title" href="/">{this.props.projectName}</a>
                <Nav className="nav navbar-nav">
                    <Link className="bar-item" to={`/`}><span className="icon-nav glyphicon glyphicon-home"/>Home</Link>
                    <Link className="bar-item" to={`/busqueda`}><span className="icon-nav glyphicon glyphicon-search"/>Busqueda</Link>
                    <Link className="bar-item" to={`/`}><span className="icon-nav glyphicon glyphicon-glass"/>Wishlist</Link>
                    <NavDropdown eventKey={3} title="Mis Vinos">
                        <MenuItem eventKey="2">Recomendacion</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav right className="navbar-nav">
                    <NavDropdown eventKey={3} title={userMenu}>
                        <MenuItem onSelect={this.navigate}>Perfil</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Log out</MenuItem>
                    </NavDropdown>
                </Nav>

            </Navbar>
        );
    }
});

module.exports = Navigation;
