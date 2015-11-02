    var React = require('react');
    var Bootstrap = require('react-bootstrap');
    var Reflux = require('reflux');

    var UserStore = require('./stores/userstore');
    var VinoActions = require('./actions/vinoactions');
    var VinoStore = require('./stores/vinostore');

    var Navegacion = require('./components/navegacion.jsx');
    var Busqueda = require('./components/busqueda.jsx');

    var Home = require('./components/home.jsx');
    var Login = require('./components/login.jsx');
    var Headroom = require('react-headroom');
    var Registro = require('./components/registro.jsx');
    var VerVino = require('./components/ver-vino.jsx');
    var NuevoVino = require('./components/nuevo-vino.jsx');

    var Modal = require('react-bootstrap').Modal;
    var Router = require('react-router').Router;
    var IndexRoute = require('react-router').IndexRoute;
    var Route = require('react-router').Route;
    var history = require('react-router/lib/History').default;


    var App = React.createClass({

        mixins: [Reflux.listenTo(UserStore, 'onLoginUser'),
            Reflux.connect(VinoStore,"onSaveBodega")
        ],

        getInitialState: function () {
            return {
                currentTab: 0,
                userSession: {},
                showModal: true
            };
        },

        componentDidMount: function() {
            $.ajax({
                url: "http://localhost:8080/bodega/listar",
                asyc: false,
                method: "GET",
                contentType:"application/json",
                dataType: "json"
            }).done(function( data ) {
                VinoActions.setBodegas(data);
            }.bind(this));

            $.ajax({
                url: "http://localhost:8080/vino/uvas",
                asyc: false,
                method: "GET",
                contentType:"application/json",
                dataType: "json"
            }).done(function( data ) {
                VinoActions.setUvas(data);
            }.bind(this));

            $.ajax({
                url: "http://localhost:8080/vino/edades",
                asyc: false,
                method: "GET",
                contentType:"application/json",
                dataType: "json"
            }).done(function( data ) {
                VinoActions.setEdades(data);
            }.bind(this));

            $.ajax({
                url: "http://localhost:8080/vino/tipos",
                asyc: false,
                method: "GET",
                contentType:"application/json",
                dataType: "json"
            }).done(function( data ) {
                VinoActions.setTipos(data);
            }.bind(this));

            return;
        },

        onLoginUser: function(usuario) {
            usuario.nombre!=undefined?this.close() : this.open();
            this.setState({ userSession: usuario });
        },

        close() {
            this.setState({ showModal: false });
        },

        open() {
            this.setState({ showModal: true });
        },

        changeTab: function (index) {
            this.setState({currentTab: index});
        },

        render: function () {
            const { pathname } = this.props.location

            return (
                <div>
                    <Modal keyboard={false} show={this.state.showModal} className="login-modal" onHide={this.close}>
                        <Login onClose={this.close}/>
                    </Modal>
                    <Headroom>
                        <Navegacion user={this.state.userSession} projectName="Somellier" changeTab={this.changeTab}/>
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
                <IndexRoute component={Home}/>
                <Route path="/busqueda" component={Busqueda} />
                <Route path="/nuevo" component={NuevoVino} />
                <Route path="/registro" component={Registro}/>
                <Route path="/ver" component={VerVino}/>
            </Route>
        </Router>
    ), document.getElementById('content'));
