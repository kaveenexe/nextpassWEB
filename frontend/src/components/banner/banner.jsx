import Carousel from 'react-bootstrap/Carousel';
import banner1 from "../../images/homebus1.jpg";
import banner3 from "../../images/homebus3.jpg";
import './banner.css';

function HomeBanner() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="custom-img"
          src={banner1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h2>Welcome to NextPass</h2>
          <h3>Explore, Connect, Travel Together!</h3>
          <p>For Everyone, Anywhere Your Journey, Our Destination</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="custom-img"
          src={banner3}
          alt="Thrid slide"
        />

        <Carousel.Caption>
          <h3>Welcome to NextPass</h3>
          <p>Experience the Magic of Sri Lanka - A Journey to Remember!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeBanner;