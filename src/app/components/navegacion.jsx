var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');

var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavDropdown = Bootstrap.NavDropdown;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;
var Link = require('react-router').Link;
var history = require('react-router').History;
var UserStore = require('../stores/userstore');
var UserActions = require('../actions/usuarioactions');


var Navegacion = React.createClass({

    mixins: [ history, Reflux.connect(UserStore,"onLogoutUser") ],

    handleClick: function(tab){
        this.props.changeTab(tab);
    },

    navigateToRegistro: function() {
        this.history.pushState(null, `/registro`);
    },

    navigateToTopList: function() {
        this.history.pushState(null, `/toplist`);
    },

    logOut: function() {
        UserActions.logoutUser();
        this.history.pushState(null, `/`);
    },

    render: function() {

        var userMenu = (
        <span>
            <span className="icon-nav glyphicon glyphicon-user" />{this.props.user.nombre?this.props.user.nombre:'Usuario'}
        </span>
        );
        var style = {
            height: '50px',
            display: 'inline'
        };
        return (
            <Navbar className="navbar navbar-inverse" style={{display: "block"}}>
                <a className="navigation-title" href="/">{this.props.projectName}</a>
                <Nav className="nav navbar-nav" styles={style}>
                    <Link className="bar-item" to={`/`}><span className="icon-nav glyphicon glyphicon-home"/>Home</Link>
                    <Link className="bar-item" to={`/busqueda`}><span className="icon-nav glyphicon glyphicon-search"/>Busqueda</Link>
                    <Link className="bar-item" to={`/wishlist`}><span className="icon-nav glyphicon glyphicon-glass"/>Wishlist</Link>
                    <NavDropdown eventKey={3} title="Recomendaciones">
                        <MenuItem onSelect={this.navigateToTopList}>Top List</MenuItem>
                        <MenuItem eventKey="3">Precio/Calidad</MenuItem>
                        <MenuItem eventKey="3">Bodegas mejor puntuadas</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav right className="navbar-nav">
                    <NavDropdown eventKey={3} title={userMenu}>
                        <MenuItem onSelect={this.navigateToRegistro}>Perfil</MenuItem>
                        <MenuItem divider />
                        <MenuItem onSelect={this.logOut}>Log out</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
});

module.exports = Navegacion;
