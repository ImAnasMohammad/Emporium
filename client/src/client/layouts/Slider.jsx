import React from 'react'
import '../assets/css/layouts/Slider.css'

const Slider = ({slides}) => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide carousel-fade"  data-bs-interval={5000} data-bs-touch={true} data-bs-ride="carousel">
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
        </div>
        <div className="carousel-inner">
            {
                slides?.map(slide=><div className="carousel-item active">
                    <img src={slide?.img} className="d-block w-100 img-shadow" alt={slide?.heading} />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>{slide?.heading}</h5>
                        <p>{slide?.content}</p>
                    </div>
                    <div className="gradient"></div>
                </div>
            )
            }
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
        </button>
    </div>

  )
}

export default Slider