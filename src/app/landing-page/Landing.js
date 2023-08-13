import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import "./Landing.css";
import "animate.css/animate.min.css";
import RedirectDashboard from './RedirectDashboard';

function Landing(props) {

    window.addEventListener("load", function () {
        var letters = document.querySelectorAll(".caritas-letter");
        letters.forEach(function (letter) {
            letter.addEventListener("mouseover", function () {
                this.style.color = "#f44336";
                this.style.transform = "scale(1.2)";
            });
            letter.addEventListener("mouseout", function () {
                this.style.color = "#4f0";
                this.style.transform = "scale(2)";
            });
        });
    });

    return (
        <div className='shadow p-5'>
            {/* <div className='text-center border border-bottom border-light'>
                <div id="caritas-container" className='animate__animated animate__zoomIn'>
                    <div className="caritas-letter" id="c">C</div>
                    <div className="caritas-letter" id="a1">A</div>
                    <div className="caritas-letter" id="r">R</div>
                    <div className="caritas-letter" id="i">I</div>
                    <div className="caritas-letter" id="t">T</div>
                    <div className="caritas-letter" id="a2">A</div>
                    <div className="caritas-letter" id="s">S</div>
                </div>
            </div>
            <hr className='bg-light' /> */}
            <div className='text-center animate__animated'>
                <p className='display-1 text-uppercase'>
                    <span className='text-success font-weight-bold px-2'>NMRS</span>
                    <span className='text-danger font-weight-bold px-2'>Support</span>
                </p>
            </div>
            <RedirectDashboard />
        </div>
    );
}

Landing.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
};

export default Landing;
