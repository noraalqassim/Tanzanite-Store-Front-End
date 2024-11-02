import 'bootstrap/dist/css/bootstrap.min.css'; // Don't forget to import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import hero1 from "../../images/hero1.jpg";
import hero2 from "../../images/hero2.jpg";
import "./Hero.css";
export default function Hero() {
    
  return (
    <div
            id="carouselExampleIndicators"
            className="carousel slide hero"
            data-bs-ride="carousel" // Use data-bs-ride for Bootstrap 5
        >
            <ol className="carousel-indicators">
                <li
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                ></li>
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src={hero1} alt="First slide" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Unveil the beauty of nature with our stunning collection of ethically sourced gemstones.</h5>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={hero2} alt="Second slide" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Explore our stunning collection of handcrafted jewelry, designed to make every moment special.</h5>
                    </div>
                </div>
            </div>
            <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-bs-slide="prev" // Use data-bs-slide for Bootstrap 5
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </a>
            <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-bs-slide="next" // Use data-bs-slide for Bootstrap 5
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </a>
  </div>
  );
}
