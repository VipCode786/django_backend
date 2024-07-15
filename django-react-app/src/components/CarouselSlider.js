import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselSlider = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src="/p1.jpg" // Replace with your image path
                    alt="First slide"
                    height="600"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/p2.jpg" // Replace with your image path
                    alt="Second slide"
                     height="600"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/p3.jpg" // Replace with your image path
                    alt="Third slide"
                     height="600"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/p4.jpg" // Replace with your image path
                    alt="Fourth slide"
                     height="600"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselSlider;
