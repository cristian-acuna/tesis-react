    var React = require('react');
    var Bootstrap = require('react-bootstrap');

    var Navigation = require('./components/navigation.jsx');
    var Busqueda = require('./components/busqueda.jsx')
    var Home = require('./components/home.jsx');
    var Login = require('./components/login.jsx');
    var Headroom = require('react-headroom');

    var Router = require('react-router').Router;
    var Route = require('react-router').Route;
    var history = require('react-router/lib/History').default;


    var App = React.createClass({

        getInitialState: function () {
            return {
                currentTab: 0
            };
        },

        changeTab: function (index) {
            this.setState({currentTab: index});
        },

        render: function () {
            return (
                <div>
                    <Headroom>
                        <Navigation projectName="Somellier" changeTab={this.changeTab}/>
                    </Headroom>
                    <div className="starter-template">
                        <Home/>
                    </div>
                </div>
            );
        }
    });

    React.render((
        <Router history={history}>
            <Route path="login" component={Login}/>
            <Route path="/" component={App}/>
            <Route path="/busqueda" component={Busqueda}/>
            <Route path="/wishlist" component={App}/>

        </Router>
    ), document.getElementById('content'));
