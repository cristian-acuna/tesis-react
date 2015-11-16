var React = require('react');
var Bootstrap = require('react-bootstrap');
var Carousel = require('./carousel.jsx')

var Home = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Bienvenido nuevamente!</h1>
                <p className="lead">Este es el home de su perfil de Somellier
                    <br />
                    Aqui encontrara recomendaciones y noticias que lo mantendran actualizado diariamente.</p>
                    <Carousel />
            </div>
        );
    }
});

module.exports = Home;



