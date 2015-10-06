    var React = require('react');
    var Bootstrap = require('react-bootstrap');
    var Reflux = require('reflux');
    var UserStore = require('./stores/userstore');

    var Navigation = require('./components/navigation.jsx');
    var Busqueda = require('./components/busqueda.jsx')
    var Buscador = require('./components/instaBox.jsx')

    var Home = require('./components/home.jsx');
    var Login = require('./components/login.jsx');
    var Headroom = require('react-headroom');
    var Registro = require('./components/registro.jsx');

    var Modal = require('react-bootstrap').Modal;
    var Router = require('react-router').Router;
    var IndexRoute = require('react-router').IndexRoute;
    var Route = require('react-router').Route;
    var history = require('react-router/lib/History').default;


    var App = React.createClass({

        mixins: [Reflux.listenTo(UserStore, 'onLoginUser')],

        getInitialState: function () {
            return {
                currentTab: 0,
                userSession: {},
                showModal: true
            };
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
                        <Navigation user={this.state.userSession} projectName="Somellier" changeTab={this.changeTab}/>
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
                <Route path="/busqueda" component={Busqueda}/>
                <Route path="/buscador" component={Buscador}/>
                <Route path="/registro" component={Registro}/>
            </Route>
        </Router>
    ), document.getElementById('content'));
