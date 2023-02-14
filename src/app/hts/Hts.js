import React, { Component } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import Slider from "react-slick";
import HtsHistory from "./HtsHistory";
import HtsCategory from "./HtsCategory";
import HtsAnalysis from "./HtsAnalysis";
import HtsData from "./HtsData";

export class Hts extends Component {
    

  sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }
  render() {
    return (
      <div>
        <div className="row">
          <div id="carouselExampleSlidesOnly" className="col-xl-3 col-sm-6 grid-margin stretch-card carousel slide" data-ride="carousel">
            <div className="card carousel-inner d-block">
              
              <div className="card-body carousel-item active">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">77,211</h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi mdi-human-male-female icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="font-weight-normal small">
                Total Tested
                </h6>
              </div>

              <div className="card-body carousel-item">
                <div className="row mt-2">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">39,223</h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi mdi-human-female-female icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="font-weight-normal small">
                Total Female Tested
                </h6>
              </div>

              <div className="card-body carousel-item">
                <div className="row mt-2">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">37,010</h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi mdi mdi-human-male-male icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="font-weight-normal small">
                Total Male Tested
                </h6>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">65,705</h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="font-weight-normal small">
                Tested Negative
                </h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">1771</h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="font-weight-normal small">Tested Positive</h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">1771</h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="font-weight-normal small">
                  Enrolled on ART
                </h6>
              </div>
            </div>
          </div>
        </div>


        <div className="row">
        {/* hts gender category */}
        <HtsCategory />


        {/* hts history */}
        <HtsHistory />
        </div>



        <div className="row">
        {/* Category 3 */}
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">HTS Analysis</h4>
                <HtsAnalysis />
              </div>
            </div>
          </div>

       {/* Category 4 */}
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Category 4</h4>
                <HtsData />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hts;
