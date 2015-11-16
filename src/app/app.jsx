    var React = require('react');
    var Bootstrap = require('react-bootstrap');
    var Reflux = require('reflux');

    var UserStore = require('./stores/userstore');
    var VinoActions = require('./actions/vinoactions');
    var VinoStore = require('./stores/vinostore');
    var Ajax = require('./data/ajax.jsx');

    var Navegacion = require('./components/navegacion.jsx');
    var Busqueda = require('./components/busqueda.jsx');

    var Home = require('./components/home.jsx');
    var Login = require('./components/login.jsx');
    var Headroom = require('react-headroom');
    var Registro = require('./components/registro.jsx');
    var VerVino = require('./components/ver-vino.jsx');
    var NuevoVino = require('./components/nuevo-vino.jsx');
    var Wishlist = require('./components/wishlist.jsx');
    var TopList = require('./components/topList.jsx');

    var Modal = require('react-bootstrap').Modal;
    var Router = require('react-router').Router;
    var IndexRoute = require('react-router').IndexRoute;
    var Route = require('react-router').Route;
    var history = require('react-router/lib/History').default;


    var App = React.createClass({

        mixins: [Reflux.listenTo(UserStore, 'onLoginUser')],

        getInitialState: function () {
            return {
                userSession: {},
                showModal: true
            };
        },

        setBodegas: function (data) { VinoActions.setBodegas(data); },

        setUvas: function (data) { VinoActions.setUvas(data); },

        setEdades: function (data) { VinoActions.setEdades(data); },

        setTipos: function (data) { VinoActions.setTipos(data); },

        componentDidMount: function() {
            Ajax.call("http://localhost:8080/bodega/listar", "GET", '', this.setBodegas);
            Ajax.call("http://localhost:8080/vino/uvas", "GET", '', this.setUvas);
            Ajax.call("http://localhost:8080/vino/edades", "GET", '', this.setEdades);
            Ajax.call("http://localhost:8080/vino/tipos", "GET", '', this.setTipos);
        },

        onLoginUser: function(usuario) {
            usuario.nombre != undefined ? this.close() : this.open();
            this.setState({
                userSession: usuario
            });
        },

        close() {
            this.setState({ showModal: false });
        },

        open() {
            this.setState({ showModal: true });
        },

        render: function () {
            const { pathname } = this.props.location

            return (
                <div className="app-container">
                    <Modal backdrop={false} keyboard={false} show={this.state.showModal} className="login-modal" onHide={this.close}>
                        <Login onClose={this.close}/>
                    </Modal>
                    <Headroom>
                        <Navegacion user={this.state.userSession} projectName="Somellier" />
                    </Headroom>
                    <div className="section-container">
                        {React.cloneElement(this.props.children || <div />, { key: pathname })}
                    </div>
                </div>
            );
        }
    });

    React.render((
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/busqueda" component={Busqueda} />
                <Route path="/nuevo" component={NuevoVino} />
                <Route path="/registro" component={Registro} />
                <Route path="/ver" component={VerVino} />
                <Route path="/wishlist" component={Wishlist} />
                <Route path="/toplist" component={TopList} />
            </Route>
        </Router>
    ), document.getElementById('content'));
