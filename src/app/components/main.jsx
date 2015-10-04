var React = require('react');
var Bootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var UserStore = require('../stores/userstore');

var Navigation = require('./navigation.jsx');
var Busqueda = require('./busqueda.jsx')
var Home = require('./home.jsx');
var Login = require('./login.jsx');
var Headroom = require('react-headroom');
var Registro = require('./registro.jsx');


var Modal = require('react-bootstrap').Modal;
var ModalHeader = require('react-bootstrap').ModalHeader;

var Button = require('react-bootstrap').Button;

var Router = require('react-router').Router;
var IndexRoute = require('react-router').IndexRoute;
var Route = require('react-router').Route;
var history = require('react-router/lib/History').default;


var Main = React.createClass({

    mixins: [Reflux.listenTo(UserStore, 'onLoginUser')],

    getInitialState: function () {
        return {
            currentTab: 0,
            userSession: {},
            showModal: true
        };
    },

    onLoginUser: function(usuario) {
        this.setState({ userSession: usuario });
        this.close();
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
                <Modal backdrop="static" keyboard={false} show={this.state.showModal} className="login-modal" onHide={this.close}>
                    <Login close={this.close}/>
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
        <Route path="/" component={Main}>
            <IndexRoute component={Home}/>
            <Route path="/busqueda" component={Busqueda}/>
            <Route path="/registro" component={Registro}/>
        </Route>

    </Router>
), document.getElementById('content'));
