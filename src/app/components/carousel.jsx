var React = require('react');
var Carousel = require('react-bootstrap').Carousel;
var CarouselItem = require('react-bootstrap').CarouselItem;

var CarouselComp = React.createClass({
    render: function () {
        return (
    <Carousel className="carousel-component">
        <CarouselItem>
            <img className="carousel-img" src="http://www.nqnorte.com.ar/wp-content/uploads/2015/09/vino-5434.jpg"/>
            <div className="caption">
                <h3>Benjaimn Nieto</h3>
                <p>Malbec Rose | Bodega Senneteizer</p>
            </div>
        </CarouselItem>
        <CarouselItem>
            <img className="carousel-img" src="http://www.fondos7.net/wallpaper-original/wallpapers/un-buen-vino-y-uvas-10009.jpg"/>
            <div className="caption">
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </CarouselItem>
        <CarouselItem>
            <img className="carousel-img" src="http://www.caminosdelvino.com/cache/vinos8.jpg_640_640.jpg"/>
            <div className="caption">
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </div>
        </CarouselItem>
    </Carousel>
        );
    }
});

module.exports = CarouselComp;
